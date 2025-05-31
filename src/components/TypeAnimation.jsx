import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const TypeAnimation = ({ sequence, wrapper = "span", cursor = true, repeat = 0, speed = 50, deletionSpeed, style, className }) => {
  const [text, setText] = useState("");
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopCount, setLoopCount] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(speed);

  const actualDeletionSpeed = typeof deletionSpeed === 'number' ? deletionSpeed : speed;
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!mounted.current) return;
    if (repeat !== Infinity && repeat !== 0 && loopCount >= repeat * sequence.filter(item => typeof item === 'string').length) {
      return;
    }

    const currentItem = sequence[currentSequenceIndex];

    if (typeof currentItem === 'string') {
      setCurrentSpeed(isDeleting ? actualDeletionSpeed : speed);
      const timeout = setTimeout(() => {
        if (!mounted.current) return;
        if (isDeleting) {
          setText(prev => prev.substring(0, prev.length - 1));
        } else {
          setText(prev => currentItem.substring(0, prev.length + 1));
        }
      }, currentSpeed);
      return () => clearTimeout(timeout);
    } else if (typeof currentItem === 'number') { 
      const timeout = setTimeout(() => {
        if (!mounted.current) return;
        setCurrentSequenceIndex(prev => (prev + 1) % sequence.length);
      }, currentItem);
      return () => clearTimeout(timeout);
    } else if (typeof currentItem === 'function') { 
        currentItem();
        setCurrentSequenceIndex(prev => (prev + 1) % sequence.length);
    }
  }, [text, isDeleting, currentSequenceIndex, sequence, speed, actualDeletionSpeed, loopCount, repeat]);

  useEffect(() => {
    if (!mounted.current) return;
    const currentItem = sequence[currentSequenceIndex];
    if (typeof currentItem !== 'string') return;

    if (!isDeleting && text === currentItem) {
      const isLastStringInSequence = currentSequenceIndex === sequence.filter(s => typeof s === 'string').length -1;
      const isLastLoop = repeat !== Infinity && repeat !==0 && loopCount >= repeat -1;

      if(isLastStringInSequence && isLastLoop && sequence.filter(s => typeof s === 'number' || typeof s === 'function').length === 0){
          return; // Stop if it's the last string, no more pauses/callbacks, and repeat limit is reached
      }
      
      let pauseDuration = 1000; // Default pause
      const nextPotentialPauseIndex = sequence.findIndex((el, idx) => typeof el === 'number' && idx > currentSequenceIndex);
      if (nextPotentialPauseIndex !== -1) {
        pauseDuration = sequence[nextPotentialPauseIndex];
      }
      
      setTimeout(() => {
        if (!mounted.current) return;
         if(currentSequenceIndex === sequence.length -1 && (repeat === Infinity || loopCount < repeat -1 || repeat === 0)){
            setIsDeleting(true);
         } else if (currentSequenceIndex < sequence.length -1){
            const nextItemIsStringOrFunction = typeof sequence[(currentSequenceIndex + 1) % sequence.length] === 'string' || typeof sequence[(currentSequenceIndex + 1) % sequence.length] === 'function';
            if(nextItemIsStringOrFunction){
                setIsDeleting(true);
            } else { // If next is a pause, let the other useEffect handle it
                setCurrentSequenceIndex(prev => (prev + 1) % sequence.length);
            }
         }
      }, pauseDuration);

    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      const nextIndex = (currentSequenceIndex + 1) % sequence.length;
      setCurrentSequenceIndex(nextIndex);
      if (nextIndex === 0) { // Completed a full loop through the sequence
        setLoopCount(prev => prev + 1);
      }
    }
  }, [text, isDeleting, currentSequenceIndex, sequence, repeat, loopCount]);


  const Wrapper = wrapper;

  return (
    <Wrapper style={style} className={className}>
      {text}
      {cursor && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.7, repeat: Infinity }}
          className={cn("inline-block", className && className.includes("gradient-text") ? "type-cursor" : "")}
        >
          |
        </motion.span>
      )}
    </Wrapper>
  );
};