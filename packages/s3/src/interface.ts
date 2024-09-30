
export type S3Cofnig = {
    /**
     * S3 外网访问地址
     */
    endpoint: string;
    /**
     * 七牛云 - 密钥管理 的 AK 值
     */
    accessKey: string;
    /**
     * 七牛云 - 密钥管理 的 SK 值
     */
    secretKey: string; 
    /**
     * 在七牛云创建的空间名称，比如我的就是 siyun-date
     */
    bucket: string;
    /**
     * 填写域名中显示的区域名字，即 cn-south-1
     */
    region: string; 
}

export interface IS3CofnigProvider{
    load(): Promise<S3Cofnig>;
    save(config: S3Cofnig): Promise<void>;
}


