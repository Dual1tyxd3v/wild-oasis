import styled from 'styled-components';
import { format, isToday } from 'date-fns';

import Tag from '../../ui/Tag';
import Table from '../../ui/Table';

import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';
import { BookingType } from '../../types';
import Menus from '../../ui/Menus';
import { HiArrowDownOnSquare, HiEye, HiTrash } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../const';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteBooking } from './useDeleteBooking';
import { useCallback } from 'react';

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
`;

type BookingRowProps = {
  booking: BookingType;
};

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    start_date,
    end_date,
    num_nights,
    num_guests,
    total_price,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}: BookingRowProps) {
  const navigate = useNavigate();
  const { isDeleting, delBooking } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  const deleteHandler = useCallback(() => {
    delBooking(bookingId);
  }, [delBooking, bookingId]);

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(start_date))
            ? 'Today'
            : formatDistanceFromNow(start_date)}{' '}
          &rarr; {num_nights} night stay
        </span>
        <span>
          {format(new Date(start_date), 'MMM dd yyyy')} &mdash;{' '}
          {format(new Date(end_date), 'MMM dd yyyy')}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status as keyof typeof statusToTagName]}>
        {status.replace('-', ' ')}
      </Tag>

      <Amount>{formatCurrency(total_price)}</Amount>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={bookingId} />
            <Menus.List id={bookingId}>
              <Menus.Button
                onClick={() => navigate(`${bookingId}`)}
                icon={<HiEye />}
              >
                See details
              </Menus.Button>

              {status === 'unconfirmed' && (
                <Menus.Button
                  onClick={() =>
                    navigate(`/${APP_ROUTES.CHECK_IN}/${bookingId}`)
                  }
                  icon={<HiArrowDownOnSquare />}
                >
                  Check in
                </Menus.Button>
              )}
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={`Booking #${bookingId}`}
              disabled={isDeleting}
              onConfirm={deleteHandler}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default BookingRow;
