import React, { useState } from "react";
import { Typography, Input, Button, Card, Form } from "antd";
import { useNavigate, useSearchParams } from "react-router";

import authA1 from "../../assets/auth-assets3.png";
import {
  useResendPasswordMutation,
  useResetPasswordMutation,
} from "../../Redux/Apis/auth/loginApis";
import toast from "react-hot-toast";
const { Text } = Typography;

const Verification = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [otp, setOtp] = useState("");
  const [newPassword, setNwPassword] = useState("");
  const [resetPassword, { isLoading: resetLoading }] =
    useResetPasswordMutation();
  const [resendPass, { isLoading: passowrdLoading }] =
    useResendPasswordMutation();

  const handleContinue = async () => {
    try {
      if (!email) {
        throw new Error("Please email verify first!");
      }
      if (otp === "") {
        throw new Error("please provide one time password!");
      }
      if (newPassword === "") {
        throw new Error("please provide valid new password!");
      }
      const data = {
        email: email,
        code: otp,
        newPassword: newPassword,
      };

      const res = await resetPassword(data).unwrap();
      if (!res?.success) {
        throw new Error(
          res?.data?.message ||
            res?.message ||
            "somthing went wrong while reset password!"
        );
      }
      toast.success(res?.message);
      navigate("/auth/login");
    } catch (error) {
      toast.error(
        error?.data?.message ||
          error?.message ||
          "something is wrong while reset the password!"
      );
    }
  };
  const resendOtpHandler = async () => {
    try {
      if (!email) {
        throw new Error("Please email verify first!");
      }
      const data = {
        email: email,
      };
      const res = await resendPass(data).unwrap();
      if (!res?.success) {
        throw new Error(
          res?.message || "Something is wrong while resend one time password!"
        );
      }
    } catch (error) {
      toast.error(
        error?.data?.message ||
          error?.message ||
          "Something is wrong while resend one time password!"
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--primary-color)] p-4">
      <Card className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg text-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold">Verify Email</h1>
          <h1 className="text-base text-gray-500">
            Please check your email and enter the code
          </h1>
        </div>
        <div className="my-2">
          <Form
            className="flex justify-center flex-col items-center gap-3 my-4"
            layout="vertical"
            requiredMark={false}
          >
            <Input.OTP
              size="large"
              length={6}
              value={otp}
              onChange={setOtp}
              className="text-center text-xl w-full"
            />
            <Form.Item className="w-full" label="New Password">
              <Input
                onChange={(e) => setNwPassword(e.target.value)}
                value={newPassword}
                name="newPassword"
                size="large"
                placeholder="Enter New passowrd"
              />
            </Form.Item>
          </Form>
        </div>

        <Button
          type="primary"
          className="w-full !bg-[var(--secondary-color)] hover:!bg-[var(--secondary-color)] !text-white"
          disabled={otp.length < 6}
          loading={resetLoading}
          size="large"
          onClick={handleContinue}
        >
          Change passowrd
        </Button>

        <div className="mt-3">
          <div>
            <Text>Didn&apos;t receive the OTP? </Text>
            <Text
              onClick={() => resendOtpHandler()}
              className="!text-[var(--secondary-color)] cursor-pointer hover:underline"
            >
              {passowrdLoading ? (
                <div class="flex flex-row gap-2">
                  <div class="w-2 h-2 rounded-full bg-white animate-bounce"></div>
                  <div class="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
                  <div class="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
                </div>
              ) : (
                "Resend OTP"
              )}
            </Text>
          </div>
        </div>
      </Card>
      <div className="w-2/5 hidden lg:block">
        <img src={authA1} alt="brand-logo" className=" mx-auto" />
      </div>
    </div>
  );
};

export default Verification;
