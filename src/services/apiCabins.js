import supabase, { supabaseUrl } from "@/services/supabase";

export async function getCabins() {

    const { data: cabins, error } = await supabase
        .from('cabins')
        .select('*');
    if (error) throw error;
    return cabins;

}

export async function insertCabin(cabinData) {
    // 1. create cabin
    const imageName = `${Math.random()}-${cabinData.image.name}`.replaceAll('/', '').replaceAll(' ', '-');
    const { data, error } = await supabase
        .from('cabins')
        .insert([{
            ...cabinData,
            image: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
        }])
        .select();
    if (error) throw new Error("createCabin: error creating cabin");

    const { error: imageError } = await supabase
        .storage
        .from('cabin-images')
        .upload(imageName, cabinData.image);
    if (imageError) {
        await deleteCabin(data[0].id);
        console.error(imageError)
        throw new Error("createCabin: error uploading Image");
    }
    return data;
}
export async function deleteCabin(cabinId) {
    const { error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', cabinId);
    if (error) throw error;
}

export async function updateCabin(cabinId, previousImage, updatedCabin) {

    const imageName = `${Math.random()}-${updatedCabin.image.name}`.replaceAll('/', '').replaceAll(' ', '-');
    const { data, error } = await supabase
        .from('cabins')
        .update({
            ...updatedCabin,
            image: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
        })
        .eq('id', cabinId)
        .select().single();


    if (error) throw error;
    const { error: imageError } = await supabase
        .storage
        .from('cabin-images')
        .upload(imageName, updatedCabin.image);
    if (imageError) {
        await deleteCabin(data.id);
        console.error(imageError)
        throw new Error("createCabin: error uploading Image");
    }
    console.log(data);

}