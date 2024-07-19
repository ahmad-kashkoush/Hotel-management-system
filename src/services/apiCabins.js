import supabase from "@/services/supabase";

export async function getCabins() {
    try {
        const { data: cabins, error } = await supabase
            .from('cabins')
            .select('*');
        if (error) throw error;
        return cabins;
    } catch (err) {
        console.error(`getCabins(): ${err}`);
    }
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