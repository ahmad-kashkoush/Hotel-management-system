import supabase from "@/services/supabase";

export async function getCabins() {

    const { data: cabins, error } = await supabase
        .from('cabins')
        .select('*');
    if (error) throw error;
    return cabins;

}

export async function deleteCabin(cabinId) {
    try {

        const { error } = await supabase
            .from('cabins')
            .delete()
            .eq('id', cabinId);
        if (error) throw error;

    } catch (err) {
        console.error(`deleteCabin(): ${err}`);
    }
}