const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');

const source = readFileSync(require('node:path').join(__dirname, '..', 'server.js'), 'utf8');

function makeApp(env = {}) {
  const routes = {};
  const sent = [];
  const app = {
    disable() { return this; },
    use() { return this; },
    get(path, fn) { routes['GET ' + path] = fn; },
    post(path, fn) { routes['POST ' + path] = fn; },
    options(path, fn) { routes['OPTIONS ' + path] = fn; },
    listen(_port, _host, cb) { cb(); },
  };
  function express() { return app; }
  express.json = () => () => {};
  const context = {
    require(name) {
      if (name === 'dotenv') return { config() {} };
      if (name === 'express') return express;
      if (name === 'nodemailer') return {
        createTransport() { return { async sendMail(options) { sent.push(options); } }; },
      };
      throw new Error('Unexpected external dependency: ' + name);
    },
    process: {
      env: {
        EMAIL: 'owner@example.com',
        EMAIL_PASSWORD: 'FAKE_TEST_VALUE',
        ALLOWED_ORIGINS: 'https://portfolio.example',
        PORT: '5000',
        ...env,
      },
    },
    console: { log() {}, error() {} },
  };
  vm.runInNewContext(source, context, { filename: 'server.js' });
  return { routes, sent };
}

function response() {
  return {
    code: 200, headers: {}, body: null,
    set(key, value) { this.headers[key] = value; return this; },
    status(code) { this.code = code; return this; },
    json(body) { this.body = body; return this; },
    sendStatus(code) { this.code = code; return this; },
  };
}

function request(origin, body, ip = '192.0.2.10') {
  return { get(name) { return name === 'origin' ? origin : null; }, body, socket: { remoteAddress: ip } };
}

test('legacy contact endpoint parses', () => {
  assert.doesNotThrow(() => new vm.Script(source));
});

test('server fails closed without configured credentials or origin allow-list', () => {
  assert.throws(() => makeApp({ EMAIL_PASSWORD: '' }), /credentials are missing/);
  assert.throws(() => makeApp({ ALLOWED_ORIGINS: '' }), /ALLOWED_ORIGINS/);
});

test('disallowed origin cannot send an email', async () => {
  const { routes, sent } = makeApp();
  const res = response();
  await routes['POST /api/contact'](
    request('https://evil.example', { email: 'test@example.com', message: 'Hello world' }), res
  );
  assert.equal(res.code, 403);
  assert.equal(sent.length, 0);
});

test('invalid message and sender cannot send email', async () => {
  const { routes, sent } = makeApp();
  const res = response();
  await routes['POST /api/contact'](
    request('https://portfolio.example', { email: 'not-an-email', message: 'Hi' }), res
  );
  assert.equal(res.code, 400);
  assert.equal(sent.length, 0);
});

test('message delivery uses authenticated sender and safe Reply-To', async () => {
  const { routes, sent } = makeApp();
  const res = response();
  await routes['POST /api/contact'](
    request('https://portfolio.example',
      { email: 'visitor@example.net', message: 'Interested in your services' }), res
  );
  assert.equal(res.code, 202);
  assert.equal(sent.length, 1);
  assert.equal(sent[0].from, 'owner@example.com');
  assert.equal(sent[0].to, 'owner@example.com');
  assert.equal(sent[0].replyTo, 'visitor@example.net');
});

test('fourth request from same socket is throttled', async () => {
  const { routes, sent } = makeApp();
  const req = request('https://portfolio.example',
    { email: 'visitor@example.net', message: 'Test message five' });
  const resultCodes = [];
  for (let i = 0; i < 4; i++) {
    const res = response();
    await routes['POST /api/contact'](req, res);
    resultCodes.push(res.code);
  }
  assert.deepEqual(resultCodes, [202, 202, 202, 429]);
  assert.equal(sent.length, 3);
});
