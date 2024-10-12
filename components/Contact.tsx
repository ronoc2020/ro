// src/components/Contact.tsx
'use client'; // Ensure it's a client component
import Motion from './Motion'; // Import the Motion component from the correct path
import { motion } from 'framer-motion'; // Import motion from framer-motion
import { FaTwitter, FaGithub } from 'react-icons/fa'; // Import Font Awesome icons

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-black via-purple-900 to-black text-white">
      <div className="container mx-auto px-4">
        <Motion>
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
              <a href="https://x.com/noc_ro" className="text-purple-400 hover:text-purple-600" aria-label="Twitter">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="https://github.com/ronoc2020" className="text-purple-400 hover:text-purple-600" aria-label="GitHub">
                <FaGithub className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        </Motion>
      </div>
    </section>
  );
};

export default Contact;
