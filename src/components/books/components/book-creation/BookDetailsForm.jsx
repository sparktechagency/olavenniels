import React, { useRef, useState } from "react";
import { Form, Input, Select, Button } from "antd";
import FileUploadField from "./FileUploadField";
import PreviewWithRemove from "./PreviewWithRemove";

const BookDetailsForm = ({
    setShowModal,
    image,
    audioFile,
    setAudioFile,
    pdfFile,
    setPdfFile,
}) => {
    const [form] = Form.useForm();
    const audioInputRef = useRef(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);

    const handleAudioUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type === "audio/mpeg") {
                setAudioFile(file);
                setAudioUrl(URL.createObjectURL(file));
                form.setFields([{ name: "audio", errors: [] }]);
            } else {
                form.setFields([{ name: "audio", errors: ["Please upload a valid audio file"] }]);
                e.target.value = "";
            }
        }
    };

    const handlePdfUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type === "application/pdf") {
                setPdfFile(file);
                setPdfUrl(URL.createObjectURL(file));
                form.setFields([{ name: "pdf", errors: [] }]);
            } else {
                form.setFields([{ name: "pdf", errors: ["Please upload a valid PDF file"] }]);
                e.target.value = "";
            }
        }
    };

    const onFinish = (values) => {
        const data = {
            ...values,
            audio: audioFile,
            pdf: pdfFile,
            image,
        };
        console.log("Received values of form:", data);
    };

    const handleRemoveAudio = () => {
        setAudioFile(null);
        setAudioUrl(null);
        if (audioInputRef.current) {
            audioInputRef.current.value = "";
        }
    };

    const handleRemovePdf = () => {
        setPdfFile(null);
        setPdfUrl(null);
    };

    return (
        <div className="w-full">
            <h2 className="text-xl font-semibold mb-4">Add E-Book</h2>
            <Form layout="vertical" requiredMark={false} onFinish={onFinish} form={form}>
                <Form.Item label="Book Name" name="bookName" rules={[{ required: true }]}>
                    <Input placeholder="Type here" />
                </Form.Item>

                <Form.Item label="Synopsis" name="synopsis" rules={[{ required: true }]}>
                    <Input.TextArea rows={3} placeholder="Type here" />
                </Form.Item>

                <Form.Item
                    label="Select Category"
                    name="category"
                    rules={[{ required: true }]}
                    initialValue="fiction"
                >
                    <Select>
                        <Select.Option value="fiction">Fiction</Select.Option>
                        <Select.Option value="download">Downloaded</Select.Option>
                        <Select.Option value="inProgress">In Progress</Select.Option>
                        <Select.Option value="finished">Finished</Select.Option>
                    </Select>
                </Form.Item>

                {/* PDF Upload */}
                <Form.Item
                    label="Add PDF File"
                    name="pdf"
                    rules={[
                        {
                            validator: () =>
                                pdfFile ? Promise.resolve() : Promise.reject(new Error("Please upload a PDF file")),
                        },
                    ]}
                >
                    <FileUploadField
                        accept=".pdf,application/pdf"
                        onChange={handlePdfUpload}
                        fileName={pdfFile?.name}
                        placeholder="Upload book pdf"
                    />
                </Form.Item>

                {pdfUrl && (
                    <PreviewWithRemove onRemove={handleRemovePdf}>
                        <iframe src={pdfUrl} className="w-full h-[300px] rounded" title="PDF Preview" />
                    </PreviewWithRemove>
                )}

                {/* Audio Upload */}
                <Form.Item label="Add Audio File" name="audio" rules={[{ required: true }]}>
                    <FileUploadField
                        accept="audio/mpeg"
                        onChange={handleAudioUpload}
                        fileName={audioFile?.name}
                        placeholder="Upload book audio"
                        inputRef={audioInputRef}
                    />
                </Form.Item>

                {audioUrl && (
                    <PreviewWithRemove onRemove={handleRemoveAudio}>
                        <audio src={audioUrl} controls className="w-full h-[100px] rounded" />
                    </PreviewWithRemove>
                )}

                <FormActions setShowModal={setShowModal} />
            </Form>
        </div>
    );
};

const FormActions = ({ setShowModal }) => (
    <Form.Item className="!mt-3">
        <Button
            className="!bg-[var(--secondary-color)] !mr-2 hover:!bg-[var(--secondary-color)] border-none !text-white"
            onClick={() => setShowModal(false)}
        >
            Close
        </Button>
        <Button
            type="primary"
            htmlType="submit"
            className="!bg-yellow-500 hover:!bg-yellow-600 border-none px-6"
        >
            Publish
        </Button>
    </Form.Item>
);

export default BookDetailsForm;