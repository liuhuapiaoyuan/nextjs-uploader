import { uploadFile } from '@/lib/upload'

function generateId() {
  return (
    Date.now() +
    '_' +
    // 随机字符串
    Math.random().toString(36).substr(2, 9)
  )
}

export function buildFileUploadService(
  getSignedUrl: (
    fileKey: string,
  ) => Promise<{ url: string; fields: Record<string, string> }>,
) {
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
      url: url,
      formData,
      method: 'POST',
      onSuccess() {
        onSuccess('https://cdn.kedao.ggss.club/' + fileKey)
      },
    })
  }
  return fileUploadService
}
