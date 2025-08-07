import React, { useEffect } from 'react';
import { Form, Input, Modal, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';

function CategoryCreateModal({ open, onCancel, data }) {
    const [form] = Form.useForm();

    // Convert single image string to Upload-compatible array
    const getInitialImageList = (imageUrl) => {
        if (!imageUrl) return [];
        return [
            {
                uid: '-1',
                name: 'category-image.png',
                status: 'done',
                url: imageUrl,
            },
        ];
    };

    useEffect(() => {
        form.setFieldsValue({
            name: data?.name || '',
            image: getInitialImageList(data?.image || ''),
        });
    }, [form, data]);

    const close = () => {
        form.resetFields();
        onCancel();
    };

    const handleSubmit = (values) => {
        const imageFile = values.image?.[0]?.originFileObj || values.image?.[0];
        const payload = {
            name: values.name,
            image: imageFile,
        };

        console.log('📦 Submitted Payload:', payload);
        toast.success('Category submitted successfully!');
        close(); // Optionally close modal after submit
    };

    const handleUploadChange = (info) => {
        const { status, name } = info.file;

        if (status === 'done' || status === 'removed') {
            toast.success(`${name} uploaded/removed successfully`);
        } else if (status === 'error') {
            toast.error(`${name} upload failed`);
        }

        console.log('🖼 Upload Info:', info.fileList);
    };

    return (
        <Modal
            centered
            footer={null}
            open={open}
            onCancel={onCancel}
            destroyOnClose
            maskClosable={false}
            closable={false}
        >
            <Form
                layout="vertical"
                form={form}
                requiredMark={false}
                onFinish={handleSubmit}
            >
                {/* Image Upload */}
                <Form.Item
                    name="image"
                    label="Category Image"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                    rules={[{ required: true, message: 'Please upload an image!' }]}
                >
                    <Upload
                        name="image"
                        listType="picture"
                        maxCount={1}
                        accept="image/*"
                        beforeUpload={() => false} // prevent auto-upload
                        onChange={handleUploadChange}
                    >
                        <Button icon={<UploadOutlined className="!text-black" />} >
                            Click to Upload
                        </Button>
                    </Upload>
                </Form.Item>

                {/* Category Name */}
                <Form.Item
                    label="Category Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter category name!' }]}
                >
                    <Input placeholder="Enter category name" />
                </Form.Item>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-4">
                    <Button
                        htmlType="submit"
                        type="primary"
                        style={{
                            backgroundColor: 'var(--secondary-color)',
                            color: 'white',
                        }}
                    >
                        Submit
                    </Button>
                    <Button
                        onClick={()=>close()}
                        style={{
                            backgroundColor: 'var(--secondary-color)',
                            color: 'white',
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}

export default CategoryCreateModal;
