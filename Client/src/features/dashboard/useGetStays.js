import { QUERY_KEYS } from "@/constants/constants";
import { getStaysAfterDate } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

function useGetStays() {
    const [searchParams] = useSearchParams();
    const lastValue = Number(searchParams.get("last")) || 7;

    const lastDate = subDays(new Date(), lastValue).toISOString();
    const { data: stays, isLoading } = useQuery({
        queryKey: [QUERY_KEYS.STAYS, `last-${lastValue}`],
        queryFn: () => getStaysAfterDate(lastDate)
    });
    const confirmedStays = stays?.filter(stay => stay.status === "checked-in" || stay.status === "checked-out");
    return { stays, confirmedStays, isLoading };
}
export default useGetStays;

