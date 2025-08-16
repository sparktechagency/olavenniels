import React, { useRef, useState } from "react";
import { Form, Input, Select, Button, Tabs, Upload } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import ImgCrop from "antd-img-crop";
import { useGetCategoriesQuery } from "../../../../Redux/Apis/service/categoryApis";

function AudioBookCreate({ setShowModal }) {
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const audioInputRef = useRef(null);
  const { data: categories } = useGetCategoriesQuery();

  // Image change handler
  const handleImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj;
      setImage(file);

      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setPreview(null);
    }
  };

  // Audio upload handler
  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "audio/mpeg") {
        setAudioFile(file);
        setAudioUrl(URL.createObjectURL(file));
        form.setFields([{ name: "audio", errors: [] }]);
      } else {
        form.setFields([
          { name: "audio", errors: ["Please upload a valid audio file"] },
        ]);
        e.target.value = "";
      }
    }
  };

  const onFinish = (values) => {
    if (!audioFile) {
      form.setFields([
        { name: "audio", errors: ["Please upload an audio file"] },
      ]);
      return;
    }
    const data = { ...values, audio: audioFile, image: image };
    console.log("Received values of form:", data);
  };

  return (
    <div className="flex gap-6 w-full">
      <Tabs style={{ width: "100%" }}>
        <Tabs.TabPane tab="Upload Book Cover Image" key="1">
          <div className="w-full border border-dashed border-gray-300 rounded flex items-center justify-center relative !h-[300px]">
            {preview ? (
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                src={preview}
                alt="Preview"
                className="object-fill !w-[178px] !h-[200px] rounded"
              />
            ) : (
              <ImgCrop
                rotationSlider
                aspect={178 / 200}
                quality={1}
              >
                <Upload
                  accept="image/*"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleImageChange}
                  beforeUpload={() => false}
                >
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-2xl">📷</span>
                    <span>Upload book cover image</span>
                  </div>
                </Upload>
              </ImgCrop>
            )}

            {preview && (
              <button
                onClick={() => {
                  setImage(null);
                  setPreview(null);
                  setFileList([]);
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

        {/* Second Tab */}
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
              >
                <Select placeholder="Select Category">
                  {categories?.data?.bookCategories?.map((category) => (
                    <Select.Option key={category?._id} value={category?._id}>
                      {category?.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Select Type"
                name="tags"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select Type">
                  <Select.Option value="recommended">Recommended</Select.Option>
                  <Select.Option value="new_release">New Release</Select.Option>
                  <Select.Option value="tranding">Tranding</Select.Option>
                  <Select.Option value="for_you">For You</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Add Audio File"
                name="audio"
                validateStatus={form.getFieldError("audio") ? "error" : ""}
                help={form.getFieldError("audio")}
              >
                <input
                  type="file"
                  accept="audio/mpeg"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={handleAudioUpload}
                  ref={audioInputRef}
                />
                <div className="flex items-center justify-between border border-gray-300 px-4 py-2 rounded-md bg-white">
                  <span className="text-gray-600">
                    {audioFile?.name || "Upload book audio"}
                  </span>
                  <span className="text-blue-600 text-sm">Browse</span>
                </div>
              </Form.Item>

              {audioUrl && (
                <div className="border border-gray-300 p-2 rounded mt-2 relative">
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

              <Form.Item className="flex items-center justify-end !mt-2">
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

export default AudioBookCreate;
