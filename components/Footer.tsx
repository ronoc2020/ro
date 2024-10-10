import { Facebook, Twitter, Linkedin, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="mb-4 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold neon-text">RO-NOC</h3>
            <p className="text-sm text-gray-400">Futuristic IT Solutions</p>
          </motion.div>
          <motion.div 
            className="flex space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {[Facebook, Twitter, Linkedin, Github].map((Icon, index) => (
              <motion.a 
                key={index}
                href="#" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.8 }}
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </motion.div>
        </div>
        <motion.div 
          className="mt-8 text-center text-sm text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>&copy; 2040 RO-NOC. All rights reserved.</p>
          <p>Tel: +48 695295641 | Email: ronoc2020@gmail.com</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;