import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../const';

type AdditionalBreakfastProp = {
  has_breakfast: boolean;
  extra_price: number;
  total_price: number;
};

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckinIn } = useMutation({
    mutationFn: ({
      id,
      breakfast,
    }: {
      id: number;
      breakfast?: AdditionalBreakfastProp;
    }) =>
      updateBooking(id, {
        status: 'checked-in',
        is_paid: true,
        ...breakfast,
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
