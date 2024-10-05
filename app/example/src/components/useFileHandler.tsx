"use client";
import { useState, DOMAttributes, InputHTMLAttributes } from "react";
import { useUploadContext } from "./upload-context";

export function useFileHandler(fileRef: React.RefObject<HTMLInputElement>) {
  const { upload } = useUploadContext();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver: DOMAttributes<HTMLDivElement>["onDragOver"] = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop: DOMAttributes<HTMLDivElement>["onDrop"] = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    droppedFiles.forEach((file) => {
      upload(file);
    });
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };
  const handleDragEnd: DOMAttributes<HTMLDivElement>["onDragEnd"] = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const handleFileChange: InputHTMLAttributes<HTMLInputElement>["onChange"] = (
    e
  ) => {
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        upload(file);
      }
    }
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };
  return {
    isDragging,
    handleDragEnd,
    handleDragOver,
    handleDrop,
    handleFileChange,
  };
}
