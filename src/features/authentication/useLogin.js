import { login as loginApi } from "@/services/apiAuth";
import { QUERY_KEYS } from "@/utils/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function useLogin() {
    //  mutate
    // on sucess
    // on error
    const queryClient=useQueryClient();
    const navigate = useNavigate();
    const { mutate: login, isPending, error } = useMutation({
        mutationFn: loginApi,
        onSuccess: (user) => {
            toast.success("Hi,  " + user.email + "  Successfully logged in");
            navigate("/dashboard");
            queryClient.setQueriesData(QUERY_KEYS.USERS, user)            

        },
        onError: (err) => { 
            console.error("Error:" + err.message)
            toast.error("incorrect email or password")
        }
    })

    return { login, isPending, error };


}
export default useLogin;
