import { QUERY_KEYS } from "@/constants/constants";
import { getBookingsAfterDate } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

function useGetRecentBooking() {
    const [searchParams] = useSearchParams();
    const lastValue = Number(searchParams.get("last")) || 360;

    const lastDate = subDays(new Date(), lastValue).toISOString().slice(0, 10);
    const { data: recentBookings, count, isLoading } = useQuery({
        queryKey: [QUERY_KEYS.BOOKINGS, `last-${lastValue}`],
        queryFn: () => getBookingsAfterDate(lastDate)
    });
    return { recentBookings, count, isLoading, numDays: lastValue };
}
export default useGetRecentBooking;

