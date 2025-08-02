import React from 'react';
import { motion } from 'framer-motion';
import { FaHeadphones, FaTimes } from 'react-icons/fa';
import AudioCard from './AudioCard';

const transition = {
  default: { duration: 0.3, ease: "easeInOut" },
  stagger: (delay) => ({ delay, duration: 0.3 })
};

const AudioControls = React.memo(({ audio, audioRef, onEnded, onClose }) => (
  <motion.div
    key="audio-controls"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={transition.default}
  >
    <div className='flex items-center justify-between mb-3'>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={transition.stagger(0.1)}
        className='flex items-center gap-2'
      >
        <FaHeadphones className='text-[var(--secondary-color)] text-lg' />
        <span className='text-white text-sm font-medium'>Now Playing</span>
      </motion.div>

      <motion.button
        className='text-white text-lg cursor-pointer p-2 rounded-full hover:bg-white/10 transition-colors'
        onClick={onClose}
        initial={{ opacity: 0, rotate: 180 }}
        animate={{ opacity: 1, rotate: 0 }}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <FaTimes className='text-gray-400 hover:text-red-400 transition-colors' />
      </motion.button>
    </div>

    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={transition.stagger(0.15)}
    >
      <AudioCard
        audio={audio}
        audioRef={audioRef}
        onEnded={onEnded}
      />
    </motion.div>
  </motion.div>
));

AudioControls.displayName = 'AudioControls';

export default AudioControls;