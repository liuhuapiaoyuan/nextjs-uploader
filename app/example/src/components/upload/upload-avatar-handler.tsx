import { HTMLAttributes } from 'react'
import { CloseIcon, LoadingIcon, UploadImageIcon } from './icons'
import { UploadFileStatus, useUploadContext } from './upload-context'
import { useFileHandler } from './useFileHandler'
import { cn } from '@/lib/utils'

export interface UploadFileCardProps {
  // 增加 状态（错误|成功|上传中） ， 文件名称，图标，大小，已上传大小
  status: UploadFileStatus
  /**
   * 文件名称
   */
  fileName?: string
  /**
   * 图标
   */
  icon?: string
  /**
   * 文件大小
   */
  size?: number
  /**
   * 上传尺寸
   */
  progress?: number

  onCancel?: () => void
  onRetry?: () => void
  onRemove?: () => void
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
  const percent = ((progress ?? 0) * 100) / (size ?? 1)
  return (
    <div className='grid gap-2 w-20'>
      <div className='border rounded-xl w-20 h-20 relative'>
        <div
          className='w-full h-full bg-contain rounded-xl'
          style={
            icon
              ? {
                  backgroundImage: `url(${icon})`,
                }
              : {}
          }
        ></div>
        <div className='absolute z-20 right-0 top-0 p-2'>
          {/* 已经上传，显示删除 */}
          {status === 'done' && (
            <CloseIcon
              onClick={onRemove}
              className='w-5 h-5 cursor-pointer text-red-700  rounded-full hover:text-red-500'
            />
          )}
          {/* 上传失败，显示重试 */}
          {status === 'error' && (
            <CloseIcon
              onClick={onRetry}
              className='w-5 h-5 cursor-pointer text-red-700  rounded-full hover:text-red-500'
            />
          )}
          {/* 上传中，显示上传进度 */}
          {status === 'uploading' && (
            <CloseIcon
              onClick={onCancel}
              className='w-5 h-5 cursor-pointer text-red-700  rounded-full hover:text-red-500'
            />
          )}
        </div>
        {/* 背景图 */}
        {status === 'uploading' && percent > 0 && (
          <div className='absolute inset-0 z-10  flex items-center justify-center rounded-xl bg-gray-500 bg-opacity-50'>
            <LoadingIcon
              className='size-3 animate-spin text-white'
              stroke='white'
            />
            <span className='text-white text-sm'>{percent.toFixed(1)}%</span>
          </div>
        )}
      </div>
      {/* file title */}
      <div className=' text-sm break-words overflow-hidden'>
        <span>{fileName ?? 'Unknown'}</span>
      </div>
    </div>
  )
}

export function UploadAvatarPreview() {
  const { uploads } = useUploadContext()
  const file = uploads?.[0]
  return (
    <div
      style={
        file?.url
          ? {
              backgroundImage: `url(${file?.url})`,
            }
          : {}
      }
      className='w-full h-full bg-contain rounded-xl absolute z-10'
    ></div>
  )
}

export function UploadAvatarHandler(
  props: Omit<HTMLAttributes<HTMLDivElement>, 'onDragOver' | 'onDrop'>,
) {
  const { uploads, accept = 'images/*' } = useUploadContext()
  const file = uploads?.[0]
  const { className, children, ...rest } = props
  const {
    fileRef,
    isDragging,
    handleDragOver,
    handleDragEnd,
    handleDrop,
    handleFileChange,
  } = useFileHandler()
  return (
    <div
      className={cn(
        'border hover:bg-gray-50 relative bg-white data-[dragging=true]:bg-gray-100 group cursor-pointer border-dashed  gap-3 rounded-xl overflow-hidden   h-20 w-20',
        className,
      )}
      data-dragging={isDragging}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragExit={handleDragEnd}
      onDragLeave={handleDragEnd}
      {...rest}
    >
      {children}
      <label className='w-full relative cursor-pointer block z-20 h-full  bg-contain'>
        <input
          ref={fileRef}
          accept={accept}
          type='file'
          onChange={handleFileChange}
          className='hidden'
        />
        <div
          className={` rounded-xl flex items-center justify-center absolute inset-0 ${
            file
              ? 'hidden bg-black bg-opacity-25 group-hover:flex group-data-[dragging=true]:flex'
              : ''
          }`}
        >
          <UploadImageIcon className={file ? 'text-white' : 'text-gray-500'} />
        </div>
      </label>
    </div>
  )
}
