import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useCreateCabin() {
  const queryClient = useQueryClient();
  const { status: createStatus, mutate: createCabin } = useMutation({
    mutationFn: createUpdateCabin,
    onSuccess: () => {
      toast.success("Created successfully.");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { createStatus, createCabin };
}

export default useCreateCabin;
