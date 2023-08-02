import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export function useBookings() {
  const [params] = useSearchParams();

  const filterValue = params.get('status');
  const filter = !filterValue || filterValue === 'all' ? null : filterValue;

  const currentPage = !params.get('page') ? 1 : Number(params.get('page'));

  const { data, isLoading, error } = useQuery({
    queryFn: () =>
      getBookings({ filter: 'status', sortBy: filter, page: currentPage }),
    queryKey: ['bookings', filter, currentPage],
  });
  const { data: bookings, count } = data ? data : { data: [], count: 0 };

  return { bookings, count, isLoading, error };
}
