import type { UploaderProvider } from "@nextjs-uploader/share";
import { UploadAction } from "./upload";

export * from "@nextjs-uploader/share";
/**
 *  Create an instance of UploadAction
 * @param provider 
 * @returns 
 */
export function createUploaderAction(provider:UploaderProvider){
    const action =  new UploadAction(provider);
    return {
        getSignedUrl: action.getSignedUrl.bind(action),
        uploadFile: action.uploadFile.bind(action),
    }
}