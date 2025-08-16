import React from "react";

const FileUploadField = ({
    accept,
    onChange,
    fileName,
    placeholder,
    inputRef,
}) => (
    <div className="relative">
        <input
            type="file"
            accept={accept}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            onChange={onChange}
            ref={inputRef}
        />
        <div className="flex items-center justify-between border px-4 py-2 rounded bg-white">
            <span className="text-gray-600">{fileName || placeholder}</span>
            <span className="text-blue-600 text-sm">Browse</span>
        </div>
    </div>
);

export default FileUploadField;