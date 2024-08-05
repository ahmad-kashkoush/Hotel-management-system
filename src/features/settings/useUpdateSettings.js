import { updateSetting } from "@/services/apiSettings";
import { useMutation, useQueryClient } from "@tanstack/react-query";


function useUpdateSettings() {
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation({
        mutationFn: updateSetting,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["settings"]
            })
        }


    })
    return { updateSettings: mutate, isLoading };
}
export default useUpdateSettings;