import { UploadButton } from "@/components/upload-button";
import { uploadToS3 } from "@/lib/s3";
import { createUploaderAction } from "@nextjs-uploader/core";
import { S3UploaderProvider } from "@nextjs-uploader/s3-adapter";
const { uploadFile } = createUploaderAction(new S3UploaderProvider());

export default async function Page() {
  return (
    <div>
      <div className="relative">
        <div className="absolute inset-0 z-0 flex justify-center h-[300px] w-[160px]  border-4 border-black rounded-2xl bg-gray-50">
          <span className="border border-black bg-black w-20 h-2 rounded-br-xl rounded-bl-xl"></span>

          <span className="absolute -right-2 top-14  border-4 border-black h-7 rounded-md"></span>
          <span className="absolute -right-2 bottom-36  border-4 border-black h-10 rounded-md"></span>
        </div>
        <div className="z-10 relative p-2">
        <h1>上传组件案例</h1>
        <UploadButton
          uploadFile={async (file) => {
            "use server";
            const fileKey = "temp/" + file.name;
            await uploadFile(file,fileKey);
            return "https://cdn.kedao.ggss.club/" + fileKey;
          }}
        />
      </div>
      </div>

      
    </div>
  );
}
