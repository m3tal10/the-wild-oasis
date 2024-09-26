import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // const { bookingId } = useParams();

  const { isPending, mutate: checkin } = useMutation({
    mutationFn: ({ bookingId, breakfast }) => {
      return updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      });
    },
    onSuccess: (data) => {
      toast.success(`Successfully checked in booking #${data.id}`);
      queryClient.invalidateQueries({
        queryKey: ["bookings", data.id],
      });
      navigate("/bookings/status=checked-in");
    },
    onError: () => {
      toast.error("There was an error while checking in.");
    },
  });
  return { isPending, checkin };
}

export default useCheckin;
