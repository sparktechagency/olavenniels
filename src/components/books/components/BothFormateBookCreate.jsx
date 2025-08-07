import React, { useRef, useState } from "react";
import { Form, Input, Select, Button, Tabs } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
function BothFormateBookCreate({ setShowModal }) {
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [form] = Form.useForm();
  const audioInputRef = useRef(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "audio/mpeg") {
        setAudioFile(file);
        setAudioUrl(URL.createObjectURL(file));
        form.setFields([
          {
            name: "audio",
            errors: [],
          },
        ]);
      } else {
        form.setFields([
          {
            name: "audio",
            errors: ["Please upload a valid audio file"],
          },
        ]);
        e.target.value = "";
      }
    }
  };

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "application/pdf") {
        setPdfFile(file);
        setPdfUrl(URL.createObjectURL(file));

        form.setFields([
          {
            name: "pdf",
            errors: [],
          },
        ]);
      } else {
        form.setFields([
          {
            name: "pdf",
            errors: ["Please upload a valid PDF file"],
          },
        ]);

        e.target.value = "";
      }
    }
  };

  const onFinish = (values) => {
    const data = {
      ...values,
      audio: audioFile,
      image: image,
    };
    console.log("Received values of form:", data);
  };

  return (
    <div className="flex gap-6 w-full">
      {/* Upload book cover image */}
      <Tabs style={{ width: "100%" }}>
        <Tabs.TabPane tab="Upload Book Cover Image" key="1">
          <div className="w-full border border-dashed border-gray-300 rounded flex items-center justify-center relative !h-[300px]">
            {preview ? (
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                src={preview}
                alt="Preview"
                className="object-cover !h-[300px] w-full rounded"
              />
            ) : (
              <label className="cursor-pointer flex flex-col items-center justify-center w-full !h-[300px] p-4 text-gray-400">
                <span className="text-2xl">📷</span>
                <span>Upload book cover image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            )}
            {preview && (
              <button
                onClick={() => {
                  setImage(null);
                  setPreview(null);
                }}
                className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center cursor-pointer bg-white rounded-full shadow p-1"
              >
                <CloseOutlined className="!text-red-500" />
              </button>
            )}
          </div>
          <Button
            className="!bg-[var(--secondary-color)] !mt-3 hover:!bg-[var(--secondary-color)] border-none !text-white"
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Fill Details" key="2">
          <div className="w-full">
            <h2 className="text-xl font-semibold mb-4">Add E-Book</h2>
            <Form
              layout="vertical"
              requiredMark={false}
              onFinish={onFinish}
              form={form}
            >
              <Form.Item
                label="Book Name"
                name="bookName"
                rules={[{ required: true }]}
              >
                <Input placeholder="Type here" />
              </Form.Item>

              <Form.Item
                label="Synopsis"
                name="synopsis"
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={3} placeholder="Type here" />
              </Form.Item>

              <Form.Item
                label="Select Category"
                name="category"
                rules={[{ required: true }]}
                initialValue="fiction"
              >
                <Select>
                  <Select.Option value="fiction">Fiction</Select.Option>
                  <Select.Option value="download">Downloaded</Select.Option>
                  <Select.Option value="inProgress">In Progress</Select.Option>
                  <Select.Option value="finished">Finished</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Add PDF File"
                name="pdf"
                rules={[
                  {
                    validator: (_, value) => {
                      if (!pdfFile) {
                        return Promise.reject(
                          new Error("Please upload a PDF file")
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={handlePdfUpload}
                />

                {/* Styled fake input area */}
                <div className="flex items-center justify-between border px-4 py-2 rounded bg-white">
                  <span className="text-gray-600">
                    {pdfFile?.name || "Upload book pdf"}
                  </span>
                  <span className="text-blue-600 text-sm">Browse</span>
                </div>
              </Form.Item>
              {pdfUrl && (
                <div className="border border-gray-300 rounded mt-2 relative">
                  <iframe
                    src={pdfUrl}
                    className="w-full h-[300px] rounded"
                    title="PDF Preview"
                  ></iframe>
                  <button
                    onClick={() => {
                      setPdfFile(null);
                      setPdfUrl(null);
                    }}
                    className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center cursor-pointer bg-white rounded-full shadow"
                  >
                    <CloseOutlined className="!text-red-500" />
                  </button>
                </div>
              )}

              <Form.Item
                label="Add Audio File"
                name="audio"
                rules={[{ required: true }]}
              >
                <input
                  type="file"
                  accept="audio/mpeg"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={handleAudioUpload}
                  ref={audioInputRef} // Add this ref
                />

                {/* Styled fake input area */}
                <div className="flex items-center justify-between border px-4 py-2 rounded bg-white">
                  <span className="text-gray-600">
                    {audioFile?.name || "Upload book audio"}
                  </span>
                  <span className="text-blue-600 text-sm">Browse</span>
                </div>
              </Form.Item>

              {audioUrl && (
                <div className="border border-gray-300 rounded mt-2 relative">
                  <audio
                    src={audioUrl}
                    controls
                    className="w-full h-[100px] rounded"
                  ></audio>
                  <button
                    onClick={() => {
                      setAudioFile(null);
                      setAudioUrl(null);
                      if (audioInputRef.current) {
                        audioInputRef.current.value = "";
                      }
                    }}
                    className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center cursor-pointer bg-white rounded-full shadow"
                  >
                    <CloseOutlined className="!text-red-500" />
                  </button>
                </div>
              )}
              <Form.Item className="!mt-3">
                <Button
                  className="!bg-[var(--secondary-color)] !mr-2 hover:!bg-[var(--secondary-color)] border-none !text-white"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="!bg-yellow-500 hover:!bg-yellow-600 border-none px-6"
                >
                  Publish
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default BothFormateBookCreate;
