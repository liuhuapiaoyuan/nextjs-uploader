import type { IS3CofnigProvider, S3Cofnig } from './interface'

/**
 * 基于环境变量的 S3 配置提供者
 */
export class S3EnvConfigProvider implements IS3CofnigProvider {
  async load(): Promise<S3Cofnig> {
    // 从环境变量加载配置
    const bucket = process.env.S3_BUCKET_NAME
    const accessKey = process.env.S3_ACCESS_KEY_ID
    const secretKey = process.env.S3_SECRET_ACCESS_KEY
    const endpoint = process.env.S3_ENDPOINT
    const region = process.env.S3_REGION

    // 检查必要的环境变量是否存在
    if (!bucket || !accessKey || !secretKey) {
      throw new Error(
        '缺少必要的环境变量: S3_BUCKET_NAME, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY',
      )
    }

    // 返回配置对象
    return {
      bucket,
      accessKey,
      secretKey,
      endpoint,
      region,
    } as S3Cofnig
  }

  async save(_config: S3Cofnig): Promise<void> {
    // 这里可以实现将配置保存到环境变量或其他持久化存储的逻辑
    throw new Error('Method not implemented.')
  }
}
