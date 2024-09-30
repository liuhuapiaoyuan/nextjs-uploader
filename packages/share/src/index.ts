


export type SignedUrl = {
    url: string
    fields: Record<string, string>
}


/**
 * 导出推理类型
 */
export interface UploaderProvider{
    getSignedUrl: (fileName:string) => Promise<SignedUrl>;
}

 