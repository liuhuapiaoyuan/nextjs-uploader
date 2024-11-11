'use server'

import { S3UploaderProvider } from '@nextjs-uploader/s3'

const s3Uploader = (function () {
  const provider = new S3UploaderProvider()
  return {
    getSignedUrl: provider.getSignedUrl.bind(provider),
    uploadFile: provider.uploadFile.bind(provider),
  }
})()

export const { getSignedUrl, uploadFile } = s3Uploader
