import { getSettings } from "@/services/apiSettings";
import { useQuery } from "@tanstack/react-query";

function useSettings() {
    const { data: settings, isLoading } = useQuery({
        queryFn: getSettings,
        queryKey: ["settings"],

    })

    return { settings, isLoading };

}
export default useSettings;