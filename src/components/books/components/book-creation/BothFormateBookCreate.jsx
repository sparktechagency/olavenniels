import React, { useState } from "react";
import { Tabs } from "antd";
import BookCoverUpload from "./BookCoverUpload";
import BookDetailsForm from "./BookDetailsForm";

const BothFormateBookCreate = ({ setShowModal }) => {
    const [image, setImage] = useState(null);
    const [audioFile, setAudioFile] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);

    return (
        <div className="flex gap-6 w-full">
            <Tabs style={{ width: "100%" }}>
                <Tabs.TabPane tab="Upload Book Cover Image" key="1">
                    <BookCoverUpload
                        setImage={setImage}
                        setShowModal={setShowModal}
                    />
                </Tabs.TabPane>

                <Tabs.TabPane tab="Fill Details" key="2">
                    <BookDetailsForm
                        setShowModal={setShowModal}
                        image={image}
                        audioFile={audioFile}
                        setAudioFile={setAudioFile}
                        pdfFile={pdfFile}
                        setPdfFile={setPdfFile}
                    />
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
};

export default BothFormateBookCreate;