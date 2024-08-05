import { updateSetting } from "@/services/apiSettings";
import { QUERY_KEYS } from "@/utils/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";


function useUpdateSettings() {
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation({
        mutationFn: updateSetting,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.SETTINGS]
            })
        }


    })
    return { updateSettings: mutate, isLoading };
}
export default useUpdateSettings;