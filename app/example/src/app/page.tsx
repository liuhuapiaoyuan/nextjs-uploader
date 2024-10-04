import { Upload, UploadAvatar, UploadImages } from "@/components/upload";
import { UploadButton } from "@/components/upload-button";
import { createUploaderAction } from "@nextjs-uploader/core";
import { S3UploaderProvider } from "@nextjs-uploader/s3-adapter";
const { uploadFile } = createUploaderAction(new S3UploaderProvider());

export default async function Page() {
  return (
    <div>
      <div className="mt-2">
        <h2>上传组件</h2>
        <div className="p-5">
          <Upload />
        </div>
      </div>
      <div className="mt-2">
        <h2>图片列表</h2>
        <div className="p-5">
          <UploadImages />
        </div>
      </div>
      <div className="mt-2">
        <h2>头像上传</h2>
        <div className="p-5">
          <UploadAvatar />
        </div>
      </div>

      <h1>上传组件案例</h1>
      <UploadButton
        uploadFile={async (file) => {
          "use server";
          const fileKey = "temp/" + file.name;
          await uploadFile(file, fileKey);
          return "https://cdn.kedao.ggss.club/" + fileKey;
        }}
      />
    </div>
  );
}
