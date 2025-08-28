import React, { useEffect, useState } from 'react';
import JoditComponent from '../../components/common/JoditComponent';
import { Button } from 'antd';
import { useTermsQuery, useUpdateTermsMutation } from '../../Redux/Apis/service/termsApis';
import toast from 'react-hot-toast';

function Terms() {
  const [content, setContent] = useState('');
  const { data: terms, isLoading } = useTermsQuery();
  const [updateTerms, { isLoading: updating }] = useUpdateTermsMutation();
  useEffect(() => {
    if (terms?.success) {
      setContent(terms?.data?.description || 'description');
    }
  }, [terms]);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const updateTermsHandle = async () => {
    try {
      await updateTerms({ description: content }).unwrap().then((res) => {
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
      <h1 className="text-2xl text-white font-bold mb-4">Terms & Condition</h1>
      <JoditComponent content={content} setContent={setContent} />
      <Button
        loading={updating}
        disabled={updating}
        style={{
          width: '200px',
          backgroundColor: 'var(--secondary-color)',
          color: 'white',
          marginTop: '1rem',
        }}
        onClick={() => updateTermsHandle()}
      >
        Update
      </Button>
    </div>
  );
}

export default Terms;
