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