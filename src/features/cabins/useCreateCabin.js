import { insertCabin } from "@/services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateCabin() {
    const queryClient = useQueryClient();
    const { mutate: createCabin, isLoading: isCreatingCabin } = useMutation({
        mutationFn: (cabin) => insertCabin({ cabinData: cabin }),
        onSuccess: () => {
            toast.success("cabin successfully Created");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
            // reset & closeForm will be passed on mutate call options 
        },
        onError: (err) => toast.error(err.message),
    });
    return { isCreatingCabin, createCabin };
}