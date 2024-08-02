import { getBooking } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

function useGetBookingById() {
    const { id: bookingId } = useParams();

    const { data: booking, isLoading } = useQuery({
        queryKey: ["bookings"],
        queryFn: () => getBooking(bookingId),
        retry:false,
    })

    return { booking, isLoading };

}
export default useGetBookingById;
