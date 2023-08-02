import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: delBooking } = useMutation({
    mutationFn: deleteBooking,
    mutationKey: ['bookings'],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
      toast.success('Bookign was deleted.');
    },
    onError: () => toast.error('Could not delete booking...'),
  });

  return { isDeleting, delBooking };
}
