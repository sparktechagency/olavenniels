import React, { useEffect, useState } from 'react';
import JoditComponent from '../../components/common/JoditComponent';
import { Button } from 'antd';
import { useTermsQuery, useUpdateTermsMutation } from '../../Redux/Apis/service/termsApis';

function Terms() {
  const [content, setContent] = useState('');
  const { data: terms, isLoading } = useTermsQuery();
  const [updateTerms] = useUpdateTermsMutation();
  useEffect(() => {
    if (terms) {
      setContent(terms?.termsAndConditions?.description || 'description');
    }
  }, [terms]);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const updateTermsHandle = async () => {
    try {

      await updateTerms({ id: terms?.termsAndConditions?._id, data: { description: content } }).unwrap().then((res) => {
        if (res?.success) {
          toast.success(res?.message);
        }
      })
    } catch (error) {

    }
  };
  return (
    <div>
      <h1 className="text-2xl text-white font-bold mb-4">Terms & Condition</h1>
      <JoditComponent content={content} setContent={setContent} />
      <Button
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
