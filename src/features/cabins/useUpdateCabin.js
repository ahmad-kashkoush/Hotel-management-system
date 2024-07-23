import { insertCabin } from "@/services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateCabin() {
    const queryClient = useQueryClient();
    const { mutate: updateCabin, isLoading: isUpdatingCabin } = useMutation({
        mutationFn: ({ updatedCabin, editId, curImage }) =>
            insertCabin({
                id: editId,
                previousImage: curImage,
                cabinData: updatedCabin,
            }),
        onSuccess: () => {
            toast.success("cabin successfully updated");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
            // passed to mutate
            // reset();
            // onCloseForm();
        },
        onError: (err) => toast.error(err.message),
    });
    return { updateCabin, isUpdatingCabin };
}