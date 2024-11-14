'use server'

import { createS3Uploader } from '@nextjs-uploader/s3'

export async function getSignedUrl(fileName: string) {
  const provider = createS3Uploader()
  return provider.getSignedUrl(provider.createKey(fileName))
}
