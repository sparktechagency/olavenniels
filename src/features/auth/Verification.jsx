import React, { useState } from 'react';
import { Typography, Input, Button, Card } from 'antd';
import { useNavigate } from 'react-router';
// import toast from 'react-hot-toast';
import authA1 from '../../assets/auth-assets3.png';
// import {
//   useForgetEmailPostMutation,
//   useVerifyOtpCodeMutation,
// } from '../../Redux/services/AuthApis/authApis';

const { Title, Text } = Typography;

const Verification = () => {
  const router = useNavigate();
  // const [verifyOtp, { isLoading }] = useVerifyOtpCodeMutation();
  // const [resendOtp] = useForgetEmailPostMutation();
  const [otp, setOtp] = useState('');
  const handleContinue = async () => {
    console.log(otp);
    router('/auth/reset-password');
  };
  const resendOtpHandler = async () => {
    console.log('resendOtpHandler');
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
        <div className="flex justify-center my-4">
          <Input.OTP
            size='large'
            length={6}
            value={otp}
            onChange={setOtp}
            className="text-center text-xl w-full"
          />
        </div>

        <Button
          type="primary"
          className="w-full !bg-[var(--secondary-color)] hover:!bg-[var(--secondary-color)] !text-white"
          disabled={otp.length < 6}
          // loading={isLoading}
          size='large'
          onClick={handleContinue}
        >
          Verify code
        </Button>

        <div className="mt-3">
          <div>
            <Text>Didn&apos;t receive the OTP? </Text>
            <Text
              onClick={() => resendOtpHandler()}
              className="!text-[var(--secondary-color)] cursor-pointer hover:underline"
            >
              {/* {isLoading ? (
                <div class="flex flex-row gap-2">
                  <div class="w-2 h-2 rounded-full bg-white animate-bounce"></div>
                  <div class="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
                  <div class="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
                </div> */}
              {/* ) : ( */}
              Resend OTP
              {/* )} */}
            </Text>
          </div>
        </div>
      </Card>
      <div className='w-2/5 hidden lg:block'>
        <img src={authA1} alt="brand-logo" className=" mx-auto" />
      </div>
    </div>
  );
};

export default Verification;
