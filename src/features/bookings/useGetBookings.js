import { getBookings } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";


function useGetBookings() {
    const [searchParams] = useSearchParams();
    // build filter objects and values
    const sortValue = searchParams.get("sort");
    const statusValue = searchParams.get("status") || "all";
    const filter = !statusValue || statusValue === "all" ?
        null :
        { field: "status", value: statusValue, methodName: "eq" }

    const [field, dir] = sortValue?.split("-") || [];
    const sortBy = !sortValue
        ? null :
        { field, dir }
    const { data: bookings, isLoading } = useQuery({
        queryKey: ["bookings", statusValue, sortValue],
        queryFn: () => getBookings({ filter, sortBy })
    });
    return { bookings, isLoading };
}
export default useGetBookings;

