"use client";
import { UploadAvatarHandler, UploadAvatarPreview } from "./upload-avatar-handler";
import { UploadContainer, UploadContainerType, UploadContext } from "./upload-context";
import { UploadFileList } from "./upload-file-card";
import { UploadFileDropArea, UploadImageButton } from "./upload-file-handers";
import { UploadImageList } from "./upload-image-list";

export function Upload(props:UploadContainerType) {
  return (
    <UploadContainer {...props}>
      <UploadFileDropArea accept="image/*" multiple />
      <div className="w-full pt-2">
        <UploadFileList />
      </div>
    </UploadContainer>
  );
}
export function UploadImages(props:UploadContainerType) {
  return (
    <UploadContainer {...props}>
      <UploadImageList  className="flex flex-wrap gap-2">
        <UploadImageButton multiple />
      </UploadImageList>
    </UploadContainer>
  );
}
export function UploadAvatar(props:UploadContainerType) {
  return (
    <UploadContainer multiple={false} maxCount={1}  {...props}>
      <UploadAvatarHandler>
        <UploadAvatarPreview/>
      </UploadAvatarHandler>
    </UploadContainer>
  );
}
