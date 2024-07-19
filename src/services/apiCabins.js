import supabase from "@/services/supabase";

export async function getCabins() {

    const { data: cabins, error } = await supabase
        .from('cabins')
        .select('*');
    if (error) throw error;
    return cabins;

}

