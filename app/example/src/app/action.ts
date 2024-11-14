'use server'

import { S3UploaderProvider } from '@nextjs-uploader/s3'

export async function getSignedUrl(fileName: string): Promise<{
  url: string
  formData: FormData
  link: string
}> {
  const provider = new S3UploaderProvider()
  return provider.getSignedUrl(provider.createKey(fileName))
}
