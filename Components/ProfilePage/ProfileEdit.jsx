import React, { useEffect } from "react";
import { Button, ConfigProvider, Form, Input } from "antd";
import toast from "react-hot-toast";
import { useUpdateProfileDataMutation } from "../../src/Redux/services/profileApis";
const ProfileEdit = ({ image, data }) => {
  console.log(image);
  const [form] = Form.useForm();
  const [setProfileUpdate, { isLoading: isProfileUpdate }] =
    useUpdateProfileDataMutation();

  useEffect(() => {
    form.setFieldsValue({
      name: data?.name,
      email: data?.email,
    });
  }, [data]);
  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values?.name);
    if (image === null) {
      formData.delete("profile_image");
    } else {
      formData.append("profile_image", image);
    }

    try {
      await setProfileUpdate({ data: formData })
        .unwrap()
        .then((res) => {
          if (res?.data?.success) {
            toast.dismiss();
            toast.success(res?.data?.message || "Profile updated successfully");
          }
        });
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };
  return (
    <div>
      <p className="text-white text-3xl text-center">
        Edit Your Profile
      </p>
      <Form
        className="text-white"
        requiredMark={false}
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="name"
          label={<span className="text-white">Name</span>}
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input
            placeholder="Name"
            size="large"
            className="p-2 w-full outline-none border-none !text-white"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label={<span className="text-white">Email</span>}
        >
          <Input
            disabled
            type="email"
            size="large"
            placeholder="Email"
            className="cursor-not-allowed p-2 w-full outline-none border-none !bg-white text-white"
          />
        </Form.Item>
        <Button
          htmlType="submit"
          disabled={isProfileUpdate}
          style={{
            backgroundColor: "",
            color: "#fff",
            height: 40,
          }}
          className="!bg-[var(--secondary-color)] !hover:bg-[var(--secondary-color)] !text-white w-full"
          loading={isProfileUpdate}
        >
          Update Profile
        </Button>
      </Form>
    </div>
  );
};

export default ProfileEdit;
