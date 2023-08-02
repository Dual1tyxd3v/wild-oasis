import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../const';

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckinIn } = useMutation({
    mutationFn: (id: number) =>
      updateBooking(id, {
        status: 'checked-in',
        is_paid: true,
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ exact: true });
      navigate(APP_ROUTES.MAIN);
    },

    onError: () => toast.error('There was an error while checkin in'),
  });

  return { checkin, isCheckinIn };
}
