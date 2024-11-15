# 如何在Nextjs一次性搞定`腾讯云`, `阿里云`, `七牛云`等云存储的图片上传功能

## 前言

什么是S3协议？

> S3协议（Simple Storage Service，简单存储服务）是AWS提供的一种对象存储服务，它提供了一个简单、高效、可扩展的云存储服务。S3协议支持HTTP协议，可以直接通过HTTP协议访问，也可以通过各种语言的SDK访问。

### 准备工作

- 安装必要的Node.js和Next.js环境。
- 创建Next.js应用。
- 注册并配置各云存储服务（腾讯云、阿里云、七牛云等）。

### 理解S3协议

- 解释S3协议的基本概念。
- 说明为什么这些云服务商都支持S3协议。

### 服务端签名、客户端上传

- **生成预签名URL**：
  - 说明预签名URL的作用。
  - 展示如何在服务端生成预签名URL。
- **客户端上传**：
  - 客户端使用预签名URL直接向云存储服务上传文件。
  - 提供前端代码示例。
- **实现方案**：

#### 编写action，获得服预签名URL

#### 编写hook，上传组件

## 腾讯云、阿里云、七牛云怎么接入？

### **腾讯云**怎么接入

#### 登录到腾讯云控制台

- 导航至对象存储COS服务。
- 创建一个新的存储桶，选择合适的地域、访问权限等配置。

#### 在腾讯云控制台中，进入“API密钥管理”页面

- 创建或查看已有的SecretId和SecretKey，这是用于身份验证的凭证。

#### 配置S3兼容接口

- 确保你的应用程序或工具配置了正确的Endpoint。对于腾讯云COS，Endpoint通常是`<Region>.cos.<Domain>.com`的形式，例如`ap-guangzhou.cos.tencentcloud.com`。
- 使用上一步获取的SecretId和SecretKey作为访问凭证。

### **阿里云**怎么接入

### **七牛云**怎么接入
