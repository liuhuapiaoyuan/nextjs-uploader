export interface UploadFileOptions {
  file: File;
  s3Url: string;
  method?: "POST" | "PUT"
  formData?: FormData
  onProgress: (progress: { loaded: number, total: number }) => void;
  onSuccess?: () => void;
}

export function uploadFile(options: UploadFileOptions): Promise<() => void> {
  return new Promise((resolve, reject) => {
    const { onSuccess, file, s3Url, formData, onProgress, method = 'PUT' } = options; // 解构获取参数
    const xhr = new XMLHttpRequest();
    xhr.open(method, s3Url);

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 204) {
          console.log('upload success');
          onSuccess?.()
        } else {
          console.error('upload failed');
          reject(new Error('Upload failed')); // 上传失败，调用 reject
        }
      }
    };

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progressPayload = {
          loaded: event.loaded,
          total: event.total
        };
        onProgress(progressPayload); // 调用 onProgress 时传递对象
      }
    };

    if (formData) {
      formData.append('file', file);
      xhr.send(formData);
    } else {
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.send(file);
    }
    resolve(() => xhr.abort())
  });
}