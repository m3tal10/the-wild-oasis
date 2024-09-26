import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useUpdateUserData() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateUserData } = useMutation({
    mutationFn: (updateData) => updateUser(updateData),
    onSuccess: ({ updatedUser }) => {
      toast.success("User Updated Successfully.");

      queryClient.setQueryData("user", updatedUser);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: () => {
      toast.error("Couln't update user data.");
    },
  });
  return { isUpdating, updateUserData };
}

export default useUpdateUserData;
