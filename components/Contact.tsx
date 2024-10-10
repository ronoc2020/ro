'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email and message to your backend
    console.log('Email:', email);
    console.log('Message:', message);
    // Reset form
    setEmail('');
    setMessage('');
    // Show a success message to the user
    alert('Thank you for your message. We will get back to you soon!');
  };

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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-800 text-white holographic"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full bg-gray-800 text-white holographic"
                placeholder="Your message here..."
                rows={4}
              />
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 lightsaber-button">
              Send Message
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;