'use client';

import { Server, Shield, Cloud, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: <Server className="w-12 h-12 mb-4 text-purple-500 hover:text-white transition duration-300" />,
    title: "24/7 Network Management",
    description: "Ensure your network's stability and performance with our round-the-clock monitoring and management services.",
  },
  {
    icon: <Shield className="w-12 h-12 mb-4 text-purple-500 hover:text-white transition duration-300" />,
    title: "Advanced Cybersecurity",
    description: "Protect your digital assets with our state-of-the-art cybersecurity solutions, including AI-driven threat detection.",
  },
  {
    icon: <Cloud className="w-12 h-12 mb-4 text-purple-500 hover:text-white transition duration-300" />,
    title: "Cloud Infrastructure Optimization",
    description: "Maximize efficiency and reduce costs with our expert cloud infrastructure management and optimization services.",
  },
  {
    icon: <Cpu className="w-12 h-12 mb-4 text-purple-500 hover:text-white transition duration-300" />,
    title: "IT Consulting",
    description: "Get strategic guidance on leveraging cutting-edge technologies to drive your business forward in the digital age.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-black to-gray-800 text-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold mb-12 text-center neon-text"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-purple-500/50 transition-shadow duration-300 holographic hover:bg-purple-800"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              role="figure"
              aria-labelledby={`service-title-${index}`}
              aria-describedby={`service-desc-${index}`}
            >
              <div className="flex justify-center">{service.icon}</div>
              <h3 id={`service-title-${index}`} className="text-xl font-semibold mb-2 text-center">{service.title}</h3>
              <p id={`service-desc-${index}`} className="text-gray-400 text-center">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
