import { logout as logoutApi } from "@/services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate: logout, isPending: isLoading } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            toast.success("Successfully logged out");
            navigate("/login", { replace: true })
            queryClient.removeQueries();
        }
    });

    return { logout, isLoading };
}
export default useLogout;
