import React, { useState } from 'react';
import { List, Typography, Button, Badge, Space } from 'antd';
import { EyeOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const { Title, Text } = Typography;

// Mock data
const mockNotifications = [
    {
        id: 1,
        title: 'New Book Added',
        message: 'A new book "The Great Gatsby" has been added to your library.',
        time: '2 hours ago',
        isRead: false,
        type: 'book',
        referenceId: '123'
    },
    {
        id: 2,
        title: 'System Update',
        message: 'Scheduled maintenance this weekend. The system will be down for 2 hours.',
        time: '1 day ago',
        isRead: false,
        type: 'system',
        referenceId: null
    },
    {
        id: 3,
        title: 'Profile Updated',
        message: 'Your profile information has been successfully updated.',
        time: '3 days ago',
        isRead: true,
        type: 'profile',
        referenceId: 'user-123'
    },
];

const NotificationPage = () => {
    const [notifications, setNotifications] = useState(mockNotifications);
    const navigate = useNavigate();

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const handleViewNotification = (notification) => {
        const updatedNotifications = notifications.map(n =>
            n.id === notification.id ? { ...n, isRead: true } : n
        );
        setNotifications(updatedNotifications);

        toast.success('Marked as read');

        // Navigate if needed
        if (notification.referenceId) {
            // Example: navigate(`/books/${notification.referenceId}`);
        }
    };

    const markAllAsRead = () => {
        const updated = notifications.map(n => ({ ...n, isRead: true }));
        setNotifications(updated);
        toast.success('All notifications marked as read');
    };

    return (
        <div style={{ padding: 24 }}>
            <Space style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <Title style={{ color: 'var(--font-color)' }} level={3}>
                    Notifications{' '}
                    {unreadCount > 0 && (
                        <Badge count={unreadCount} offset={[10, 0]} />
                    )}
                </Title>
                <Button
                    style={{ backgroundColor: 'var(--secondary-color)', color: 'var(--font-color)' }}
                    icon={<CheckCircleOutlined />}
                    onClick={markAllAsRead}
                    disabled={unreadCount === 0}
                >
                    Mark all as read
                </Button>
            </Space>

            {notifications.length === 0 ? (
                <Text type="secondary" style={{ textAlign: 'center', display: 'block', marginTop: 40 }}>
                    No notifications to display
                </Text>
            ) : (
                <List
                    itemLayout="vertical"
                    dataSource={notifications}
                    renderItem={(item) => (
                        <List.Item
                            key={item.id}
                            style={{
                                background: 'var(--primary-color)',
                                borderRadius: 8,
                                padding: 16,
                                marginBottom: 12,
                                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                display: 'flex',
                                opacity: item.isRead ? 1 : 0.6,

                            }}
                            actions={[
                                <Button
                                    type="default"
                                    icon={<EyeOutlined />}
                                    style={{ color: 'var(--font-color)', backgroundColor: 'var(--secondary-color)' }}
                                    onClick={() => handleViewNotification(item)}
                                >
                                    View
                                </Button>
                            ]}
                        >
                            <List.Item.Meta
                                title={
                                    <Space>
                                        <Text style={{ color: 'var(--font-color)' }} strong={!item.isRead}>{item.title}</Text>
                                        <Text style={{ color: 'var(--font-color)', fontSize: 12 }} type="secondary">
                                            • {item.time}
                                        </Text>
                                    </Space>
                                }
                                description={
                                    <Text style={{ display: 'block', color: 'var(--font-color)', marginTop: 4 }}>
                                        {item.message}
                                    </Text>
                                }
                            />
                        </List.Item>
                    )}
                />
            )}
        </div>
    );
};

export default NotificationPage;
