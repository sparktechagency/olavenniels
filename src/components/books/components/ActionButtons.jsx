import React from 'react';
import { motion } from 'framer-motion';
import { Button } from 'antd';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const ActionButtons = React.memo(({ onView, onEdit, onDelete }) => (
    <motion.div
        className='flex items-center gap-2 mt-3'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
    >
        <Button
            icon={<FaEye className='text-xs' />}
            onClick={onView}
            shape='circle'
        />

        <Button
            icon={<FaEdit className='text-xs' />}
            onClick={onEdit}
            shape='circle'
        />

        <Button
            icon={<FaTrash className='text-xs' />}
            onClick={onDelete}
            shape='circle'
        />
    </motion.div>
));

ActionButtons.displayName = 'ActionButtons';

export default ActionButtons;