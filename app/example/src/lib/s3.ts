export const uploadToS3 = async (file: File, uploadUrl: string, fields: Record<string, string>) => {
    const formData = new FormData();
    Object.keys(fields).forEach(key => {
        formData.append(key, fields[key]);
    });
    formData.append("file", file);
    try {
        const response = await fetch(uploadUrl, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            const text = await response.text();
            console.error(`Error uploading file: ${response.status} ${text}`);
            throw new Error(`Error uploading file: ${response.statusText}`);
        }

        const responseData = await response.text();
        console.log('File uploaded successfully:', responseData);
        return 
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};
