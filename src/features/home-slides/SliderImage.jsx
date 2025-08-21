import React, { useState } from 'react';
import { Button, Popconfirm, Spin, Upload, Progress } from 'antd';
import { FaTrash, FaUpload } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useBannerQuery, useAddBannerMutation, useDeleteBannerMutation } from '../../Redux/Apis/service/bannerApis';
import { imageUrl } from '../../utils/server';
import Loader from '../../components/Loader/Loader';

const SliderImage = () => {
  const { data, isLoading: bannerLoading } = useBannerQuery()
  const [deleteBanner, { isLoading: deleteLoading }] = useDeleteBannerMutation()
  const [addBanner, { isLoading: addLoading }] = useAddBannerMutation()


  const [uploadProgress, setUploadProgress] = useState(0);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteProgress, setDeleteProgress] = useState(0);


  const simulateUploadProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.random() * 20;
      });
    }, 200);
    return interval;
  };


  const simulateDeleteProgress = (id) => {
    setDeletingId(id);
    setDeleteProgress(0);
    const interval = setInterval(() => {
      setDeleteProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.random() * 25;
      });
    }, 150);
    return interval;
  };

  const handleUpload = async ({ file }) => {
    const progressInterval = simulateUploadProgress();

    try {
      const formData = new FormData();
      formData.append("image", file);

      await addBanner({ data: formData }).unwrap().then((res) => {
        clearInterval(progressInterval);
        setUploadProgress(100);

        if (res?.success) {
          toast.success(res?.message || "Banner added successfully");
          setTimeout(() => setUploadProgress(0), 1000);
        }
      })
    } catch (error) {
      clearInterval(progressInterval);
      setUploadProgress(0);
      toast.error(error?.data?.message || "Failed to add banner");
    }
  };

  const handleDelete = async (id) => {
    const progressInterval = simulateDeleteProgress(id);

    try {
      await deleteBanner(id).unwrap().then((res) => {
        clearInterval(progressInterval);
        setDeleteProgress(100);

        if (res?.success) {
          toast.success(res?.message || 'Image deleted successfully');
          setTimeout(() => {
            setDeleteProgress(0);
            setDeletingId(null);
          }, 1000);
        }
      })
    } catch (error) {
      clearInterval(progressInterval);
      setDeleteProgress(0);
      setDeletingId(null);
      toast.error(error?.data?.message || 'Image deleted failed');
    }
  };

  if (bannerLoading) {
    return <div className='flex items-center justify-center'>
      <Loader message={"Banner Loading..."} />
    </div>
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-white">
        Banner Management
      </h1>

      {/* Upload Section */}
      <div className="mb-6">
        <Upload
          beforeUpload={() => false}
          onChange={handleUpload}
          showUploadList={false}
          accept="image/*"
          disabled={addLoading}
        >
          <Button
            style={{
              backgroundColor: '#FABA00',
              color: '#2A2A2A',
              border: 'none',
              cursor: addLoading ? 'not-allowed' : 'pointer',
              padding: '10px 20px',
              fontWeight: '600',
            }}
            icon={addLoading ? <Spin size="small" /> : <FaUpload />}
            disabled={addLoading}
          >
            {addLoading ? 'Uploading...' : 'Upload Slide Image'}
          </Button>
        </Upload>

        {/* Upload Progress Bar */}
        {uploadProgress > 0 && (
          <div className="mt-3 max-w-md">
            <Progress
              percent={Math.round(uploadProgress)}
              strokeColor={{
                '0%': '#FABA00',
                '100%': '#2A2A2A',
              }}
              trailColor="#f0f0f0"
              size="small"
              status={uploadProgress === 100 ? 'success' : 'active'}
              format={(percent) => `${percent}%`}
            />
            <p className="text-sm mt-1" style={{ color: '#2A2A2A' }}>
              {uploadProgress === 100 ? 'Upload completed!' : 'Uploading banner...'}
            </p>
          </div>
        )}
      </div>

      {/* Banner Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.banners?.map((banner, index) => (
          <div
            key={banner?._id}
            className="relative overflow-hidden rounded-lg shadow-lg"
          >
            {/* Delete Progress Overlay */}
            {deletingId === banner?._id && (
              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-10">
                <div className="bg-white rounded-lg p-4 max-w-xs w-full mx-4">
                  <Progress
                    percent={Math.round(deleteProgress)}
                    strokeColor={{
                      '0%': '#FABA00',
                      '100%': '#2A2A2A',
                    }}
                    trailColor="#f0f0f0"
                    size="small"
                    status={deleteProgress === 100 ? 'success' : 'active'}
                    format={(percent) => `${percent}%`}
                  />
                  <p className="text-sm mt-2 text-center" style={{ color: '#2A2A2A' }}>
                    {deleteProgress === 100 ? 'Deleted successfully!' : 'Deleting banner...'}
                  </p>
                </div>
              </div>
            )}

            <img
              src={imageUrl(banner?.image)}
              alt="slide"
              className="w-full h-[300px] object-cover"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 flex justify-between items-center">
              <div className="flex gap-2">
                <Popconfirm
                  title="Are you sure to delete this slide?"
                  description="This action cannot be undone."
                  placement="bottom"
                  onConfirm={() => handleDelete(banner?._id)}
                  okText="Yes, Delete"
                  cancelText="Cancel"
                  okButtonProps={{
                    style: {
                      backgroundColor: '#FABA00',
                      borderColor: '#FABA00',
                      color: '#2A2A2A',
                      fontWeight: '600'
                    }
                  }}
                  cancelButtonProps={{
                    style: {
                      borderColor: '#2A2A2A',
                      color: '#2A2A2A'
                    }
                  }}
                  disabled={deletingId === banner?._id}
                >
                  <Button
                    type="primary"
                    danger
                    icon={deletingId === banner?._id ? <Spin size="small" /> : <FaTrash />}
                    disabled={deletingId === banner?._id}
                    style={{
                      backgroundColor: deletingId === banner?._id ? '#cccccc' : '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      cursor: deletingId === banner?._id ? 'not-allowed' : 'pointer',
                      padding: '5px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                    }}
                  />
                </Popconfirm>
              </div>

              {/* Banner Info */}
              <div className="text-white text-sm">
                <span>Banner #{index + 1}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {!data?.data?.banners?.length && !addLoading && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4" style={{ color: '#FABA00' }}>
            🖼️
          </div>
          <h3 className="text-xl font-semibold mb-2" style={{ color: '#2A2A2A' }}>
            No banners yet
          </h3>
          <p className="text-gray-500">
            Upload your first banner image to get started
          </p>
        </div>
      )}
    </div>
  );
};

export default SliderImage;