'use server'

import { S3UploaderProvider } from '@nextjs-uploader/s3'

const s3Uploader = (function () {
  const provider = new S3UploaderProvider()
  return {
    uploadFile: provider.uploadFile.bind(provider),
  }
})()

export async function getSignedUrl(fileName: string): Promise<{
  url: string
  formData: FormData
  link: string
  method: 'POST'
}> {
  const provider = new S3UploaderProvider()
  const id =
    Date.now() +
    '_' +
    // 随机字符串
    Math.random().toString(36).substr(2, 9)
  const fileKey = `${id}_${fileName}`
  const { url, fields } = await provider.getSignedUrl(fileKey)
  const formData = new FormData()
  Object.keys(fields).forEach((key) => {
    formData.append(key, fields[key])
  })
  return {
    url,
    link: 'https://cdn.kedao.ggss.club/' + fileKey,
    formData,
    method: 'POST',
  }
}

export const { uploadFile } = s3Uploader
