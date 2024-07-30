import { getBookings } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";


function useGetBookings() {

    const { data: bookings, isLoading } = useQuery({
        queryKey: ["bookings"],
        queryFn: getBookings
    });
    return { bookings, isLoading };
}
export default useGetBookings;

