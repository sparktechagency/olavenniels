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

export const prepareFormData = (values, audioFile, image, existingAudioUrl = null, existingImageUrl = null) => {
  const formData = new FormData();
  const data = { ...values };
  
  // Handle audio file
  if (audioFile instanceof File) {
    // New audio file uploaded
    formData.append('audioFile', audioFile);
  } else if (existingAudioUrl && typeof existingAudioUrl === 'string') {
    // Keep existing audio URL
    formData.append('audioUrl', existingAudioUrl);
  }
  
  // Handle image file
  if (image instanceof File) {
    // New image uploaded
    formData.append('bookCover', image);
  } else if (existingImageUrl && typeof existingImageUrl === 'string') {
    // Keep existing image URL
    formData.append('existingImageUrl', existingImageUrl);
  }

  // Append other form data
  Object.keys(data).forEach((key) => {
    if (data[key] !== undefined && data[key] !== null && key !== 'audioFile' && key !== 'bookCover') {
      // Convert non-file fields to string if they're not already
      const value = typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key];
      formData.append(key, value);
    }
  });

  return formData;
};
