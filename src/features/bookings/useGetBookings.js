import { getBookings } from "@/services/apiBookings";
import { PAGE_SIZE, QUERY_KEYS } from "@/utils/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";


function useGetBookings() {

    const [searchParams] = useSearchParams();

    const queryClient = useQueryClient();

    const sortValue = searchParams.get("sort");
    const statusValue = searchParams.get("status") || "all";
    const pageValue = +searchParams.get("page") || 1;


    const filter = !statusValue || statusValue === "all" ?
        null :
        { field: "status", value: statusValue, methodName: "eq" }



    const [field, dir] = sortValue?.split("-") || [];
    const sortBy = !sortValue
        ? null :
        { field, dir }



    const {
        data: { bookings, count } = {},
        isLoading,
    } = useQuery({
        queryKey: [QUERY_KEYS.BOOKINGS, statusValue, sortValue, pageValue],
        queryFn: () => getBookings({ filter, sortBy, page: pageValue })
    });

    const pageCount = Math.ceil(count / PAGE_SIZE);

    // Pre-fetch data to improve UX
    if (pageValue < pageCount)
        queryClient.prefetchQuery({
            queryKey: [QUERY_KEYS.BOOKINGS, statusValue, sortValue, pageValue + 1],
            queryFn: () => getBookings({ filter, sortBy, page: pageValue + 1 })
        })
    if (pageValue > 1)
        queryClient.prefetchQuery({
            queryKey: [QUERY_KEYS.BOOKINGS, statusValue, sortValue, pageValue - 1],
            queryFn: () => getBookings({ filter, sortBy, page: pageValue - 1 })
        })

    return { bookings, count, isLoading };
}
export default useGetBookings;

