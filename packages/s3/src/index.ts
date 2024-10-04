import type { SignedUrl, UploaderProvider } from '@nextjs-uploader/share';
import type { IS3CofnigProvider } from './interface';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { DefaultS3ConfigProvider } from './DefaultS3ConfigProvider';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export * from './DefaultS3ConfigProvider';
export * from './interface';


/**
 * S3UploaderProvider
 * 兼容S3协议
 */
export class S3UploaderProvider implements UploaderProvider {

    private configProvider: IS3CofnigProvider;


    constructor(configProvider: IS3CofnigProvider = new DefaultS3ConfigProvider()) {
        this.configProvider = configProvider;
    }
    async deleteFile(fileKey: string) {
        const { config, s3Client } = await this.getConfig();

        await s3Client.send(new DeleteObjectCommand({
            Bucket: config.bucket, // required
            Key: fileKey, // required
        }))

    }


    async getSignedUrl(fileName: string) {
        const { config, s3Client } = await this.getConfig();
        const params = {
            Bucket: config.bucket,
            Key: fileName,
            Expires: 60, // URL有效期，单位为秒
            Conditions: [
            ],
            Fields: {
            },
        };

        try {
            // const signedUrl = await getSignedUrl(s3Client, new PutObjectCommand({
            //     Bucket: config.bucket,
            //     Key: fileName ,
            //     Expires:new Date(Date.now() + 60 * 1000)
            // }));
            //return { url: signedUrl , fields:{} };
            const { url, fields } = await createPresignedPost(s3Client, params);
            return { url, fields };
        } catch (error) {
            console.error(error);
            throw new Error("Fail")
        }
    }


    private async getConfig() {
        const config = await this.configProvider.load();
        const s3Client = await new S3Client({
            region: config.region,
            endpoint: config.endpoint,
            credentials: {
                accessKeyId: config.accessKey,
                secretAccessKey: config.secretKey,
            },
        });
        return { config, s3Client };
    }
}