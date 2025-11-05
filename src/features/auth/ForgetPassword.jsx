import React from "react";
import { Form, Input, Button, Typography } from "antd";
import "antd/dist/reset.css";
import authA1 from "../../assets/auth-assets2.png";
import { useNavigate } from "react-router";
import { useForgotPasswordMutation } from "../../Redux/Apis/auth/loginApis";
import toast from "react-hot-toast";

const { Title, Text } = Typography;

const ForgetPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const data = {
        email: values.email,
      };
      const res = await forgotPassword(data).unwrap();
      if (!res?.success) {
        throw new Error(res?.message || "Something went wrong");
      }
      navigate(`/auth/varification?email=${values?.email}`);
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--primary-color)] p-4">
      <div className="bg-white relative shadow-lg rounded-2xl p-6 w-full max-w-lg text-center">
        <div className="flex mb-6 flex-col items-center">
          <Title level={3} className="mb-1">
            Forgot Password
          </Title>
          <Text type="secondary">
            Enter your email address to reset your password
          </Text>
        </div>

        <Form requiredMark={false} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email address"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Enter a valid email address!" },
            ]}
            style={{
              marginTop: 10,
              marginBottom: 10,
              textAlign: "start",
            }}
          >
            <Input
              size="large"
              placeholder="exmple@gmail.com"
              type="email"
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            className="w-full !bg-[var(--secondary-color)] hover:!bg-[var(--secondary-color)] !text-white"
            style={{ marginTop: 10 }}
          >
            {isLoading ? (
              <div class="flex flex-row gap-2">
                <div class="w-2 h-2 rounded-full bg-white animate-bounce"></div>
                <div class="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
                <div class="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
              </div>
            ) : (
              "Get OTP"
            )}
          </Button>
        </Form>
      </div>
      <div className="w-2/5 hidden lg:block">
        <img src={authA1} alt="brand-logo" className=" mx-auto" />
      </div>
    </div>
  );
};

export default ForgetPassword;
