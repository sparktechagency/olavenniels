import React from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Form } from "antd";

const PdfUploadSection = ({ pdfFile, setPdfFile, form }) => {
    console.log(pdfFile)
    const handlePdfChange = (info) => {
        console.log(info)
        setPdfFile(info?.fileList[0]?.originFileObj)
        form.setFields([{ name: "pdfFile", errors: [] }]);
    };


    return (
        <Form.Item
            label={<span>Upload PDF {pdfFile && <small>please click on upload to replace</small>}</span>}
            name="pdfFile"
            rules={[{ required: true, message: "Please upload PDF file" }]}
            form={form}
        >
            <Upload
                name="pdfFile"
                accept=".pdf"
                maxCount={1}
                onChange={handlePdfChange}
                beforeUpload={() => false}
                showUploadList={true}
            >
                <Button icon={<UploadOutlined />}>Click to Upload PDF</Button>
            </Upload>
            {pdfFile && <div className="mt-3">
                <iframe
                    src={pdfFile instanceof File ? URL.createObjectURL(pdfFile) : pdfFile}
                    title={pdfFile?.name}
                    width="100%"
                    height="300px"
                />
            </div>}

        </Form.Item>
    );
};

export default PdfUploadSection;
