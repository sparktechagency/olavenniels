import React, { useState } from 'react';
import { Form, Input, Button, Card, Checkbox } from 'antd';
import 'antd/dist/reset.css';
import { Link } from 'react-router-dom';
import authA1 from '../../assets/auth-assets.png';
import toast from 'react-hot-toast';
import { useLoginMutation } from '../../Redux/Apis/auth/loginApis';
const Login = () => {
  const [loginUser, { isLoading }] = useLoginMutation();
  const onFinish = async (values) => {
    const data = { email: values?.email, password: values?.password };
    const existingToken = localStorage.getItem("accessToken");
    if (existingToken) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
    if (data?.email && data?.password) {
      await loginUser(data)
        .unwrap()
        .then((res) => {  
          if (res?.success) {
            const accessToken = res?.token;
            const refreshToken = res?.refreshToken;

            if (accessToken) {
              localStorage.setItem("accessToken", accessToken);
            }
            if (refreshToken) {
              localStorage.setItem("refreshToken", refreshToken);
            }

            toast.success("Login successfully");
            window.location.href = "/";
          }
        })
        .catch((error) => {
          toast.error(error?.data?.message || "Something went wrong");
        });
    } else {
      toast.error("Please enter email and password");
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--primary-color)] p-4">
      <Card className="bg-white shadow-lg relative rounded-2xl p-6 w-full max-w-lg text-center">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-bold">Welcome Back !</h1>
          <p className="text-sm text-gray-500">
            Please enter your email and password to continue
          </p>
        </div>
        <Form requiredMark={false} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email address"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Enter a valid email address!' },
            ]}
            style={{
              marginTop: 10,
              marginBottom: 10,
              textAlign: 'start',
            }}
          >
            <Input
              size='large'
              placeholder="exmple@gmail.com"
              // defaultValue={'maniksarker265@gmail.com'}
              type="email"
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
            style={{
              marginTop: 10,
              marginBottom: 10,
              textAlign: 'start',
            }}
          >
            <Input.Password
              size='large'
              placeholder="Password"
              // defaultValue={'admin123'}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>

          <div className="flex items-center justify-end">
            {/* <Form.Item
              name="remember"
              valuePropName="checked"
              style={{
                marginBottom: 10,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}


            <Link
              to="/auth/forgot-password"
              className="!text-[var(--primary-color)] hover:!underline"
            >
              Forgot password?
            </Link>
          </div>
          <Button
            loading={isLoading}
            type="primary"
            size='large'
            htmlType="submit"
            className="w-full !bg-[var(--secondary-color)] hover:!bg-[var(--secondary-color)] !text-white"
            style={{ marginTop: 10 }}
          >
            Login
          </Button>
        </Form>
      </Card>
      <div className='w-2/5 hidden lg:block'>
        <img src={authA1} alt="brand-logo" className=" mx-auto" />
      </div>
    </div>
  );
}

export default Login;
