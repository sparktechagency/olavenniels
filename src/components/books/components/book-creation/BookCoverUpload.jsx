import React, { useState } from "react";
import { Button, Upload } from "antd";
import ImgCrop from "antd-img-crop";

const BookCoverUpload = ({ setImage, setShowModal }) => {
    const [fileList, setFileList] = useState([]);

    const handleImageChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);

        if (newFileList.length > 0) {
            const file = newFileList[0].originFileObj;
            setImage(file);
        } else {
            setImage(null);
        }
    };

    return (
        <>
            <ImgCrop aspect={178 / 200} rotationSlider>
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={handleImageChange}
                    accept="image/*"
                    onPreview={() => false}
                >
                    {fileList.length < 1 && '+ Upload'}
                </Upload>
            </ImgCrop>
            <Button
                className="!bg-[var(--secondary-color)] !mt-2 hover:!bg-[var(--secondary-color)] border-none !text-white"
                onClick={() => setShowModal(false)}
            >
                Close
            </Button>
        </>
    );
};

export default BookCoverUpload;