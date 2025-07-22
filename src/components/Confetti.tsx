import React, { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';

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

  // Handle the confetti timing and play celebration sound
  useEffect(() => {
    if (show) {
      setIsActive(true);
      
      // Play celebration sound
      const playSuccessSound = () => {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Create a cheerful melody
        const notes = [
          { freq: 523.25, time: 0, duration: 0.15 }, // C5
          { freq: 659.25, time: 0.1, duration: 0.15 }, // E5
          { freq: 783.99, time: 0.2, duration: 0.15 }, // G5
          { freq: 1046.5, time: 0.3, duration: 0.3 }   // C6
        ];
        
        notes.forEach(note => {
          setTimeout(() => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(note.freq, audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + note.duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + note.duration);
          }, note.time * 1000);
        });
      };
      
      try {
        playSuccessSound();
      } catch (error) {
        console.log('Audio not available');
      }
      
      const timer = setTimeout(() => {
        setIsActive(false);
      }, duration);
      return () => clearTimeout(timer);
    }
    return () => {};
  }, [show, duration]);

  if (!isActive) return null;
  
  return (
    <ReactConfetti
      width={windowSize.width}
      height={windowSize.height}
      recycle={false}
      numberOfPieces={800}
      gravity={0.3}
      initialVelocityY={25}
      initialVelocityX={15}
      colors={['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8E8', '#F7DC6F']}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 1000, pointerEvents: 'none' }}
    />
  );
}

export default Confetti;