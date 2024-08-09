import { QUERY_KEYS } from "@/constants/constants";
import { updatePassword } from "@/services/apiAuth";
import { updateUserData } from "@/services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useUpdateUser() {


    const queryClient = useQueryClient();
    const { mutate: updateUser, isPending } = useMutation({
        mutationFn: ({ password, updatedUser: updatedData }) => {
            if (password) return updatePassword({ password });
            if (updatedData) return updateUserData({ updatedData });
        },
        onSuccess: (user) => {
            toast.success("Account updated successfully");
            queryClient.setQueryData([QUERY_KEYS.USERS], user)
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.USERS]
            })

        },
        onError: (err) => toast.error(err.message)
    })

    return { updateUser, isUpdating: isPending }
}
export default useUpdateUser;