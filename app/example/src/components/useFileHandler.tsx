"use client";
import { useState, DOMAttributes, InputHTMLAttributes } from "react";
import { useUploadContext } from "./upload-context";

export function useFileHandler() {
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
  };
  const handleDragEnd: DOMAttributes<HTMLDivElement>["onDragEnd"] = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
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
  };
  return { isDragging,handleDragEnd, handleDragOver, handleDrop, handleFileChange };
}
