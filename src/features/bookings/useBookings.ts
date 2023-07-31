import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { BookingType } from '../../types';
import { useSearchParams } from 'react-router-dom';

export function useBookings() {
  const [params] = useSearchParams();

  const filterValue = params.get('status');
  const filter = !filterValue || filterValue === 'all' ? null : filterValue;

  const { data, isLoading, error } = useQuery({
    queryFn: () => getBookings({ filter: 'status', sortBy: filter }),
    queryKey: ['bookings', filter],
  });
  const bookings: BookingType[] = data ? data : [];

  return { bookings, isLoading, error };
}
