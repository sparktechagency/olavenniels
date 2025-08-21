import React, { useState, useEffect } from 'react';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import { useGetContactDataQuery, useUpdateContactDataMutation } from '../../Redux/Apis/service/contactApis';
import { Button } from 'antd';

const Contact = () => {
    const { data: contactData } = useGetContactDataQuery();
    const [updateContactData] = useUpdateContactDataMutation();

    const [emails, setEmails] = useState([{ id: Date.now(), value: '' }]);

    // Initialize emails from API data
    useEffect(() => {
        if (contactData?.data?.emails?.length) {
            setEmails(contactData.data.emails.map((email) => ({ id: Date.now() + Math.random(), value: email })));
        }
    }, [contactData]);

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
        setEmails(emails.map(email => email.id === id ? { ...email, value } : email));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const invalidEmails = emails.some(email => !emailRegex.test(email.value));

        if (invalidEmails) {
            toast.error('Please enter valid email addresses');
            return;
        }

        const data = {
            emails: emails.map(e => e.value)
        }

        try {
            await updateContactData(data).unwrap();
            toast.success('Contact information saved successfully!');
        } catch (err) {
            toast.error('Failed to save contact information');
        }
    };

    return (
        <div className="bg-[var(--primary-color)] p-6 text-white">
            <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
            <div className="border border-dashed border-[var(--secondary-color)] rounded-lg p-6 max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold mb-4">Write To Us</h2>

                <form onSubmit={handleSubmit}>
                    {emails.map((email, index) => (
                        <div key={email.id} className="flex items-center gap-3 mb-3">
                            <input
                                type="email"
                                value={email.value}
                                onChange={(e) => handleEmailChange(email.id, e.target.value)}
                                placeholder="Enter email"
                                className="flex-1 p-3 border-dashed rounded-md bg-gray-700 border border-yellow-400 text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                            {emails.length > 1 && (
                                <CloseOutlined
                                    className="text-yellow-400 cursor-pointer text-xl"
                                    onClick={() => removeEmailField(email.id)}
                                />
                            )}
                        </div>
                    ))}

                    {emails.length < 5 && (
                        <button
                            type="button"
                            onClick={addEmailField}
                            className="flex items-center gap-2 px-4 py-2 border border-yellow-400 text-yellow-400 rounded-md hover:bg-yellow-400 hover:text-black transition mb-4"
                        >
                            <PlusOutlined /> Add Email
                        </button>
                    )}

                    <div className="mt-6">
                        <Button
                            htmlType='submit'
                            size='large'
                            className="!w-full !bg-yellow-400 !text-black !font-bold !rounded-md hover:bg-yellow-500 transition"
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
