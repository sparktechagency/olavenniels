import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import ImgCrop from 'antd-img-crop'
import { Upload } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

function ImageUploadSection({ preview,
    fileList,
    handleImageChange,
    resetImageState,
    item }) {
    useEffect(() => {
        if (item) {

        }
    }, [item]);

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
    }

    return (
        <div className="w-full border border-dashed border-gray-300 rounded flex items-center justify-center relative !h-[300px]">
            {preview ? (
                <motion.img
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    src={preview}
                    alt="Book cover preview"
                    className="object-fill !w-[178px] !h-[200px] rounded"
                />
            ) : (
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={handleImageChange}
                    onPreview={onPreview}
                >
                    {fileList.length < 5 && '+ Upload'}
                </Upload>
            )}

            {preview && (
                <button
                    onClick={resetImageState}
                    className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center cursor-pointer bg-white rounded-full shadow p-1"
                    aria-label="Remove image"
                >
                    <CloseOutlined className="!text-red-500" />
                </button>
            )}
        </div>
    )
}

export default React.memo(ImageUploadSection)