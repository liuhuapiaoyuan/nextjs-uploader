'use server'

import { createUploaderAction } from "@nextjs-uploader/core";
import { S3UploaderProvider } from "@nextjs-uploader/s3-adapter";

const { getSignedUrl,uploadFile } = createUploaderAction(new S3UploaderProvider());


export { getSignedUrl,uploadFile}