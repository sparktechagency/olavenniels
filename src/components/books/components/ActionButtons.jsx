import React from 'react';
import { motion } from 'framer-motion';
import { Button, Popconfirm } from 'antd';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const ActionButtons = React.memo(({ onView, onEdit, onDelete, e_book }) => (
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

        <Popconfirm placement='rightBottom' title="Are you sure you want to delete this book?" onConfirm={onDelete} okText="Yes" cancelText="No">
            <Button
                icon={<FaTrash className='text-xs' />}
                shape='circle'
                disabled={e_book}
            />
        </Popconfirm>
    </motion.div>
));

ActionButtons.displayName = 'ActionButtons';

export default ActionButtons;