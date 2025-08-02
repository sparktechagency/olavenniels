import React from 'react';
import { motion } from 'framer-motion';
import { FaHeadphones } from 'react-icons/fa';
import { TbHeadphonesOff } from 'react-icons/tb';
import ActionButtons from './ActionButtons.jsx';

const transition = {
    stagger: (delay) => ({ delay, duration: 0.3 })
};

const BookInfo = React.memo(({
    bookName,
    author,
    category,
    hasAudio,
    onPlayClick,
    onView,
    onEdit,
    onDelete
}) => (
    <motion.div
        key="book-info"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
    >
        <div className='flex items-center justify-between'>
            <motion.h2
                className='text-xl font-semibold text-white line-clamp-1'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={transition.stagger(0.1)}
            >
                {bookName}
            </motion.h2>

            {hasAudio ? (
                <motion.button
                    className='text-white text-xl cursor-pointer p-2 rounded-full hover:bg-white/10 transition-colors'
                    onClick={onPlayClick}
                    initial={{ opacity: 0, rotate: -180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                >
                    <FaHeadphones className='text-gray-400 hover:text-[var(--secondary-color)] transition-colors' />
                </motion.button>
            ) : (
                <button className='text-white text-xl cursor-not-allowed' disabled>
                    <TbHeadphonesOff />
                </button>
            )}
        </div>

        <motion.p
            className='text-sm text-gray-500 mt-1'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={transition.stagger(0.15)}
        >
            {author}
        </motion.p>

        <motion.p
            className='text-sm text-[var(--secondary-color)]'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={transition.stagger(0.2)}
        >
            {category}
        </motion.p>

        <ActionButtons
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
        />
    </motion.div>
));

BookInfo.displayName = 'BookInfo';

export default BookInfo;