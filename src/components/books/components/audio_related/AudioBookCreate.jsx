import React from "react";
import { Form, Input, Select, Button, Tabs, Upload, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import ImgCrop from "antd-img-crop";
import { useGetCategoriesQuery } from "../../../../Redux/Apis/service/categoryApis";
import { useAddAudioBookMutation } from "../../../../Redux/Apis/books/audioBookApi";
import { useAudioBookForm, prepareFormData } from "./AudioBookCreateHelpers.js";

const { TabPane } = Tabs;

const AudioUploadField = ({
  audioInputRef,
  handleAudioUpload,
  audioFile,
  audioUrl,
  resetAudioState,
  form,
}) => (
  <Form.Item
    label="Add Audio File"
    name="audio"
    validateStatus={form.getFieldError("audio") ? "error" : ""}
    help={form.getFieldError("audio")}
    required
  >
    <div className="relative">
      <input
        type="file"
        accept="audio/mpeg"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        onChange={(e) => {
          const result = handleAudioUpload(e);
          if (!result.isValid) {
            form.setFields([{ name: "audio", errors: [result.error] }]);
          } else {
            form.setFields([{ name: "audio", errors: [] }]);
          }
        }}
        ref={audioInputRef}
      />
      <div className="flex items-center justify-between border border-gray-300 px-4 py-2 rounded-md bg-white">
        <span className="text-gray-600 truncate max-w-[80%]">
          {audioFile?.name || "Upload book audio (MP3)"}
        </span>
        <span className="text-blue-600 text-sm">Browse</span>
      </div>
    </div>

    {audioUrl && (
      <div className="border border-gray-300 p-2 rounded mt-2 relative">
        <audio
          src={audioUrl}
          controls
          className="w-full h-[100px] rounded"
        />
        <button
          onClick={resetAudioState}
          className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center cursor-pointer bg-white rounded-full shadow"
          aria-label="Remove audio"
        >
          <CloseOutlined className="!text-red-500" />
        </button>
      </div>
    )}
  </Form.Item>
);

const ImageUploadSection = ({
  preview,
  fileList,
  handleImageChange,
  resetImageState,
}) => (
  <div className="w-full border border-dashed border-gray-300 rounded flex items-center justify-center relative !h-[300px]">
    {preview ? (
      <motion.img
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        src={preview}
        alt="Book cover preview"
        className="object-fill !w-[178px] !h-[200px] rounded"
      />
    ) : (
      <ImgCrop rotationSlider aspect={178 / 200} quality={1}>
        <Upload
          accept="image/*"
          listType="picture-card"
          fileList={fileList}
          onChange={handleImageChange}
          beforeUpload={() => false}
          maxCount={1}
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
        onClick={resetImageState}
        className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center cursor-pointer bg-white rounded-full shadow p-1"
        aria-label="Remove image"
      >
        <CloseOutlined className="!text-red-500" />
      </button>
    )}
  </div>
);

const AudioBookCreate = ({ setShowModal }) => {
  const [form] = Form.useForm();
  const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const [addAudioBook, { isLoading: isSubmitting }] = useAddAudioBookMutation();

  const {
    preview,
    image,
    audioFile,
    audioUrl,
    fileList,
    audioInputRef,
    handleImageChange,
    handleAudioUpload,
    resetImageState,
    resetAudioState,
  } = useAudioBookForm();

  const handleSubmit = async (values) => {
    if (!audioFile) {
      form.setFields([{ name: "audio", errors: ["Please upload an audio file"] }]);
      return;
    }

    try {
      const formData = prepareFormData(values, audioFile, image);
      await addAudioBook({ data: formData }).unwrap();
      message.success("Audio book created successfully!");
      setShowModal(false);
    } catch (error) {
      message.error(error?.data?.message || "Failed to create audio book");
      console.error("Error creating audio book:", error);
    }
  };

  return (
    <div className="flex gap-6 w-full">
      <Tabs style={{ width: "100%" }}>
        <TabPane tab="Upload Book Cover Image" key="1">
          <ImageUploadSection
            preview={preview}
            fileList={fileList}
            handleImageChange={handleImageChange}
            resetImageState={resetImageState}
          />
          <Button
            className="!bg-[var(--secondary-color)] !mt-3 hover:!bg-[var(--secondary-color)] border-none !text-white"
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>
        </TabPane>

        <TabPane tab="Fill Details" key="2">
          <div className="w-full">
            <h2 className="text-xl font-semibold mb-4">Add Audio Book</h2>
            <Form
              layout="vertical"
              requiredMark={false}
              onFinish={handleSubmit}
              form={form}
            >
              <Form.Item
                label="Book Name"
                name="bookName"
                rules={[{ required: true, message: "Please enter book name" }]}
              >
                <Input placeholder="Type here" />
              </Form.Item>

              <Form.Item
                label="Synopsis"
                name="synopsis"
                rules={[{ required: true, message: "Please enter synopsis" }]}
              >
                <Input.TextArea rows={3} placeholder="Type here" showCount maxLength={500} />
              </Form.Item>

              <Form.Item
                label="Select Category"
                name="category"
                rules={[{ required: true, message: "Please select category" }]}
              >
                <Select 
                  placeholder="Select Category"
                  loading={categoriesLoading}
                  optionFilterProp="children"
                  showSearch
                >
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
                rules={[{ required: true, message: "Please select type" }]}
              >
                <Select placeholder="Select Type">
                  <Select.Option value="recommended">Recommended</Select.Option>
                  <Select.Option value="new_release">New Release</Select.Option>
                  <Select.Option value="tranding">Trending</Select.Option>
                  <Select.Option value="for_you">For You</Select.Option>
                </Select>
              </Form.Item>

              <AudioUploadField
                audioInputRef={audioInputRef}
                handleAudioUpload={handleAudioUpload}
                audioFile={audioFile}
                audioUrl={audioUrl}
                resetAudioState={resetAudioState}
                form={form}
              />

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
                  loading={isSubmitting}
                >
                  Publish
                </Button>
              </Form.Item>
            </Form>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AudioBookCreate;