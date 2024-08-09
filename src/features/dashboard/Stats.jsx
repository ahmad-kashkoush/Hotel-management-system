import Stat from "@/features/dashboard/Stat";
import { formatCurrency } from "@/utils/helpers";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

function Stats({ bookings, confirmedStays, numDays, cabinsCount }) {
  const numBookings = bookings?.length;

  const sales = bookings?.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const checkIns = confirmedStays?.length;

  // occuapancy rate
  const occupiedNights = confirmedStays.reduce(
    (acc, cur) => acc + cur.numNights,
    0
  );
  const totalAvailableNights=numDays*cabinsCount;
  const occupancy = Math.round(((occupiedNights / totalAvailableNights) * 100 + Number.EPSILON) * 100) / 100;
  return (
    <>
      <Stat
        title="Bookings"
        value={numBookings}
        icon={<HiOutlineBriefcase />}
        color={"blue"}
      />
      <Stat
        title="Sales"
        value={formatCurrency(sales)}
        icon={<HiOutlineBanknotes />}
        color={"green"}
      />
      <Stat
        title="Check ins"
        value={checkIns}
        icon={<HiOutlineCalendarDays />}
        color={"indigo"}
      />
      <Stat
        title="Occupancy rate"
        value={`${occupancy}%`}
        icon={<HiOutlineChartBar />}
        color={"yellow"}
      />
    </>
  );
}
export default Stats;
