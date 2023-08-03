import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading } = useMutation({
    mutationFn: (id: number) =>
      updateBooking(id, {
        status: 'check-out',
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ exact: true });
    },
    onError: () => toast.error('There was an error while checking out'),
  });

  return { checkout, isLoading };
}
