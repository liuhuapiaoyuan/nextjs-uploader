'use client'
import { AvatarChoose } from '@/components/AvatarChoose'
import { UploadImages, UploadAvatar, Upload } from '@/components/upload/upload'
import { UploadButton } from '@/components/upload/upload-button'
import { uploadFile } from '@/lib/upload'
import { getSignedUrl, uploadFile as uploadFileAction } from '../action'
function generateId() {
  return (
    Date.now() +
    '_' +
    // 随机字符串
    Math.random().toString(36).substr(2, 9)
  )
}
export default function Page() {
  const fileUploadService = async (
    file: File,
    onSuccess: (url: string) => void,
    onProgress: (progress: { loaded: number; total: number }) => void,
  ): Promise<() => void> => {
    const fileKey = `${generateId()}_${file.name}`
    const { url, fields } = await getSignedUrl(fileKey)
    const formData = new FormData()
    Object.keys(fields).forEach((key) => {
      formData.append(key, fields[key])
    })
    return uploadFile({
      file,
      onProgress,
      s3Url: url,
      formData,
      method: 'POST',
      onSuccess() {
        onSuccess('https://cdn.kedao.ggss.club/' + fileKey)
      },
    })
  }
  return (
    <div className='p-2'>
      <div className='mt-2'>
        <h2>上传组件</h2>
        <div className='p-5'>
          <Upload fileUploadService={fileUploadService} />
        </div>
      </div>
      <div className='mt-2'>
        <h2>图片列表</h2>
        <div className='p-5'>
          <UploadImages fileUploadService={fileUploadService} />
        </div>
      </div>
      <div className='mt-2'>
        <h2>头像上传</h2>
        <div className='p-5'>
          <UploadAvatar />
        </div>
      </div>
      <div className='mt-2'>
        <h2>头像上传2</h2>
        <div className='p-5'>
          <AvatarChoose />
        </div>
      </div>
      <h1>上传组件案例</h1>
      <UploadButton
        uploadFile={async (file) => {
          const fileKey = 'temp/' + file.name
          await uploadFileAction(file, fileKey)
          return 'https://cdn.kedao.ggss.club/' + fileKey
        }}
      />
    </div>
  )
}
