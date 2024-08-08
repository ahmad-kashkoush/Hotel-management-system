import { insertCabin } from "@/services/apiCabins";
import { QUERY_KEYS } from "@/constants/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateCabin() {
    const queryClient = useQueryClient();
    const { mutate: updateCabin, isPending: isUpdatingCabin } = useMutation({
        mutationFn: ({ updatedCabin, editId, curImage }) =>
            insertCabin({
                id: editId,
                previousImage: curImage,
                cabinData: updatedCabin,
            }),
        onSuccess: () => {
            toast.success("cabin successfully updated");
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.CABINS],
            });
            // passed to mutate
            // reset();
            // onCloseForm();
        },
        onError: (err) => toast.error(err.message),
    });
    return { updateCabin, isUpdatingCabin };
}