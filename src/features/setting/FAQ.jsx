import React, { useState } from 'react';
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Space,
  Popconfirm,
  Empty,
} from 'antd';
import { FaEdit } from 'react-icons/fa';
import { AiTwotoneDelete } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa6';
import TextArea from 'antd/es/input/TextArea';
import toast from 'react-hot-toast';
import { useFaqQuery, useAddFaqMutation, useUpdateFaqMutation, useDeleteFaqMutation } from '../../Redux/Apis/service/faqApis';

function FrequentlyAskedQuestions() {
  const { data, isLoading } = useFaqQuery()
  const [addFaq] = useAddFaqMutation()
  const [updateFaq] = useUpdateFaqMutation()
  const [deleteFaq] = useDeleteFaqMutation()
  const [isEditing, setIsEditing] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();

  const handleAddClick = () => {
    setShowModal(true);
    setIsEditing(false);
  };

  const handleEdit = (faq) => {
    form.setFieldsValue(faq);
    setShowModal(true);
    setIsEditing(true);
  };

  const handleSubmit = async (values) => {
    try {
      if (isEditing) {
        await updateFaq(values).unwrap().then((res) => {
          console.log(res)
          setShowModal(false);
          setIsEditing(false);
          toast.success('FAQ updated successfully!');
        })
      } else {
        await addFaq(values).unwrap().then((res) => {
          console.log(res)
          setShowModal(false);
          setIsEditing(false);
          toast.success('FAQ added successfully!');
        })
      }
    } catch (error) {
      toast.error('An error occurred while saving FAQ.');
      console.error(error);
    }
  };

  const handleDelete = async (index) => {
    try {
      await deleteFaq(index).unwrap().then((res) => {
        console.log(res)
        toast.success('FAQ deleted successfully!');
      })
    } catch (error) {
      toast.error('Failed to delete FAQ.');
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card loading key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between !w-full mb-12">
        <div className="w-full p-2  flex items-center justify-between pr-12 shadow-sm rounded-lg">
          <h1 className="text-2xl text-white font-bold">FAQ</h1>
          <Button
            style={{
              width: '200px',
              backgroundColor: 'var(--secondary-color)',
              color: 'white',
            }}
            onClick={handleAddClick}
          >
            <FaPlus />
            Add FAQ
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {data?.data?.length > 0 ? (
          data?.data?.map((faq) => (
            <Card key={faq?._id}>
              <div className="flex items-center justify-between my-4">
                <h1>{faq?.question}</h1>
                <Space>
                  <Button onClick={() => handleEdit(faq)}>
                    <FaEdit />
                  </Button>
                  <Popconfirm
                    title="Delete this FAQ?"
                    description="Are you sure you want to delete this FAQ?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => handleDelete(faq?._id)}
                  >
                    <Button danger>
                      <AiTwotoneDelete />
                    </Button>
                  </Popconfirm>
                </Space>
              </div>
              <p>{faq?.answer}</p>
            </Card>
          ))
        ) : (
          <div className="col-span-2">
            <Empty description="No Frequently Asked Questions Available" />
          </div>
        )}
      </div>
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        title="Add New FAQ"
        destroyOnClose
      >
        <Form
          requiredMark={false}
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            label="Question"
            name="question"
            rules={[{ required: true, message: 'Please enter a question' }]}
          >
            <Input placeholder="Enter your question" />
          </Form.Item>

          <Form.Item
            label="Answer"
            name="answer"
            rules={[{ required: true, message: 'Please enter an answer' }]}
          >
            <TextArea placeholder="Enter your answer" rows={4} />
          </Form.Item>

          <Form.Item>
            <div className="flex items-center justify-end">
              <Button
                className="!bg-[var(--secondary-color)] !text-white"
                htmlType="submit"
              >
                Save FAQ
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default FrequentlyAskedQuestions;
