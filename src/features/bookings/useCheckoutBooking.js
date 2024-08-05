import { updateBooking } from "@/services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";


function useCheckoutBooking() {
    // invalidate bookings query
    const queryClient = useQueryClient();


    const { mutate: checkout, isPending: isCheckingOut } = useMutation({
        mutationFn: ({ id }) => updateBooking(id, {
            status: "checked-out"
        }),
        onSuccess: (data) => {
            toast.success(`booking#${data.id} is successfully checkedout`)
            queryClient.invalidateQueries({ active: true })
        },
        onError: (err) => toast.error(err.message)

    })

    return { checkout, isCheckingOut };


}
export default useCheckoutBooking;