import { getSettings } from "@/services/apiSettings";
import { QUERY_KEYS } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";

function useSettings() {
    
    const { data: settings, isLoading, error } = useQuery({
        queryFn: getSettings,
        queryKey: [QUERY_KEYS.SETTINGS],

    })
    return { settings, error, isLoading };

}
export default useSettings;