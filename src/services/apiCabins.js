import supabase, { supabaseUrl } from "@/services/supabase";

export async function getCabins() {

    const { data: cabins, error } = await supabase
        .from('cabins')
        .select('*');
    if (error) throw error;
    return cabins;

}

export async function insertCabin({ cabinData, previousImage = "", id = null }) {
    const hasImagePath = typeof cabinData.image === "string" ? cabinData.image.startsWith(supabaseUrl) : false;
    // 1. create cabin
    const imageName = `${Math.random()}-${cabinData?.image?.name}`.replaceAll('/', '').replaceAll(' ', '-');
    const imagePath = hasImagePath ? cabinData.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
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
    if (error) throw new Error("createCabin: error creating cabin");
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
