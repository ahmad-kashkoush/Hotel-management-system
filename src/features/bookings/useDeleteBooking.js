import { deleteBooking } from "@/services/apiBookings";
import { QUERY_KEYS } from "@/utils/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useDeleteBooking() {
    const queryClient = useQueryClient();
    const { mutate, isPending: isLoading, error } = useMutation({
        mutationFn: ({ id }) => deleteBooking(id),
        onSuccess: (data) => {
            toast.success(`booking#${data} successfully deleted`);
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.BOOKINGS]
            })
        },
        onError: (err) => {
            toast.error(`${err}`);
        }
    })



    return { deleteBooking: mutate, isLoading, error };
}
export default useDeleteBooking;