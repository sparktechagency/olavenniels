import React from 'react'
import { motion } from 'framer-motion'
import ImgCrop from 'antd-img-crop'
import { Upload } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

function ImageUploadSection({ preview,
    fileList,
    handleImageChange,
    resetImageState, }) {
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
                <ImgCrop rotationSlider aspect={178 / 200} quality={1}>
                    <Upload
                        accept="image/*"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleImageChange}
                        beforeUpload={() => false}
                        maxCount={1}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <span className="text-2xl">📷</span>
                            <span>Upload book cover image</span>
                        </div>
                    </Upload>
                </ImgCrop>
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