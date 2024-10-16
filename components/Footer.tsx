import { Twitter, Linkedin, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Dynamically get the current year

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
            {[{Icon: Twitter, link: 'https://twitter.com' }, 
              { Icon: Linkedin, link: 'https://linkedin.com' }, 
              { Icon: Github, link: 'https://github.com' }]
              .map(({ Icon, link }, index) => (
                <motion.a 
                  key={index}
                  href={link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.8 }}
                  aria-label={Icon.name}
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
          <p>&copy; {currentYear} RO-NOC. All rights reserved.</p>
          <p>
            Tel: <a href="tel:+48695295641" className="hover:text-white transition-colors duration-300">+48 695 295 641</a> | 
            Email: <a href="mailto:ronoc2020@gmail.com" className="hover:text-white transition-colors duration-300">ronoc2020@gmail.com</a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
