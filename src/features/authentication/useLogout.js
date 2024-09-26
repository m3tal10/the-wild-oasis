import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending: isLoggingout, mutate: logout } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      queryClient.removeQueries();
      toast.success("Logged out successfully.");
      navigate("/login", { replace: true });
    },
    onError: () => toast.error("Failed to log out."),
  });
  return { isLoggingout, logout };
}

export default useLogout;
