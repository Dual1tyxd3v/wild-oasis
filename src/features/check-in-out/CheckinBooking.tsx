import styled from 'styled-components';
import BookingDataBox from '../bookings/BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from '../bookings/useBooking';
import Spinner from '../../ui/Spinner';
import { useEffect, useState } from 'react';
import Checkbox from '../../ui/Checkbox';
import { formatCurrency } from '../../utils/helpers';
import { useCheckin } from './useCheckin';
import useSettings from '../settings/useSettings';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { booking, isLoading } = useBooking();
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => {
    setConfirmPaid(booking ? booking.is_paid : false);
    setAddBreakfast(booking ? booking.has_breakfast : false);
  }, [booking]);

  const { checkin, isCheckinIn } = useCheckin();

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    total_price,
    num_guests,
    has_breakfast,
    num_nights,
  } = booking;

  const optionalBreakfastPrice =
    (settings?.breakfast_price ?? 0) * num_nights * num_guests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({id: bookingId, breakfast: {
        has_breakfast: true,
        extra_price: optionalBreakfastPrice,
        total_price: total_price + optionalBreakfastPrice
      }})
    } else {
      checkin({id: bookingId});
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!has_breakfast && (
        <Box>
          <Checkbox
            id={bookingId.toString()}
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((b) => !b);
              setConfirmPaid(false);
            }}
          >
            Want to add breakfast for {optionalBreakfastPrice}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id={bookingId.toString()}
          checked={confirmPaid}
          disabled={confirmPaid || isCheckinIn}
          onChange={() => setConfirmPaid((c) => !c)}
        >
          I confirm that {guests.fullName} has paid the total amount of{' '}
          {addBreakfast
            ? `${formatCurrency(
                total_price + optionalBreakfastPrice
              )} (${formatCurrency(total_price)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`
            : formatCurrency(total_price)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckinIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
