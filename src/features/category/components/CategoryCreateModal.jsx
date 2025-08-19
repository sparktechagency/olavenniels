import React, { useEffect, useCallback, useMemo } from 'react';
import { Form, Input, Modal, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useAddBookCategoryMutation, useUpdateBookCategoryMutation } from '../../../Redux/Apis/books/bookCategory';
import { imageUrl } from '../../../utils/server';

const CategoryCreateModal = ({
    open,
    onCancel,
    categoryData: initialData
}) => {
    const [form] = Form.useForm();
    const [addCategory, { isLoading: isAddLoading }] = useAddBookCategoryMutation();
    const [updateCategory, { isLoading: isUpdateLoading }] = useUpdateBookCategoryMutation();

    const getInitialImageList = useCallback((url) => {
        if (!url) return [];
        return [{
            uid: '-1',
            name: 'category-image.png',
            status: 'done',
            url: imageUrl(url),
        }];
    }, []);

    useEffect(() => {
        if (open) {
            form.setFieldsValue({
                name: initialData?.name || '',
                image: getInitialImageList(initialData?.image),
            });
        } else {
            form.resetFields();
        }
    }, [open, initialData, form, getInitialImageList]);

    const handleClose = useCallback(() => {
        form.resetFields();
        onCancel();
    }, [form, onCancel]);

    const handleUploadChange = useCallback((info) => {
        const { status, name } = info.file;
        const statusMessages = {
            done: `${name} uploaded successfully`,
            removed: `${name} removed successfully`,
            error: `${name} upload failed`,
        };

        if (statusMessages[status]) {
            message[status === 'error' ? 'error' : 'success'](statusMessages[status]);
        }
    }, []);


    const handleSubmit = useCallback(async (values) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name);

            if (values.image?.[0]?.originFileObj) {
                formData.append('image', values.image[0].originFileObj);
            }

            if (initialData?._id) {
                await updateCategory({ id: initialData._id, data: formData }).unwrap().then((res) => {
                    if (res?.success) {
                        message.success(res?.message);
                        handleClose();
                    }
                })
            } else {
                await addCategory({ data: formData }).unwrap().then((res) => {
                    if (res?.success) {
                        message.success(res?.message);
                        handleClose();
                    }
                })
            }
        } catch (error) {
            message.error(error?.data?.message || 'An unexpected error occurred');
        }
    }, [initialData, addCategory, updateCategory, handleClose]);

    const uploadProps = useMemo(() => ({
        name: "image",
        listType: "picture",
        maxCount: 1,
        accept: "image/*",
        beforeUpload: () => false,
        onChange: handleUploadChange,
    }), [handleUploadChange]);

    const isSubmitting = isAddLoading || isUpdateLoading;

    return (
        <Modal
            centered
            open={open}
            onCancel={handleClose}
            destroyOnClose
            maskClosable={false}
            closable={false}
            footer={null}
            title={initialData?.id ? "Update Category" : "Create Category"}
        >
            <Form
                layout="vertical"
                form={form}
                requiredMark={false}
                onFinish={handleSubmit}
                initialValues={{
                    name: initialData?.name || '',
                    image: getInitialImageList(initialData?.image),
                }}
            >
                <Form.Item
                    name="image"
                    label="Category Image"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e?.fileList || []}
                    rules={[{ required: true, message: 'Please upload an image' }]}
                    validateTrigger="onBlur"
                >
                    <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined />}>
                            Click to Upload
                        </Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="Category Name"
                    name="name"
                    rules={[
                        { required: true, message: 'Please enter category name' },
                        { min: 3, message: 'Name must be at least 3 characters' },
                        { max: 50, message: 'Name must be less than 50 characters' }
                    ]}
                >
                    <Input placeholder="Enter category name" />
                </Form.Item>

                <Form.Item className="mb-0">
                    <div className="flex justify-end gap-3">
                        <Button
                            onClick={handleClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isSubmitting}
                            disabled={isSubmitting}
                        >
                            {initialData?.id ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default React.memo(CategoryCreateModal);