import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/apiBookings';
import { useParams } from 'react-router-dom';
import { BookingType } from '../../types';

export function useBooking() {
  const params = useParams();
  const id = Number(params.id);

  const { data, isLoading, error } = useQuery({
    queryFn: () => getBooking(id),
    queryKey: [`booking_${id}`],
    retry: false
  });

  if (error) throw new Error('Could not load current booking');

  return { booking: data as BookingType, isLoading, error };
}
