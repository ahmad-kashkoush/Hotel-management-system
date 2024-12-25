import supabase from "@/services/supabase";
import { getImagePath } from "@/utils/helpers";

export async function getCabins() {

    const { data: cabins, error } = await supabase
        .from('cabins')
        .select('*');
    if (error) throw error;
    return cabins;

}

export async function insertCabin({ cabinData, previousImage = "", id = null }) {

    const { hasImagePath, imageName, imagePath } = getImagePath(cabinData.image || previousImage, "cabin-images")
    let query = supabase.from('cabins');
    //  create
    if (!id)
        query = query.insert([{ ...cabinData, image: imagePath }]);
    // update
    if (id)
        query = query.update({
            ...cabinData,
            image: imagePath
        }).eq('id', id);
    // console.log(query);
    const { data, error } = await query.select().single();


    if (error) {
        const errorMessage = `createCabin: error ${id ? "updating" : "creating"} cabin`
        console.error(error);
        throw new Error(errorMessage);
    }
    if (!hasImagePath) {
        const { error: imageError } = await supabase
            .storage
            .from('cabin-images')
            .upload(imageName, cabinData.image);
        if (imageError) {
            if (!id)
                await deleteCabin(data.id);
            else {
                await supabase.from('cabins').update({ ...cabinData, image: previousImage });
            }
            throw new Error("createCabin: error uploading Image");
        }
    }
    console.log(data)
    return data;
}
export async function deleteCabin(cabinId) {
    const { error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', cabinId);
    if (error) throw error;
}
