import type { UploaderProvider } from "@nextjs-uploader/share";


export type SignedUrl = {
    url: string
    fields: Record<string, string>
}

export class UploadAction {
    provider: UploaderProvider
    constructor(provider: UploaderProvider) {
        this.provider = provider
    }

    /**
     * 获得上传签名的url
     * @param fileName 
     * @returns 
     */
    getSignedUrl(fileName: string): Promise<SignedUrl> {
        return this.provider.getSignedUrl(fileName)
    }

    /**
     * 上传文件
     * @param file 
     * @param fileName 
     * @returns 
     */
    async uploadFile(file: File , fileName?:string|((file: File) => string|Promise<string>)) {
        const fileKey = typeof fileName === 'function'? await fileName(file) : fileName || file.name
        const { url, fields } = await this.getSignedUrl(fileKey)
        const formData = new FormData();
        Object.keys(fields).forEach(key => {
            formData.append(key, fields[key]);
        });
        formData.append("file", file);
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error(`Error uploading file: ${response.statusText}`);
            }
            await response.text();
            return {key:fileKey}
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error
        }
    }
}