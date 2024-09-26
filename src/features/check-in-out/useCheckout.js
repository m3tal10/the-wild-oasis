import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutate: checkout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} Checked out successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      navigate("/bookings?status=checked-out");
    },
    onError: () => {
      toast.error("Couldn't check out. Please try again later.");
    },
  });
  return { isPending, checkout };
}

export default useCheckout;
