// src/components/AnimatedRoute/index.js
import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const AnimatedRoute = ({ children }) => {
  const variants = {
    initial: {
      scaleX: 0, // curtain closed
      opacity: 0,
      transition: { duration: 0.5 }
    },
    enter: {
      scaleX: 1, // curtain opens
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" }
    },
    exit: {
      scaleX: 0, // curtain closes
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
      style={{ 
        width: '100%', 
        height: '100%', 
        overflow: 'hidden',
        originX: 0 // This ensures the scaling is from the left to right
      }}
    >
      {children}
    </motion.div>
  );
};

// Define PropTypes
AnimatedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default AnimatedRoute;

