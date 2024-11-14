'use client'
import { uploadFile } from '@/lib/upload'
import {
  UploadAvatarHandler,
  UploadAvatarPreview,
} from './upload-avatar-handler'
import { UploadContainer, UploadContainerType } from './upload-context'
import { UploadFileList } from './upload-file-card'
import { UploadFileDropArea, UploadImageButton } from './upload-file-handers'
import { UploadImageList } from './upload-image-list'

export type UploadProps = Omit<UploadContainerType, 'fileUploadService'> & {
  getSignedParams: (fileName: string) => Promise<{
    link: string
    url: string
    method: 'POST' | 'PUT'
    formData: FormData
  }>
}
function buildService(getSignedParams: UploadProps['getSignedParams']) {
  return async function fileUploadService(
    file: File,
    onSuccess: (url: string) => void,
    onProgress: (progress: { loaded: number; total: number }) => void,
  ) {
    const { link, ...params } = await getSignedParams(file.name)
    return uploadFile({
      file,
      onProgress,
      ...params,
      onSuccess() {
        onSuccess(link)
      },
    })
  }
}
export function Upload(props: UploadProps) {
  const { getSignedParams, ...reset } = props

  return (
    <UploadContainer
      fileUploadService={buildService(getSignedParams)}
      {...reset}
    >
      <UploadFileDropArea accept='image/*' multiple />
      <div className='w-full pt-2'>
        <UploadFileList />
      </div>
    </UploadContainer>
  )
}
export function UploadImages(props: UploadContainerType) {
  return (
    <UploadContainer {...props}>
      <UploadImageList className='flex flex-wrap gap-2'>
        <UploadImageButton multiple />
      </UploadImageList>
    </UploadContainer>
  )
}
export function UploadAvatar(props: UploadContainerType) {
  return (
    <UploadContainer multiple={false} maxCount={1} {...props}>
      <UploadAvatarHandler>
        <UploadAvatarPreview />
      </UploadAvatarHandler>
    </UploadContainer>
  )
}
