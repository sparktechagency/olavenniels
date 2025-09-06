import React, { useEffect } from "react";
import { Button, Form } from "antd";
import toast from "react-hot-toast";
import CustomInput from "../form-component/CustomInput";
import { useUpdateProfileDataMutation } from "../../Redux/Apis/service/profileApis";
const ProfileEdit = ({ image, data }) => {
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
      formData.delete("profilePicture");
    } else {
      formData.append("profilePicture", image);
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

  const inputData = [
    {
      label: "Name",
      name: "name",
      rules: [{ required: true, message: "Name is required" }],
      type: "text",
      placeholder: "Name",
      disabled: false,
    },
    {
      label: "Email",
      name: "email",
      type: "text",
      placeholder: "Email",
      className: "cursor-not-allowed p-2 w-full outline-none border-none !bg-white text-white",
      disabled: true,
    },
  ];
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
        {/* <CustomInput
          form={form}
          name="name"
          label={<span className="text-white">Name</span>}
          rules={[{ required: true, message: "Name is required" }]}
          type="text"
          placeholder="Name"
          disabled={false}
        /> */}

        {/* <CustomInput
          form={form}
          name="email"
          label={<span className="text-white">Email</span>}
          type="text"
          placeholder="Email"
          className="cursor-not-allowed p-2 w-full outline-none border-none !bg-white text-white"
          disabled={true}
        /> */}

        {inputData.map((item) => (
          <CustomInput
            key={item.name}
            form={form}
            name={item.name}
            label={<span className="text-white">{item.label}</span>}
            rules={item.rules}
            type={item.type}
            placeholder={item.placeholder}
            disabled={item.disabled}
            className={item.className}
          />
        ))}
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
