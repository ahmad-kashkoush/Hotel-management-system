import { updateBooking } from "@/services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";


function useCheckinBooking() {
    // invalidate bookings query
    const queryClient = useQueryClient();
    const navigate = useNavigate();


    const { mutate: checkinBooking, isPending: isCheckingBooking } = useMutation({
        mutationFn: ({ id, breakfast }) => updateBooking(id, {
            status: "checked-in",
            isPaid: true,
            ...breakfast
        }),
        onSuccess: (data) => {
            toast.success(`booking#${data.id} is successfully updated`)
            queryClient.invalidateQueries({ active: true })
            navigate("/");
        },
        onError: (err) => toast.error(err.message)

    })

    return { checkinBooking, isCheckingBooking };


}
export default useCheckinBooking;