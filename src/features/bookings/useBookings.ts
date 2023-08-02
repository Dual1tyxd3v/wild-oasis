import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGINATION_COUNT } from '../../const';

export function useBookings() {
  const queryClient = useQueryClient();
  const [params] = useSearchParams();

  const filterValue = params.get('status');
  const filter = !filterValue || filterValue === 'all' ? null : filterValue;

  const sortValue = params.get('sort') || null;

  const currentPage = !params.get('page') ? 1 : Number(params.get('page'));

  const { data, isLoading, error } = useQuery({
    queryFn: () =>
      getBookings({
        filter: 'status',
        filterValue: filter,
        sortValue,
        page: currentPage,
      }),
    queryKey: ['bookings', filter, currentPage, sortValue],
  });
  const { data: bookings, count } = data ? data : { data: [], count: 0 };

  if (currentPage < Math.ceil(Number(count) / PAGINATION_COUNT))
    queryClient.prefetchQuery({
      queryFn: () =>
        getBookings({
          filter: 'status',
          filterValue: filter,
          sortValue,
          page: currentPage + 1,
        }),
      queryKey: ['bookings', filter, currentPage + 1, sortValue],
    });

  if (currentPage > 1)
    queryClient.prefetchQuery({
      queryFn: () =>
        getBookings({
          filter: 'status',
          filterValue: filter,
          sortValue,
          page: currentPage - 1,
        }),
      queryKey: ['bookings', filter, currentPage - 1, sortValue],
    });

  return { bookings, count, isLoading, error };
}
