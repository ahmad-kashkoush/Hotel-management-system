import { getUser } from "@/services/apiAuth";
import { QUERY_KEYS } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";

function useGetUser() {

    const { data: user, isLoading } = useQuery({
        queryKey: [QUERY_KEYS.USERS],
        queryFn: getUser,

    });



    return { user, isAuthenticated: user?.role === "authenticated", isLoading }
}
export default useGetUser;