import { QUERY_KEYS } from "@/constants/constants";
import { getBookingsAfterDate } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

function useGetRecentBooking() {
    const [searchParams] = useSearchParams();
    const lastValue = Number(searchParams.get("last")) || 7;

    const lastDate = subDays(new Date(), lastValue).toISOString();
    const { data: recentBookings, isLoading } = useQuery({
        queryKey: [QUERY_KEYS.BOOKINGS, `last-${lastValue}`],
        queryFn: () => getBookingsAfterDate(lastDate)
    });
    return { recentBookings, isLoading, numDays:lastValue };
}
export default useGetRecentBooking;

