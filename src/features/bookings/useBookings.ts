import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { BookingType } from '../../types';

export function useBookings() {
  const { data, isLoading, error } = useQuery({
    queryFn: getBookings,
    queryKey: ['bookings'],
  });
  const bookings: BookingType[] = data ? data : [];

  return { bookings, isLoading, error };
}
