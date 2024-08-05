import { deleteCabin } from "@/services/apiCabins";
import { QUERY_KEYS } from "@/utils/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteCabin() {
    const queryClient = useQueryClient();
    // deletion
    const { mutate: deleteRow, isLoading: isDeleting } = useMutation({
        mutationFn: deleteCabin,
        onSuccess: () => {
            toast.success("cabin successfully deleted");
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.CABINS],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { deleteRow, isDeleting };
}