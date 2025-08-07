import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';

const Contact = () => {
    const [emails, setEmails] = useState([
        { id: 1, value: 'xxxxxxx@gmail.com' },
        { id: 2, value: 'xxxxxxx@gmail.com' }
    ]);

    const addEmailField = () => {
        if (emails.length >= 5) {
            toast.warning('Maximum 5 email fields allowed');
            return;
        }
        setEmails([...emails, { id: Date.now(), value: '' }]);
    };

    const removeEmailField = (id) => {
        if (emails.length <= 1) {
            toast.warning('At least one email field is required');
            return;
        }
        setEmails(emails.filter(email => email.id !== id));
    };

    const handleEmailChange = (id, value) => {
        setEmails(emails.map(email =>
            email.id === id ? { ...email, value } : email
        ));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const invalidEmails = emails.some(email => !emailRegex.test(email.value));

        if (invalidEmails) {
            toast.error('Please enter valid email addresses');
            return;
        }

        // Here you would typically make an API call to save the emails
        console.log('Saving emails:', emails);
        toast.success('Contact information saved successfully!');
    };

    // Styles from the design JSON
    const styles = {
        container: {
            backgroundColor: '#282828',
            padding: '20px',
            minHeight: 'calc(100vh - 200px)',
            color: '#FFFFFF',
        },
        card: {
            backgroundColor: '#424242',
            borderRadius: '8px',
            padding: '20px',
            maxWidth: '600px',
            margin: '0 auto',
        },
        title: {
            fontSize: '24px',
            marginBottom: '20px',
            color: '#FFFFFF',
        },
        sectionTitle: {
            fontSize: '18px',
            margin: '20px 0 10px',
            color: '#FFFFFF',
        },
        input: {
            backgroundColor: '#424242',
            color: '#FFC107',
            borderColor: '#FFC107',
            borderRadius: '8px',
            marginBottom: '10px',
        },
        button: {
            backgroundColor: 'transparent',
            borderColor: '#FFC107',
            color: '#FFC107',
            borderRadius: '8px',
            marginTop: '10px',
        },
        icon: {
            color: '#FFC107',
        },
        inputContainer: {
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            marginBottom: '10px',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Contact Us</h1>
            <div style={styles.card}>
                <h2 style={styles.sectionTitle}>Write To Us</h2>

                <form onSubmit={handleSubmit}>
                    {emails.map((email) => (
                        <div key={email.id} style={styles.inputContainer}>
                            <Input
                                size='large'
                                type="email"
                                value={email.value}
                                onChange={(e) => handleEmailChange(email.id, e.target.value)}
                                placeholder="xxxxxxx@gmail.com"
                                style={styles.input}
                                suffix={
                                    emails.length > 1 && (
                                        <CloseOutlined
                                            style={{ ...styles.icon, cursor: 'pointer' }}
                                            onClick={() => removeEmailField(email.id)}
                                        />
                                    )
                                }
                            />
                        </div>
                    ))}

                    {emails.length < 5 && (
                        <Button
                            size='large'
                            type="dashed"
                            onClick={addEmailField}
                            icon={<PlusOutlined style={styles.icon} />}
                            style={styles.button}
                        >
                            Add Email
                        </Button>
                    )}

                    <div style={{ marginTop: '20px' }}>
                        <Button
                            size='large'
                            type="primary"
                            htmlType="submit"
                            style={{
                                backgroundColor: '#FFC107',
                                borderColor: '#FFC107',
                                color: '#000',
                                fontWeight: 'bold',
                                width: '200px',
                                border:'1px dashed #111'
                            }}
                        >
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;