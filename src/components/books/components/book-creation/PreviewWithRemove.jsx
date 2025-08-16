import React from "react";
import { CloseOutlined } from "@ant-design/icons";

const PreviewWithRemove = ({ children, onRemove }) => (
  <div className="border border-gray-300 rounded mt-2 relative">
    {children}
    <button
      onClick={onRemove}
      className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center cursor-pointer bg-white rounded-full shadow"
    >
      <CloseOutlined className="!text-red-500" />
    </button>
  </div>
);

export default PreviewWithRemove;