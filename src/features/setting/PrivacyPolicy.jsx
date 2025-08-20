import React, { useEffect, useState } from 'react';
import JoditComponent from '../../components/common/JoditComponent';
import { Button } from 'antd';
import toast from 'react-hot-toast';
import { useGetPrivacyPolicyQuery, useUpdatePrivacyPolicyMutation } from '../../Redux/Apis/service/policyApis';
import Loader from '../../components/Loader/Loader';

function PrivacyPolicy() {
  const [content, setContent] = useState('');
  const { data: privacyPolicy, isLoading } = useGetPrivacyPolicyQuery();
  const [updatePrivacyPolicy] = useUpdatePrivacyPolicyMutation();
  useEffect(() => {
    if (privacyPolicy) {
      setContent(privacyPolicy?.privacies?.description || 'description');
    }
  }, [privacyPolicy]);

  if (isLoading) {
    return <Loader message="Loading Privacy Policy..." />;
  }

  const updatePrivacyPolicyHandle = async () => {
    try {
      const data = {
        description: content
      }
      await updatePrivacyPolicy({ data }).unwrap().then((res) => {
        if (res?.success) {
          toast.success(res?.message);
        }
      })
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  return (
    <div>
      <h1 className="text-2xl text-white font-bold mb-4">Privacy Policy</h1>
      <JoditComponent content={content} setContent={setContent} />
      <Button
        style={{
          width: '200px',
          backgroundColor: 'var(--secondary-color)',
          color: 'white',
          marginTop: '1rem',
        }}
        onClick={() => {
          updatePrivacyPolicyHandle();
        }}
      >
        Update
      </Button>
    </div>
  );
}

export default PrivacyPolicy;
