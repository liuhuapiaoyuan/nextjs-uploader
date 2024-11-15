# 🎉 nextjs-uploader

一个基于 **Next.js 15** 和 **React 19** 的上传组件，旨在通过 `serverAction` 简化上传流程。
![Demo](docs/main.png)

## 🌐 Language Switch

- [English Version](./README.EN.md)

## 🚀 特性

- **单文件上传** 🗂️：支持简单的单文件上传。
- **多文件上传** 📁：轻松选择和上传多个文件。
- **自定义上传区域** 🎨：可以自定义文件上传区域的样式和功能。
- **自定义上传列表渲染** 📝：灵活渲染上传文件的列表，满足不同需求。
- **S3 适配能力** ☁️：提供与 AWS S3 的无缝集成，便于文件存储。

## 📦 安装

使用 npm 或 yarn 安装：

```bash
npm install nextjs-uploader
# 或者
yarn add nextjs-uploader
```

## 🌟 使用示例

### 使用

#### 1. 创建`action.js`文件，并导出`getSignedUrl`方法

> 插件默认采用基于环境变量的加载机制，当然你也可以自定义配置，实现基于数据库或者其他配置文件的方式来实例化存储插件

```typescript
'use server'

import { S3UploaderProvider } from '@nextjs-uploader/s3'
/**
 * 定义签名获取ServerAction
 */
export async function getSignedUrl(fileName: string) {
  const provider = createS3Uploader()
  return provider.getSignedUrl(provider.createKey(fileName))
}
```

#### 3. 创建环境变量`.env`文件

```bash
# AWS S3存储桶的名称
S3_BUCKET_NAME=
# 用于访问AWS S3的访问密钥ID
S3_ACCESS_KEY_ID=
# 访问AWS S3的秘密访问密钥
S3_SECRET_ACCESS_KEY=
# S3服务的端点URL
S3_ENDPOINT=
# S3存储桶所在的区域
S3_REGION=
# 与S3配合使用的CDN（内容分发网络）
S3_CDN=
# 存储服务提供商的名称或类型 (awz,kodo(七牛云)，oss(阿里云),cos(腾讯云))
S3_PROVIDER=awz
```

#### 4. 前端封装上传函数

```typescript
import { getSignedUrl } from './action'

const handleUpload = async (file: File) => {
  const { url, formData, link } = await getSignedUrl(file.name)
  // 补充file
  formData.append('file', file)
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  })
  if (response.ok) {
    console.log('upload success', link)
    return link
  } else {
    console.error('upload failed', response.statusText)
    throw new Error(response.statusText)
  }
}
```

#### 5. 在定义一个简单的组件来上传

```typescript
'use client'

export function SimpleUpload() {
  // 定义状态：0：未上传，1：上传中，2：上传成功，3：上传失败
  const [state, setState] = useState(0)
  const [link, setLink] = useState('')

  const handleUpload = async (file: File) => {
    setState(1)
    try {
      const link = await uploadFile(file)
      setState(2)
      setLink(link)
    } catch (error) {
      setState(3)
      console.error(error)
    }
  }
  return (
    <div>
      <Input type='file' onChange={(e) => e.target?.files?.[0] && handleUpload(e.target.files[0]) } />
      <div>
        {state === 0 && '未上传'}
        {state === 1 && '上传中...'}
        {state === 2 && (
          <div>
           上传成功：
            <a target='_blank' href={link}> {link} </a>
          </div>
        )}
        {state === 3 && '上传失败'}
      </div>
    </div>
  )
}

```

## 🤝 贡献

欢迎贡献！请查看 [贡献指南](./CONTRIBUTING.md) 了解更多信息。
