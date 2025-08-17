import React from 'react';
import { motion } from 'framer-motion';
import { imageUrl } from '../../../../utils/server';

const transition = {
    default: { duration: 0.3, ease: "easeInOut" }
};

const AudioCard = React.memo(({ audio, audioRef, onEnded }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition.default}
    >
        <audio
            ref={audioRef}
            className='w-full mt-2 rounded'
            controls
            onEnded={onEnded}
            preload="metadata"
            style={{
                filter: 'sepia(1) hue-rotate(200deg) saturate(0.8)',
                borderRadius: '8px'
            }}
        >
            <source src={imageUrl(audio)} type="audio/mpeg" />
            <source src={imageUrl(audio)} type="audio/ogg" />
            <source src={imageUrl(audio)} type="audio/wav" />
            Your browser does not support the audio element.
        </audio>
    </motion.div>
));

AudioCard.displayName = 'AudioCard';

export default AudioCard;