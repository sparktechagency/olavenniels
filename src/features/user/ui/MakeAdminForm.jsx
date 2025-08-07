import { Button, Form, Input, Modal } from 'antd'
import React from 'react'

function MakeAdminForm({ open, onCancel, setData }) {
    const onFinish = (values) => {
        console.log(values)
        setData((prev) => [...prev, values])
        onCancel()
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
                    <Button size='large' type="primary" htmlType="submit" style={{ backgroundColor: "var(--secondary-color)", color: "white" }}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default MakeAdminForm