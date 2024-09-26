import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../../utils/constants";

function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const page = Number(searchParams.get("page")) || 1;
  const sortField = searchParams.get("sort")?.split("-") || [
    "startDate",
    "asc",
  ];

  //FILTER
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
        };

  //SORT
  const sort = {
    field: sortField[0],
    direction: sortField[1],
  };

  // QUERY
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sort, page],
    queryFn: () => getBookings({ filter, sort, page }),
  });

  // PRE-FETCHING

  // PRE-FETCHING NEXT PAGE
  if (page < Math.ceil(bookings?.count / ITEMS_PER_PAGE)) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page + 1],
      queryFn: () => getBookings({ filter, sort, page: page + 1 }),
    });
  }

  // PRE-FETCHING PREVIOUS PAGE
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page - 1],
      queryFn: () => getBookings({ filter, sort, page: page - 1 }),
    });
  }

  return { isLoading, bookings, error };
}

export default useBookings;
