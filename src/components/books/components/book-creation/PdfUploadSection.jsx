import React from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Form } from "antd";

const PdfUploadSection = ({ pdfFile, setPdfFile, form }) => {
    const handlePdfChange = (info) => {
        console.log(info)
        setPdfFile(info?.fileList[0]?.originFileObj)
        form.setFields([{ name: "pdfFile", errors: [] }]);
    };

    return (
        <Form.Item
            label="Upload PDF"
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
            {pdfFile && (
                <p className="mt-2 text-sm text-gray-600">
                    Selected: <span className="font-medium">{pdfFile.name}</span>
                </p>
            )}
        </Form.Item>
    );
};

export default PdfUploadSection;
