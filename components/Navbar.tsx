// src/components/Navbar.tsx
'use client'; // Ensure it's a client component
import Motion from './Motion'; // Import the Motion component from the correct path
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeLink, setActiveLink] = useState<string>('Home'); // Track active link

  // Configuration for the nav links
  const navLinks = ['Home', 'About', 'Services', 'Contact'];

  // Control navbar visibility on scroll
  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY || currentScrollY < 10); // Show on top
      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      controlNavbar();
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [lastScrollY]);

  // Smooth scroll to section
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    const element = document.getElementById(link.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Motion>
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
              <Link href="/" className="text-2xl font-bold neon-text" aria-label="Homepage">
                RO-NOC
              </Link>
            </motion.div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link 
                      href={item === 'Home' ? '/' : `#${item.toLowerCase()}`} 
                      onClick={() => handleLinkClick(item)} // Smooth scrolling
                      className={`px-3 py-2 rounded-md text-sm font-medium ${activeLink === item ? 'holographic-active' : 'holographic'}`} // Active link class
                      aria-label={`Go to ${item}`}
                      aria-current={activeLink === item ? 'page' : undefined} // Accessibility improvement
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
                <ThemeSwitcher />
              </div>
            </div>
            {/* Optional Mobile Menu Button */}
            <div className="md:hidden">
              <button
                aria-label="Toggle Menu"
                className="text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                onClick={() => {
                  // Toggle mobile menu functionality
                }}
              >
                {/* Hamburger icon here */}
                &#9776; {/* Placeholder for an icon */}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>
    </Motion>
  );
};

export default Navbar;
