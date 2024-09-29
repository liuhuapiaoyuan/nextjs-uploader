# 🎉 nextjs-uploader

A file upload component built with **Next.js 15** and **React 19**, designed to simplify the upload process using `serverAction`.

## 🌐 文档语言

- [中文版本](./README.md)

## 🚀 Features

- **Single File Upload** 🗂️: Supports easy single file uploads.
- **Multiple File Upload** 📁: Effortlessly select and upload multiple files.
- **Custom Upload Area** 🎨: Customize the style and functionality of the file upload area.
- **Custom Upload List Rendering** 📝: Flexibly render the list of uploaded files to meet different needs.
- **S3 Adapter Capability** ☁️: Seamless integration with AWS S3 for easy file storage.

## 📦 Installation

Install via npm or yarn:

```bash
npm install nextjs-uploader
# or
yarn add nextjs-uploader
```

## 🌟 Usage Example

```jsx
import { Uploader } from 'nextjs-uploader';

const MyComponent = () => {
  return (
    <Uploader
      onUploadComplete={(files) => console.log(files)}
      // Other custom properties
    />
  );
};
```

## 📖 Documentation

For detailed documentation, please refer to [docs](./docs).

## 🤝 Contributing

Contributions are welcome! Please check out the [Contributing Guide](./CONTRIBUTING.md) for more information.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.