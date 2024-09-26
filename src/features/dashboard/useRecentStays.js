import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;
  const queryDate = subDays(new Date(), numDays).toISOString();

  const {
    isLoading,
    data: stays,
    error,
  } = useQuery({
    queryKey: ["stays", `last -${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });
  const confirmedStays = stays?.filter((stay) => {
    // console.log(stay);
    return stay.status === "checked-in" || stay.status === "checked-out";
  });
  return { confirmedStays, stays, isLoading, numDays };
}

export default useRecentStays;
