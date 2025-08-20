import { useState, useRef } from "react";

export const useAudioBookForm = () => {
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const pdfInputRef = useRef(null);
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

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type === "application/pdf") {
      setPdfFile(file);
      return { isValid: true };
    } else {
      return {
        isValid: false,
        error: "Please upload a valid PDF file",
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

  const resetAllState = () => {
    resetImageState();
    resetAudioState();
  };

  return {
    preview,
    image,
    audioFile,
    audioUrl,
    fileList,
    audioInputRef,
    pdfFile,
    pdfInputRef,
    handleImageChange,
    handleAudioUpload,
    handlePdfUpload,
    resetImageState,
    resetAudioState,
    resetAllState,
    setPreview,
    setImage,
    setAudioFile,
    setAudioUrl,
    setFileList,
    setPdfFile,
  };
};

export const prepareFormData = (
  values,
  audioFile,
  image,
  pdfFile,
  existingAudioUrl = null,
  existingImageUrl = null,
  existingPdfUrl = null
) => {
  const formData = new FormData();
  const data = { ...values };

  // Handle audio file
  if (audioFile instanceof File) {
    // New audio file uploaded
    formData.append("audioFile", audioFile);
  } else if (existingAudioUrl && typeof existingAudioUrl === "string") {
    // Keep existing audio URL
    formData.append("audioUrl", existingAudioUrl);
  }

  // Handle image file
  if (image instanceof File) {
    // New image uploaded
    formData.append("bookCover", image);
  } else if (existingImageUrl && typeof existingImageUrl === "string") {
    // Keep existing image URL
    formData.append("existingImageUrl", existingImageUrl);
  }

  // Handle pdf file
  if (pdfFile instanceof File) {
    // New pdf file uploaded
    formData.append("pdfFile", pdfFile);
  } else if (existingPdfUrl && typeof existingPdfUrl === "string") {
    // Keep existing pdf URL
    formData.append("existingPdfUrl", existingPdfUrl);
  }

  // Append other form data
  Object.keys(data).forEach((key) => {
    if (
      data[key] !== undefined &&
      data[key] !== null &&
      key !== "audioFile" &&
      key !== "bookCover" &&
      key !== "pdfFile"
    ) {
      // Convert non-file fields to string if they're not already
      const value =
        typeof data[key] === "object" ? JSON.stringify(data[key]) : data[key];
      formData.append(key, value);
    }
  });

  return formData;
};
