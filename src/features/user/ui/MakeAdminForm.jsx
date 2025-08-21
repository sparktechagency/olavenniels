import { Button, Form, Input, Modal } from 'antd'
import React from 'react'
import { useCreateAdminMutation } from '../../../Redux/Apis/service/adminApis'
import toast from 'react-hot-toast';
function MakeAdminForm({ open, onCancel }) {
    const [createAdmin, { isLoading }] = useCreateAdminMutation()
    const onFinish = async (values) => {
        const information = {
            name: values.name,
            email: values.email,
            password: values.password
        }
        try {
            await createAdmin({ data: information }).unwrap().then((res) => {
                if (res?.success) {
                    toast.success(res?.message)
                    onCancel()
                }
            })
        } catch (error) {
            toast.error(error?.data?.message || 'Something went wrong')
        }
    }
    return (
        <Modal
            open={open}
            onCancel={onCancel}
            footer={null}
            width={500}
            centered
            title="Make Admin"
        >
            <Form layout='vertical' requiredMark={false} onFinish={onFinish}>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please input your name' }]}
                >
                    <Input size='large' placeholder="Enter your name" />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, message: 'Please input your email' }]}
                >
                    <Input size='large' placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please input your password' }]}
                >
                    <Input.Password size='large' placeholder="Enter your password" />
                </Form.Item>

                <Form.Item>
                    <Button loading={isLoading} disabled={isLoading} size='large' type="primary" htmlType="submit" style={{ backgroundColor: "var(--secondary-color)", color: "white" }}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default MakeAdminForm