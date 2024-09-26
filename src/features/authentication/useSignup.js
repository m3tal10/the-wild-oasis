import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useSignup() {
  const navigate = useNavigate();
  const { isPending: isSigningup, mutate: signUp } = useMutation({
    mutationFn: (newUser) => signUpApi(newUser),
    onSuccess: () => {
      toast.success("Account created successfully.");
      navigate("/");
    },
    onError: () => {
      toast.error("Couln't create account. Please try again later.");
    },
  });
  return { isSigningup, signUp };
}

export default useSignup;
