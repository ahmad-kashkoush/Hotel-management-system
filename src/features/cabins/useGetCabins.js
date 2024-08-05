import { getCabins } from "@/services/apiCabins";
import { QUERY_KEYS } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";

export function useGetCabins() {
    const { data: cabins, isLoading } = useQuery({
        queryKey: [QUERY_KEYS.CABINS],
        queryFn: getCabins,
    });
    return { cabins, isLoading };
}