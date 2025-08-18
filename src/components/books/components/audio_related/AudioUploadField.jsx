import React from 'react'
import { Form } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

function AudioUploadField({
    audioInputRef,
    handleAudioUpload,
    audioFile,
    audioUrl,
    resetAudioState,
    form,
}) {
    return (
        <Form.Item
            label="Add Audio File"
            name="audio"
            validateStatus={form.getFieldError("audio") ? "error" : ""}
            help={form.getFieldError("audio")}
            required
        >
            <div className="relative">
                <input
                    type="file"
                    accept="audio/mpeg"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={(e) => {
                        const result = handleAudioUpload(e);
                        if (!result.isValid) {
                            form.setFields([{ name: "audio", errors: [result.error] }]);
                        } else {
                            form.setFields([{ name: "audio", errors: [] }]);
                        }
                    }}
                    ref={audioInputRef}
                />
                <div className="flex items-center justify-between border border-gray-300 px-4 py-2 rounded-md bg-white">
                    <span className="text-gray-600 truncate max-w-[80%]">
                        {audioFile?.name || "Upload book audio (MP3)"}
                    </span>
                    <span className="text-blue-600 text-sm">Browse</span>
                </div>
            </div>

            {audioUrl && (
                <div className="border border-gray-300 p-2 rounded mt-2 relative">
                    <audio
                        src={audioUrl}
                        controls
                        className="w-full h-[100px] rounded"
                    />
                    <button
                        onClick={resetAudioState}
                        className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center cursor-pointer bg-white rounded-full shadow"
                        aria-label="Remove audio"
                    >
                        <CloseOutlined className="!text-red-500" />
                    </button>
                </div>
            )}
        </Form.Item>
    )
}

export default AudioUploadField