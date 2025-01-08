import supabase from "@/services/supabase";
import { getImagePath } from "@/utils/helpers";
const url = "http://127.0.0.1:3000/api/v1";
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

export async function insertCabin({ cabinData, previousImage = "", id = null }) {

    // todo add third part image storer
    const { hasImagePath, imageName, imagePath } = getImagePath(cabinData.image || previousImage, "cabin-images");

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
            const response = await fetch(`${url}/cabins/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...cabinData, image: imagePath }),
            });
            const obj = await response.json();
            data = obj.data;
            error = obj.error;


    }
    // const { data, error } = await query.select().single();


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

// done: patch request with data
// done: post request with data