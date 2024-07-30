import { getBooking } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";

function useGetBookingById(bookingId) {
    const { data: booking, isLoading: isFetchingBooking } = useQuery({
        queryKey: ["bookings"],
        queryFn: () => getBooking(bookingId)
    })

    return { booking, isFetchingBooking };

}
export default useGetBookingById;
