"use client";
import { UploadAvatarHandler } from "./upload-avatar-handler";
import { UploadContainer, UploadContext } from "./upload-context";
import { UploadFileList } from "./upload-file-card";
import { UploadFileDropArea, UploadImageButton } from "./upload-file-handers";
import { UploadImageList } from "./upload-image-list";

export function Upload() {
  return (
    <UploadContainer>
      <UploadFileDropArea accept="image/*" multiple />
      <div className="w-full pt-2">
        <UploadFileList />
      </div>
    </UploadContainer>
  );
}
export function UploadImages() {
  return (
    <UploadContainer>
      <div className="flex flex-wrap gap-2">
        <UploadImageList />
        <UploadImageButton />
      </div>
    </UploadContainer>
  );
}
export function UploadAvatar() {
  return (
    <UploadContainer multiple={false} maxCount={1}>
      <UploadAvatarHandler/>
    </UploadContainer>
  );
}
