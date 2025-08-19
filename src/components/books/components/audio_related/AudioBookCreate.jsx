import React, { useEffect } from "react";
import { Form, Input, Select, Button, Tabs, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useGetCategoriesQuery } from "../../../../Redux/Apis/service/categoryApis";
import { useAddAudioBookMutation, useUpdateAudioBookMutation } from "../../../../Redux/Apis/books/audioBookApi";
import { useAudioBookForm, prepareFormData } from "./AudioBookCreateHelpers.js";
import ImageUploadSection from "./ImageUploadSection.jsx";
import toast from "react-hot-toast";
import { imageUrl } from "../../../../utils/server.js";

const { TabPane } = Tabs;

const AudioUploadField = ({
  audioInputRef,
  handleAudioUpload,
  audioFile,
  audioUrl,
  resetAudioState,
  form,
  existingAudioUrl,
}) => {
  const handleFileChange = (e) => {
    const result = handleAudioUpload(e);
    if (!result.isValid) {
      form.setFields([{ name: "audio", errors: [result.error] }]);
    } else {
      form.setFields([{ name: "audio", errors: [] }]);
    }
  };

  const handleRemoveAudio = (e) => {
    e.preventDefault();
    resetAudioState();
    if (existingAudioUrl) {
      // If we have an existing audio URL, we need to tell the form to remove it
      form.setFieldsValue({ audio: null });
    }
  };

  return (
    <div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Audio File {!existingAudioUrl && <span className="text-red-500">*</span>}
        </label>
        <Form.Item
          name="audio"
          validateStatus={form.getFieldError("audio") ? "error" : ""}
          help={form.getFieldError("audio")}
          className="mb-0"
        >
          <div className="relative">
            <input
              type="file"
              accept="audio/mpeg"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              onChange={handleFileChange}
              ref={audioInputRef}
            />
            <div className="flex items-center justify-between border border-gray-300 px-4 py-2 rounded-md bg-white">
              <span className="text-gray-600 truncate max-w-[80%]">
                {audioFile?.name || "Upload book audio (MP3)"}
              </span>
              <span className="text-blue-600 text-sm">Browse</span>
            </div>
          </div>
        </Form.Item>
      </div>

      {(audioUrl || existingAudioUrl) && (
        <div className="border border-gray-300 p-2 rounded mt-2 relative">
          <audio
            src={audioUrl || existingAudioUrl}
            controls
            className="w-full h-[100px] rounded"
          />
          <button
            onClick={handleRemoveAudio}
            className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center cursor-pointer bg-white rounded-full shadow"
            aria-label="Remove audio"
          >
            <CloseOutlined className="!text-red-500" />
          </button>
        </div>
      )}
    </div>
  );
};


const AudioBookCreate = ({ setShowModal, item }) => {
  const [form] = Form.useForm();
  const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const [addAudioBook, { isLoading: isSubmitting }] = useAddAudioBookMutation();
  const [updateAudioBook, { isLoading: isUpdating }] = useUpdateAudioBookMutation();
  console.log(item)
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
    setPreview,
    setFileList,
    setAudioUrl
  } = useAudioBookForm();

  useEffect(() => {
    if (item) {
      form.setFields([
        { name: "bookName", value: item?.bookName },
        { name: "synopsis", value: item?.synopsis },
        { name: "category", value: item?.category?._id },
        { name: "tags", value: item?.tags },
      ]);

      if (item?.bookCover) {
        setPreview(imageUrl(item.bookCover));
        setFileList([{
          uid: '-1',
          name: 'current-image.png',
          status: 'done',
          url: item.bookCover,
        }]);
      }

      if (item?.audioUrl) {
        setAudioUrl(item.audioUrl);
      }
    }
  }, [item]);

  const handleSubmit = async (values) => {
    if (!item && !audioFile) {
      form.setFields([{ name: "audio", errors: ["Please upload an audio file"] }]);
      return;
    }

    try {
      const formData = prepareFormData(
        values,
        audioFile,
        image,
        item?.audioUrl, // Pass existing audio URL if in edit mode
        item?.bookCover // Pass existing image URL if in edit mode
      );

      if (item) {
        await updateAudioBook({ id: item._id, data: formData }).unwrap().then((res) => {
          if (res?.success) {
            toast.success(res?.message || "Audio Book Updated Successfully");
            setShowModal(false);
          }
        });
      } else {
        await addAudioBook({ data: formData }).unwrap().then((res) => {
          if (res?.success) {
            toast.success(res?.message || "Audio Book Created Successfully");
            setShowModal(false);
          }
        });
      }

      setShowModal(false);
    } catch (error) {
      toast.error(error?.data?.message || (item ? "Failed to update audio book" : "Failed to create audio book"));
      console.error(`Error ${item ? 'updating' : 'creating'} audio book:`, error);
    }
  };

  return (
    <div className="flex gap-6 w-full">
      <Tabs style={{ width: "100%" }}>
        <TabPane tab="Upload Book Cover Image" key="1">
          <ImageUploadSection
            item={item}
            image={image}
            preview={preview}
            fileList={fileList}
            setFileList={setFileList}
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
                existingAudioUrl={item?.audioUrl}
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