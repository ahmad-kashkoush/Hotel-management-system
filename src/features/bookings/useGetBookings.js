import { getBookings } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";


function useGetBookings() {
    const [searchParams] = useSearchParams();
    // build filter objects and values
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
        isLoading
    } = useQuery({
        queryKey: ["bookings", statusValue, sortValue, pageValue],
        queryFn: () => getBookings({ filter, sortBy, page: pageValue })
    });
    return { bookings, count, isLoading };
}
export default useGetBookings;

