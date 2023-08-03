import Button from '../../ui/Button';
import { useCheckout } from './useCheckout';

type CheckoutButtonProps = {
  bookingId: number;
};

function CheckoutButton({ bookingId }: CheckoutButtonProps) {
  const { isLoading, checkout } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isLoading}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
