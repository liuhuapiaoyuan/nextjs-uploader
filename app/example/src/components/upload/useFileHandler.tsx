"use client";
import { useState, DOMAttributes, InputHTMLAttributes, useRef, RefObject } from "react";
import { useUploadContext } from "./upload-context";

// 定义返回类型的接口
interface FileHandlerReturnType {
  /**
   * 文件输入框的ref对象
   * 用于触发文件选择事件
   * 例如：
   * <input type="file" ref={fileRef} />
   */
  fileRef: RefObject<HTMLInputElement>;
  /**
   * 是否正在拖放文件
   */
  isDragging: boolean;
  /**
   * 文件拖放结束事件
   */
  handleDragOver: DOMAttributes<HTMLDivElement>["onDragOver"];
  /**
   * 文件拖放结束事件
   */
  handleDrop: DOMAttributes<HTMLDivElement>["onDrop"];
  /**
   * 文件拖放结束事件
   */
  handleDragEnd: DOMAttributes<HTMLDivElement>["onDragEnd"];
  /**
   * 文件选择事件
   */
  handleFileChange: InputHTMLAttributes<HTMLInputElement>["onChange"];
}

/**
 * React Hook，用于处理文件上传功能。
 * 它提供了拖放和点击选择文件的能力，并将文件通过上下文传递给上传函数。
*/
export function useFileHandler( ) :FileHandlerReturnType{
  const fileRef = useRef<HTMLInputElement>(null);
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
    fileRef,
    isDragging,
    handleDragEnd,
    handleDragOver,
    handleDrop,
    handleFileChange,
  };
}
