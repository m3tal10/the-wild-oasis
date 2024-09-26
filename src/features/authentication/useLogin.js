import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user", user.user]);
      toast.success("Logged in successfully.");
      navigate("/dashboard", { replace: true });
    },
    onError: () => {
      toast.error("Failed to log in. Email or Password is incorrect.");
    },
  });
  return { isPending, login };
}

export default useLogin;
