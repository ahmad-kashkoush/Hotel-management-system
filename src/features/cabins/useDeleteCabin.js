import { deleteCabin } from "@/services/apiCabins";
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
                queryKey: ["cabins"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { deleteRow, isDeleting };
}