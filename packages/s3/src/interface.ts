import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
export type PresignedAdapter = typeof createPresignedPost
export type S3Cofnig = {
  /**
   * S3 外网访问地址
   */
  endpoint: string
  /**
   * 密钥管理 的 AK 值
   */
  accessKey: string
  /**
   *  密钥管理 的 SK 值
   */
  secretKey: string
  /**
   * 创建的空间名称，比如 siyun-date
   */
  bucket: string
  /**
   *  CDN 域名，一般我们对云存储会挂在一个自定义CDN域名
   */
  cdn: string
  /**
   * 填写域名中显示的区域名字，即 cn-south-1
   */
  region: string
  /**
   * **服务商**，目前支持以下服务商：
   * - obs: 华为云存储
   * - oss: 阿里云对象存储服务
   * - cos: 腾讯云对象存储
   * - kodo: 七牛云对象存储
   * - awz: 亚马逊云存储
   * - uss: 又拍云对象存储
   */
  provider: 'obs' | 'oss' | 'cos' | 'kodo' | 'awz' | 'uss'
}

export interface IS3CofnigProvider {
  /**
   * 加载配置
   */
  load(): Promise<S3Cofnig>
  /**
   *
   * @param config 保存配置
   */
  save(config: S3Cofnig): Promise<void>
}
