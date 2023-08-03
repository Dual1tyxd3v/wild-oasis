import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from 'react-icons/hi2';
import { BookingType } from '../../types';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

type StatsProps = {
  bookings: BookingType[];
  confirmedStays: BookingType[];
  numDays: number;
  cabinCount: number;
};

function Stats({ bookings, confirmedStays, numDays, cabinCount }: StatsProps) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.total_price, 0);
  const checkIns = confirmedStays.length;
  const occupation = confirmedStays.reduce((acc, curr) => acc + curr.num_nights ,0) / (numDays * cabinCount);

  return (
    <>
      <Stat title="Bookings" color="blue" icon={<HiOutlineBriefcase />} value={numBookings} />
      <Stat title="Sales" color="green" icon={<HiOutlineBanknotes />} value={formatCurrency(sales)} />
      <Stat title="Check ins" color="indigo" icon={<HiOutlineCalendarDays />} value={checkIns} />
      <Stat title="Occupancy rate" color="yellow" icon={<HiOutlineChartBar />} value={Math.round(occupation * 100) + '%'} />
    </>
  );
}
export default Stats;
