import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

function useDayActivity() {
  const {
    isLoading,
    data: activities,
    error,
  } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });
  return { isLoading, activities };
}

export default useDayActivity;
