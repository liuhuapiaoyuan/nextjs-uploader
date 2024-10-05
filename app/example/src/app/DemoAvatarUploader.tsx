'use client'
import { UploadAvatarHandler, UploadAvatarPreview } from "@/components/upload-avatar-handler";
import { UploadContainer, useUploadContext } from "@/components/upload-context";

function UploadAvatar() {
  const { uploads } = useUploadContext();
  const file = uploads?.[0];
  return (
    <div className="">
      <div className="w-64 rounded-lg border-2 border-indigo-500 bg-transparent p-4 text-center shadow-lg dark:bg-gray-800">
        <figure className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500 dark:bg-indigo-600">
          
         <UploadAvatarHandler className="h-16 w-16 !rounded-full">
          <UploadAvatarPreview />
         </UploadAvatarHandler>
        </figure>
        <h2 className="mt-4 text-xl font-bold text-indigo-600 dark:text-indigo-400">
          John Doe
        </h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">鼠标指向头像更换</p>
        <div className="flex items-center justify-center">
          <a
            href="#"
            className="rounded-full bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 dark:bg-indigo-400 dark:hover:bg-indigo-500"
          >
            Contact
          </a>
          <a
            href="#"
            className="ml-4 rounded-full bg-gray-300 px-4 py-2 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}

export function DemoAvatarUploader() {
  return (
    <UploadContainer multiple={false} maxCount={1}>
        <UploadAvatar /> 
    </UploadContainer>
  );
}
