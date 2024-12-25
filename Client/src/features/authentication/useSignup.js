import { signUp as signupApi } from "@/services/apiAuth";
// import { QUERY_KEYS } from "@/constants/constants";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router";

function useSignup() {

    // const navigate=useNavigate();
    // const queryClient = useQueryClient();
    const { mutate: signup, isPending, error } = useMutation({
        mutationFn: (data) => signupApi({ user: data }),
        onSuccess: (user) => {
            toast.success(user.user.email + " successfully created");
            // queryClient.setQueryData(QUERY_KEYS.USERS, user)

        },
        onError: (err) => {
            console.error("Error:" + err.message)
            toast.error("Faild creating account")
        }
    })

    return { signup, isPending, error };


}
export default useSignup;