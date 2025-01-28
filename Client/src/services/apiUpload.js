
const url = import.meta.env.VITE_ENDPOINT_URL;

export async function uploadToGCS(file, curName, bucketFolderName = "avatars") {
    const formData = new FormData();
    formData.append('fileName', curName);
    formData.append('file', file);
    formData.append('bucketFolderName', bucketFolderName)
    const response = await fetch(`${url}/upload`, {
        method: 'POST',
        body: formData,
        headers: {
            'authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            //     'Content-Type': 'multipart/form-data'
        }
    });
    const { error, imageUrl } = await response.json();
    if (error) {
        return { imageError: error };
    }
    return { imageUrl };
}