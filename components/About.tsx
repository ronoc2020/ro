'use client';

import { motion } from 'framer-motion';

const textVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-black via-purple-900 to-black text-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold mb-8 text-center neon-text"
          initial="hidden"
          animate="visible"
          variants={textVariants}
          transition={{ duration: 0.5 }}
        >
          About RO-NOC
        </motion.h2>
        <div className="max-w-3xl mx-auto">
          <motion.p 
            className="text-lg mb-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            RO-NOC is at the forefront of IT innovation, providing cutting-edge solutions for the challenges of 2040 and beyond. Our team of expert engineers specializes in advanced network management, cybersecurity, and cloud infrastructure optimization.
          </motion.p>
          <motion.p 
            className="text-lg mb-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            With years of experience and a passion for staying ahead of technological trends, we offer comprehensive IT consulting services that help businesses thrive in an increasingly digital world.
          </motion.p>
          <motion.p 
            className="text-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Our mission is to ensure the stability, security, and efficiency of your IT infrastructure, allowing you to focus on what matters most - growing your business and staying competitive in a rapidly evolving technological landscape.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default About;
