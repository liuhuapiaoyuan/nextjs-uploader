import type { IS3CofnigProvider } from './interface'
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { S3EnvConfigProvider } from './S3EnvConfigProvider'
import { PresignedAdapterProviders } from './adapter'

function padZero(num: number, length: number = 2): string {
  return num.toString().padStart(length, '0')
}
/**
 * S3上传器
 * 默认使用的是基于环境变量的加载器
 * @class S3UploaderProvider
 * @implements {IS3CofnigProvider}
 * @export
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

  /**
   * 根据文件名称随机创建一个key
   * @param fileName
   * @param pattern 命名风格,支持参数：{year}, {month}, {day}, {hour}, {minute}, {second}, {random}, {filename}
   * - 默认: '{year}-{month}-{day}-{hour}-{minute}-{second}-{random}-{filename}'
   * @returns
   */
  public createKey(
    fileName: string,
    pattern: string = '{year}-{month}-{day}-{hour}-{minute}-{second}-{random}-{filename}',
  ) {
    const date = new Date()
    const random = padZero(Math.floor(Math.random() * 1000000), 6)
    const patternMap = {
      year: date.getFullYear() + '',
      month: padZero(date.getMonth() + 1),
      day: padZero(date.getDate()),
      hour: padZero(date.getHours()),
      minute: padZero(date.getMinutes()),
      second: padZero(date.getSeconds()),
      random,
      filename: fileName,
    }

    return pattern.replace(/{(\w+)}/g, (match, key) => {
      return patternMap[key as 'year'] || match
    })
  }
  /**
   * 获得签名包
   * @param fileKey 建议使用 @createKey 生成的key
   * @returns
   */
  async getSignedUrl(fileKey: string) {
    const { config, s3Client } = await this.getConfig()
    const params = {
      Bucket: config.bucket,
      Key: fileKey,
      Expires: 60, // URL有效期，单位为秒
      Conditions: [],
      Fields: {},
    }

    try {
      const { url, fields } = await PresignedAdapterProviders[config.provider](
        s3Client,
        params,
      )
      const formData = new FormData()
      Object.keys(fields).forEach((key) => {
        formData.append(key, fields[key])
      })

      return { url, fields, formData, link: config.cdn + '/' + fileKey }
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
    const { url, formData } = await this.getSignedUrl(fileKey)
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
    // 判断 provider 是否存在
    if (!PresignedAdapterProviders[config.provider]) {
      throw new Error(
        `Provider ${config.provider} not support, please check your config`,
      )
    }

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
