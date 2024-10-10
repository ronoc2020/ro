'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <motion.nav 
      className={`fixed w-full z-50 transition-all duration-300 ${isVisible ? 'show-navbar' : 'hide-navbar'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link href="/" className="text-2xl font-bold neon-text">
              RO-NOC
            </Link>
          </motion.div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {['Home', 'About', 'Services', 'Contact'].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link 
                    href={item === 'Home' ? '/' : `#${item.toLowerCase()}`} 
                    className="px-3 py-2 rounded-md text-sm font-medium holographic"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;