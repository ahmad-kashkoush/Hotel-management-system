import { uploadToGCS } from "@/services/apiUpload";
import { getImagePath, getImagePath2 } from "@/utils/helpers";
const url = import.meta.env.VITE_ENDPOINT_URL;


export async function getCabins() {
    // const { data: cabins, error } = await supabase
    //     .from('cabins')
    //     .select('*');
    // if (error) throw error;
    const res = await fetch(`${url}/cabins`);
    const { data: cabins, error } = await res.json();

    if (error) throw error;
    return cabins;

}
export async function updateCabin(id, cabinData, imagePath) {
    const response = await fetch(`${url}/cabins/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...cabinData, image: imagePath }),
    });
    return await response.json();
}

export async function insertCabin({ cabinData, previousImage = "", id = null }) {

    // todo add third part image storer
    const bucketFolderName = "cabins";
    const { imageName, imagePath } = getImagePath2(cabinData.image, bucketFolderName, previousImage);

    // let query = supabase.from('cabins');



    let [data, error] = [undefined, undefined];
    //  create

    if (!id) {
        //     query = query.insert([{ ...cabinData, image: imagePath }]);
        const response = await fetch(`${url}/cabins/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...cabinData, image: imagePath }),
        });
        const obj = await response.json();
        data = obj.data; error = obj.error;

    }
    // update
    if (id) {
        // query = query.update({
        //     ...cabinData,
        //     image: imagePath
        // }).eq('id', id);
        const obj = await updateCabin(id, cabinData, imagePath);
        data = obj.data;
        error = obj.error;


    }


    if (error) {
        const errorMessage = `createCabin: error ${id ? "updating" : "creating"} cabin`
        console.error(error);
        throw new Error(errorMessage);
    }


    if (imagePath !== previousImage) {
        const { imageError, imageUrl } = await uploadToGCS(cabinData.image, imageName, bucketFolderName);
        if (imageError) {
            if (!id)
                await deleteCabin(data.id);
            else {
                await updateCabin(id, cabinData, previousImage);
            }
            throw new Error("createCabin: error uploading Image");
        }
    }
    return data;
}
export async function deleteCabin(cabinId) {
    // const { error } = await supabase
    //     .from('cabins')
    //     .delete()
    //     .eq('id', cabinId);

    const { error } = await fetch(`${url}/cabins/${cabinId}`, {
        method: "DELETE"
    });
    if (error) throw error;
}
