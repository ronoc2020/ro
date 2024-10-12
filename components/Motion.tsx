// src/components/Motion.tsx
'use client'; // Ensure it's a client component
import { motion, MotionProps } from 'framer-motion';
import React, { ReactNode } from 'react';

interface MotionComponentProps extends MotionProps {
  children: ReactNode; // Specify that children is of type ReactNode
}

const Motion: React.FC<MotionComponentProps> = ({ children, ...props }) => {
  return <motion.div {...props}>{children}</motion.div>;
};

export default Motion;
