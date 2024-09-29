# 🎉 nextjs-uploader

一个基于 **Next.js 15** 和 **React 19** 的上传组件，旨在通过 `serverAction` 简化上传流程。

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

```jsx
import { Uploader } from 'nextjs-uploader';

const MyComponent = () => {
  return (
    <Uploader
      onUploadComplete={(files) => console.log(files)}
      // 其他自定义属性
    />
  );
};
```

## 📖 文档

详细文档请参见 [docs](./docs)。

## 🤝 贡献

欢迎贡献！请查看 [贡献指南](./CONTRIBUTING.md) 了解更多信息。
