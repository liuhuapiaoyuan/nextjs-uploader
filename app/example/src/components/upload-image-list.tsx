import { CloseIcon, FileIcon, LoadingIcon, UploadIcon } from "./icons";
import { UploadFileStatus, useUploadContext } from "./upload-context";
import { UploadImageButton } from "./upload-file-handers";

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
  const percent = ((progress ?? 0) * 100) / (size ?? 1);
  return (
    <div className="grid gap-2 w-20">
      <div className="border rounded-xl w-20 h-20 relative">
        <div
          className="w-full h-full bg-contain rounded-xl"
          style={
            icon && {
              backgroundImage: `url(${icon})`,
            }
          }
        ></div>
        <div className="absolute z-20 right-0 top-0 p-2">
          {/* 已经上传，显示删除 */}
          {status === "done" && (
            <CloseIcon
              onClick={onRemove}
              className="w-5 h-5 cursor-pointer text-red-700  rounded-full hover:text-red-500"
            />
          )}
          {/* 上传失败，显示重试 */}
          {status === "error" && (
            <CloseIcon
              onClick={onRetry}
              className="w-5 h-5 cursor-pointer text-red-700  rounded-full hover:text-red-500"
            />
          )}
          {/* 上传中，显示上传进度 */}
          {status === "uploading" && (
            <CloseIcon
              onClick={onCancel}
              className="w-5 h-5 cursor-pointer text-red-700  rounded-full hover:text-red-500"
            />
          )}
        </div>
        {/* 背景图 */}
        {status === "uploading" && percent > 0 && (
          <div className="absolute inset-0 z-10  flex items-center justify-center rounded-xl bg-gray-500 bg-opacity-50">
            <LoadingIcon
              className="size-3 animate-spin text-white"
              stroke="white"
            />
            <span className="text-white text-sm">{percent.toFixed(1)}%</span>
          </div>
        )}
      </div>
      {/* file title */}
      <div className=" text-sm break-words overflow-hidden">
        <span>{fileName ?? "Unknown"}</span>
      </div>
    </div>
  );
}

export function UploadImageList() {
  const { uploads, cancelUpload, remove } = useUploadContext();
  return  uploads.map((upload, index) => (
    <UploadFileCard
      key={index}
      status={upload.status}
      fileName={upload.name}
      icon={upload.url}
      size={upload.size}
      onCancel={() => cancelUpload(index)}
      onRemove={() => remove(index)}
      progress={upload.progress}
    />
  ))
   
  
}
