import { HTMLAttributes, ReactNode } from 'react'
import { CloseIcon, FileIcon, LoadingIcon } from './icons'
import { UploadFileStatus, useUploadContext } from './upload-context'
import { SortableList } from './sortable-list'

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
  icon?: ReactNode
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

export function UploadFileCard({
  status,
  fileName,
  icon,
  size,
  progress,
  onCancel,
  onRemove,
}: UploadFileCardProps) {
  const percent = ((progress ?? 0) * 100) / (size ?? 1)
  return (
    <div className='p-4 border rounded-xl '>
      <div className=' flex gap-4'>
        {/* icon */}
        {icon ?? <FileIcon className='w-8' />}
        {/* info */}
        <div className='text-xs/3 flex flex-1 flex-col justify-center leading-6'>
          {/* file title */}
          <div className='text-sm'>
            <span>{fileName ?? 'Unknown'}</span>
          </div>
          {size && status === 'uploading' && (
            <div className='flex items-center gap-2 '>
              <span>
                {progress} / {size}
              </span>
              <span>·</span>
              <LoadingIcon className='w-3 animate-spin' />
              <span>上传中...</span>
            </div>
          )}
          {status === 'error' && <div className='text-red-500'>上传失败</div>}
          {status === 'done' && <div className='text-green-500'>☑️</div>}
        </div>
        <div>
          <CloseIcon
            onClick={status === 'done' ? onRemove : onCancel}
            className='w-5 h-5 cursor-pointer text-gray-500  rounded-full hover:text-red-500'
          />
        </div>
      </div>
      {/* 进度条 */}
      {status === 'uploading' && (
        <div className='h-1 bg-gray-200 rounded-md mt-4'>
          <div
            className='h-full bg-blue-500 rounded-md'
            style={{ width: `${percent.toFixed(2)}%` }}
          ></div>
        </div>
      )}
    </div>
  )
}

export function UploadFileList(
  props: Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>,
) {
  const { uploads, resort, remove, cancelUpload } = useUploadContext()
  return (
    <SortableList
      className='grid grid-cols-1 gap-2'
      onChange={(newList) => resort(newList.map((z) => z.id))}
      renderItem={(upload, index) => {
        return (
          <UploadFileCard
            key={upload.id}
            status={upload.status}
            fileName={upload.name}
            size={upload.size}
            onCancel={() => cancelUpload(index)}
            onRemove={() => remove(index)}
            progress={upload.progress}
          />
        )
      }}
      value={uploads}
      {...props}
    ></SortableList>
  )
}
