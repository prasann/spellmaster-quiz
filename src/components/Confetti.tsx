import React, { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';
import { motion } from 'framer-motion';

interface ConfettiProps {
  show: boolean;
  duration?: number; // in milliseconds
}

export function Confetti({ show, duration = 3000 }: ConfettiProps) {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle the confetti timing
  useEffect(() => {
    if (show) {
      setIsActive(true);
      const timer = setTimeout(() => {
        setIsActive(false);
      }, duration);
      return () => clearTimeout(timer);
    }
    return () => {};
  }, [show, duration]);

  // Star animation variant
  const starVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: [0, 1.2, 1],
      opacity: [0, 1, 1],
      transition: { duration: 0.5 }
    },
    exit: { 
      scale: [1, 1.2, 0],
      opacity: [1, 1, 0],
      transition: { duration: 0.3 }
    }
  };

  if (!isActive) return null;
  
  return (
    <>
      {/* Confetti overlay */}
      <ReactConfetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
        numberOfPieces={200}
        gravity={0.15}
      />
      
      {/* Star animation */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={starVariants}
          className="text-yellow-400 text-9xl"
        >
          ⭐
        </motion.div>
      </div>
    </>
  );
}

export default Confetti;