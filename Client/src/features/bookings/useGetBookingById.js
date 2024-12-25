import { getBooking } from "@/services/apiBookings";
import { QUERY_KEYS } from "@/constants/constants";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

function useGetBookingById(id = null) {
    const { id: paramsId } = useParams();
    const bookingId = id ? id : paramsId;

    const { data: booking, isLoading } = useQuery({
        queryKey: [QUERY_KEYS.BOOKINGS, bookingId],
        queryFn: () => getBooking(bookingId),
        retry: false,
    })
    return { booking, isLoading };

}
export default useGetBookingById;
