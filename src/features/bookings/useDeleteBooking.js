import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess: (id) => {
      toast.success(`Booking ${id} deleted successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: () => {
      toast.error("Failed to delete booking. Please try");
    },
  });
  return { isDeleting, deleteBooking };
}

export default useDeleteBooking;
