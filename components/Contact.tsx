'use client';

import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-black via-purple-900 to-black text-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold mb-8 text-center neon-text"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact Us
        </motion.h2>
        <motion.div 
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-center text-lg mb-4">
            For any inquiries, feel free to reach out via email:
          </p>
          <p className="text-center">
            <a 
              href="mailto:ronoc2020@gmail.com" 
              className="text-purple-400 hover:underline"
              aria-label="Email RO-NOC"
            >
              ronoc2020@gmail.com
            </a>
          </p>
          <p className="text-center mt-4">
            We look forward to hearing from you!
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="https://twitter.com/yourprofile" className="text-purple-400 hover:text-purple-600">
              <i className="fab fa-twitter"></i> {/* Font Awesome icon */}
            </a>
            <a href="https://github.com/ronoc2020" className="text-purple-400 hover:text-purple-600">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
