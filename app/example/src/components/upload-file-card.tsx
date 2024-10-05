import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CloseIcon, FileIcon, LoadingIcon } from "./icons";
import { UploadFileStatus, useUploadContext } from "./upload-context";
import { SortableProvider, useSortable } from "use-sortablejs";

export interface UploadFileCardProps {
  // 增加 状态（错误|成功|上传中） ， 文件名称，图标，大小，已上传大小
  status: UploadFileStatus;
  /**
   * 文件名称
   */
  fileName?: string;
  /**
   * 图标
   */
  icon?: any;
  /**
   * 文件大小
   */
  size?: number;
  /**
   * 上传尺寸
   */
  progress?: number;

  onCancel?: () => void;
  onRetry?: () => void;
  onRemove?: () => void;
}

// https://www.alignui.com/components-detail/file-upload
export function UploadFileCard({
  status,
  fileName,
  icon,
  size,
  progress,
  onCancel,
  onRetry,
  onRemove,
}: UploadFileCardProps) {
  return (
    <div className="p-4 border rounded-xl ">
      <div className=" flex gap-4 mb-4">
        {/* icon */}
        <FileIcon className="w-8" />
        {/* info */}
        <div className="text-xs/3 flex flex-1 flex-col justify-center leading-6">
          {/* file title */}
          <div className="text-sm">
            <span>{fileName ?? "Unknown"}</span>
          </div>
          {size && (
            <div className="flex items-center gap-2 ">
              <span>
                {size} / {progress}
              </span>
              <span>·</span>
              <LoadingIcon className="w-3 animate-spin" />
              <span>上传中...</span>
            </div>
          )}
        </div>
        <div>
          <CloseIcon
            onClick={onCancel}
            className="w-5 h-5 cursor-pointer text-gray-500  rounded-full hover:text-red-500"
          />
        </div>
      </div>
      {/* 进度条 */}
      <div className="h-1 bg-gray-200 rounded-md">
        <div
          className="h-full bg-blue-500 rounded-md"
          style={{ width: "50%" }}
        ></div>
      </div>
    </div>
  );
}
function UploadFileListInner() {
  const { uploads, resort, cancelUpload } = useUploadContext();
  const setItems: Dispatch<SetStateAction<string[]>> = (newValue) => {
    if (typeof newValue === "function") {
      resort(newValue(uploads.map((z) => z.id)));
    } else {
      resort(newValue);
    }
  };
  const { getRootProps, getItemProps } = useSortable({
    setItems,
    options: {
      animation: 150,
      onSort() {},
    },
  });

  return (
    <>
      <div className="grid  gap-2" {...getRootProps()}>
        {uploads.map((upload, index) => (
          <div key={upload.id} {...getItemProps(upload.id)}>
            <UploadFileCard
              status={upload.status}
              fileName={upload.name}
              icon={upload.icon}
              size={upload.size}
              onCancel={() => cancelUpload(index)}
              progress={upload.progress}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export function UploadFileList() {
  return (
    <SortableProvider>
      <UploadFileListInner />
    </SortableProvider>
  );
}
