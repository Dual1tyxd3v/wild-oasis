import styled from 'styled-components';
import { useRecentBookings } from './useRecentBookings';
import Spinner from '../../ui/Spinner';
import { useRecentStays } from './useRecentStays';
import Stats from './Stats';
import { BookingType, CabinType } from '../../types';
import useCabins from '../cabins/useCabins';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading, data } = useRecentBookings();
  const { isLoading: isLoadingStays, confirmedStays, numDays } = useRecentStays();
  const { data: cabins, isLoading: isLoadingCabins } = useCabins();

  if (isLoading || isLoadingStays || isLoadingCabins) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        cabinCount={(cabins as CabinType[]).length}
        numDays={numDays}
        bookings={data as BookingType[]}
        confirmedStays={confirmedStays}
      />
      <div>Today's activity</div>
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={data as BookingType[]} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
