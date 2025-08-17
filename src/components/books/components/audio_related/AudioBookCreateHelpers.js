import { useState, useRef } from "react";

export const useAudioBookForm = () => {
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [fileList, setFileList] = useState([]);
  const audioInputRef = useRef(null);

  const handleImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj;
      setImage(file);

      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setPreview(null);
    }
  };

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type === "audio/mpeg") {
      setAudioFile(file);
      setAudioUrl(URL.createObjectURL(file));
      return { isValid: true };
    } else {
      return {
        isValid: false,
        error: "Please upload a valid audio file (MP3)",
      };
    }
  };

  const resetImageState = () => {
    setImage(null);
    setPreview(null);
    setFileList([]);
  };

  const resetAudioState = () => {
    setAudioFile(null);
    setAudioUrl(null);
    if (audioInputRef.current) {
      audioInputRef.current.value = "";
    }
  };

  return {
    preview,
    image,
    audioFile,
    audioUrl,
    fileList,
    audioInputRef,
    handleImageChange,
    handleAudioUpload,
    resetImageState,
    resetAudioState,
    setPreview,
    setImage,
    setAudioFile,
    setAudioUrl,
    setFileList,
  };
};

export const prepareFormData = (values, audioFile, image) => {
  const formData = new FormData();
  const data = { ...values, audioFile: audioFile, bookCover: image };

  Object.keys(data).forEach((key) => {
    if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key]);
    }
  });

  return formData;
};
