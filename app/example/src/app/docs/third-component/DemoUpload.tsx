'use client'
import { getSignedUrl } from '@/app/action'
import { FileUpload } from '@/components/ui/file-upload'
import {
  UploadContainer,
  useUploadContext,
} from '@/components/upload/upload-context'
import { uploadFile } from '@/lib/upload'

function FileUploadInner() {
  const { uploads, upload } = useUploadContext()

  return (
    <FileUpload
      value={uploads}
      onChange={(files) => {
        files.map(upload)
      }}
    />
  )
}
export function DemoUpload() {
  async function fileUploadService(
    file: File,
    onSuccess: (url: string) => void,
    onProgress: (progress: { loaded: number; total: number }) => void,
  ) {
    const { link, ...params } = await getSignedUrl(file.name)
    return uploadFile({
      file,
      onProgress,
      method: 'POST',
      ...params,
      onSuccess() {
        onSuccess(link)
      },
    })
  }
  return (
    <UploadContainer fileUploadService={fileUploadService}>
      <FileUploadInner />
    </UploadContainer>
  )
}
