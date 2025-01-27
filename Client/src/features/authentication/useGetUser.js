import { getUser } from "@/services/apiAuth";
import { QUERY_KEYS } from "@/constants/constants";
import { useQuery } from "@tanstack/react-query";

function useGetUser() {

    const { data: user, isLoading } = useQuery({
        queryKey: [QUERY_KEYS.USERS],
        queryFn: getUser,

    });
    const token = JSON.parse(localStorage.getItem("token"));
    const isAuthenticated = !(!token);


    return { user, isAuthenticated, isLoading }
}
export default useGetUser;