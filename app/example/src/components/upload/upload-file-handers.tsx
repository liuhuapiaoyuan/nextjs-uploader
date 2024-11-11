"use client";
import React, { useRef } from "react";
import { UploadImageIcon } from "./icons";
import { useFileHandler } from "./useFileHandler";
export function UploadFileDropArea(props: {
  multiple?: boolean;
  accept?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const {
    isDragging,
    handleDragEnd,
    handleDragOver,
    handleDrop,
    handleFileChange,
  } = useFileHandler(fileRef);
  return (
    <div
      className="border border-dashed flex-col gap-3 data-[dragging=true]:bg-gray-100 bg-white rounded-xl flex items-center justify-center h-[250px] p-4"
      data-dragging={isDragging}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragExit={handleDragEnd}
      onDragLeave={handleDragEnd}
    >
      <p className="text-gray-400">Drag and drop your files here</p>
      <label
        className="cursor-pointer 
        border px-5 rounded-xl hover:bg-gray-50 flex items-center justify-center p-2"
      >
        <input
          multiple={props.multiple}
          accept={props.accept}
          type="file"
          ref={fileRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="text-nowrap">浏览文件</div>
      </label>
    </div>
  );
}
export function UploadImageButton(props: {
  multiple?: boolean;
  accept?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const {
    isDragging,
    handleDragOver,
    handleDragEnd,
    handleDrop,
    handleFileChange,
  } = useFileHandler(fileRef);
  return (
    <div
      className="border hover:bg-gray-50 bg-white data-[dragging=true]:bg-gray-100 group cursor-pointer border-dashed  gap-3 rounded-xl overflow-hidden   h-20 w-20"
      data-dragging={isDragging}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragExit={handleDragEnd}
      onDragLeave={handleDragEnd}
    >
      <label className="w-full cursor-pointer h-full flex items-center justify-center">
        <input ref={fileRef}
          multiple={props.multiple}
          accept={props.accept}
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
        <UploadImageIcon className="text-gray-500" />
      </label>
    </div>
  );
}
