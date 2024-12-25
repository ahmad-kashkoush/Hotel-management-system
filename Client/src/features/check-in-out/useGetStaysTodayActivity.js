import { QUERY_KEYS } from "@/constants/constants";
import { getStaysTodayActivity } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";

function useGetStaysTodayActivity() {



    const { data: stays, isLoading } = useQuery({
        queryFn: getStaysTodayActivity,
        queryKey: [QUERY_KEYS.TODAY_ACTIVITY]
    });

    return { stays, isLoading }

}




export default useGetStaysTodayActivity;