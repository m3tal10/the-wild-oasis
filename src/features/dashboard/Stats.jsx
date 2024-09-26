import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  //1
  const numBookings = bookings.length;
  //2
  const totalSales = bookings.reduce((acc, cur) => (acc += cur.totalPrice), 0);
  //3
  const totalCheckins = confirmedStays.length;
  //4
  const occupancyRate =
    (confirmedStays.reduce((acc, cur) => (acc += cur.numNights), 0) /
      (numDays * cabinCount)) *
    100;

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        value={numBookings}
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        title="Sales"
        color="green"
        value={formatCurrency(totalSales)}
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        title="Check-ins"
        color="indigo"
        value={totalCheckins}
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        value={`${Math.round(occupancyRate)}%`}
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}

export default Stats;
