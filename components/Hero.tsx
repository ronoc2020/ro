'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false); // Track image loading status

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden parallax"
    >
      <div className="parallax__layer parallax__layer--back">
        <div className="w-full h-full bg-gradient-to-br from-purple-900 to-black opacity-50"></div>
      </div>
      <div className="parallax__layer parallax__layer--base relative z-10 text-center">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Image 
            src="https://i.imgur.com/TfILJGI.gif" 
            alt="RO-NOC Logo" 
            width={200} 
            height={200} 
            className="mx-auto mb-8" 
            priority
            onLoad={() => setImageLoaded(true)} // Set image loaded state
            onError={() => console.error('Image failed to load.')} // Error handling
          />
        </motion.div>

        <motion.h1 
          className="text-5xl font-bold mb-4 neon-text"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Welcome to RO-NOC
        </motion.h1>
        <motion.p 
          className="text-xl mb-8 morph-text"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Futuristic IT Solutions for 2040 and Beyond
        </motion.p>
        <motion.div 
          className="space-x-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <Button 
            size="lg" 
            className="bg-purple-600 hover:bg-purple-700 text-white lightsaber-button"
            aria-label="Explore our services"
          >
            Explore Our Services
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            asChild 
            className="holographic"
            aria-label="View Resume"
          >
            <a 
              href="https://drive.google.com/file/d/YOUR_RESUME_FILE_ID/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View Resume
            </a>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;
