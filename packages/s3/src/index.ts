import type { IS3CofnigProvider } from './interface'
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { S3EnvConfigProvider } from './S3EnvConfigProvider'

export * from './S3EnvConfigProvider'
export * from './interface'

/**
 * S3UploaderProvider
 * 兼容S3协议
 */
export class S3UploaderProvider {
  private configProvider: IS3CofnigProvider

  constructor(configProvider: IS3CofnigProvider = new S3EnvConfigProvider()) {
    this.configProvider = configProvider
  }
  async deleteFile(fileKey: string) {
    const { config, s3Client } = await this.getConfig()

    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: config.bucket, // required
        Key: fileKey, // required
      }),
    )
  }

  async getSignedUrl(fileName: string) {
    const { config, s3Client } = await this.getConfig()
    const params = {
      Bucket: config.bucket,
      Key: fileName,
      Expires: 60, // URL有效期，单位为秒
      Conditions: [],
      Fields: {},
    }

    try {
      const { url, fields } = await createPresignedPost(s3Client, params)
      return { url, fields }
    } catch (error) {
      console.error(error)
      throw new Error('Fail')
    }
  }

  /**
   * 上传文件
   * @param file
   * @param fileName
   * @returns
   */
  async uploadFile(
    file: File,
    fileName?: string | ((file: File) => string | Promise<string>),
  ) {
    const fileKey =
      typeof fileName === 'function'
        ? await fileName(file)
        : fileName || file.name
    const { url, fields } = await this.getSignedUrl(fileKey)
    const formData = new FormData()
    Object.keys(fields).forEach((key) => {
      formData.append(key, fields[key])
    })
    formData.append('file', file)
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      })
      if (!response.ok) {
        throw new Error(`Error uploading file: ${response.statusText}`)
      }
      await response.text()
      return { key: fileKey }
    } catch (error) {
      console.error('Error uploading file:', error)
      throw error
    }
  }

  private async getConfig() {
    const config = await this.configProvider.load()
    const s3Client = await new S3Client({
      region: config.region,
      endpoint: config.endpoint,
      credentials: {
        accessKeyId: config.accessKey,
        secretAccessKey: config.secretKey,
      },
    })
    return { config, s3Client }
  }
}
