import type { IS3CofnigProvider } from './interface'
import { S3EnvConfigProvider } from './S3EnvConfigProvider'
import { S3UploaderProvider } from './S3UploaderProvider'

export * from './S3EnvConfigProvider'
export * from './interface'
export * from './S3UploaderProvider'

/**
 * Creates an instance of S3UploaderProvider with the given configProvider
 * @param configProvider - an instance of IS3CofnigProvider
 * @default 默认使用的是基于环境变量的加载器
 * @returns
 */
export function createS3Uploader(
  configProvider: IS3CofnigProvider = new S3EnvConfigProvider(),
) {
  const uploader = new S3UploaderProvider(configProvider)

  const createKey = uploader.createKey.bind(uploader)
  const getSignedUrl = uploader.getSignedUrl.bind(uploader)
  const deleteFile = uploader.deleteFile.bind(uploader)
  const uploadFile = uploader.uploadFile.bind(uploader)
  return {
    uploadFile,
    createKey,
    getSignedUrl,
    deleteFile,
  }
}
