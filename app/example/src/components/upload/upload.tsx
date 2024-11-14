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
      method: 'POST',
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
export function UploadImages(props: UploadProps) {
  const { getSignedParams, ...reset } = props

  return (
    <UploadContainer
      fileUploadService={buildService(getSignedParams)}
      {...reset}
    >
      <UploadImageList className='flex flex-wrap gap-2'>
        <UploadImageButton multiple />
      </UploadImageList>
    </UploadContainer>
  )
}
export function UploadAvatar(
  props: Omit<UploadProps, 'maxCount' | 'multiple'>,
) {
  const { getSignedParams, ...reset } = props

  return (
    <UploadContainer
      fileUploadService={buildService(getSignedParams)}
      multiple={false}
      maxCount={1}
      {...reset}
    >
      <UploadAvatarHandler>
        <UploadAvatarPreview />
      </UploadAvatarHandler>
    </UploadContainer>
  )
}
