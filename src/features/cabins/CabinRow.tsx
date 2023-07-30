import styled from 'styled-components';
import { CabinType } from '../../types';
import { formatCurrency } from '../../utils/helpers';
import { useCallback } from 'react';
import CreateCabinForm from './CreateCabinForm';
import useDeleteCabin from './useDeleteCabin';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import useCreateCabin from './useCreateCabin';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

type CabinRowProps = {
  cabin: CabinType;
};

export default function CabinRow({ cabin }: CabinRowProps) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createNewCabin } = useCreateCabin();

  const {
    id,
    image,
    name,
    max_capacity,
    regular_price,
    discount,
    description,
  } = cabin;

  function onCopyHandle() {
    const newCabin = {
      name: `Copy of ${cabin.name}`,
      image,
      max_capacity,
      regular_price,
      discount,
      description,
    };
    createNewCabin(newCabin);
  }

  const onDeleteHandle = useCallback(() => {
    deleteCabin(id);
  }, [deleteCabin, id]);
  return (
    <TableRow role="row">
      <Img src={image as string} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {max_capacity} guests</div>
      <Price>{formatCurrency(regular_price)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <button disabled={isCreating} onClick={onCopyHandle}>
            <HiSquare2Stack />
          </button>

          <Modal.Open opens="update">
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name="update">
            <CreateCabinForm cabin={cabin} />
          </Modal.Window>

          <Modal.Open opens="delete">
            <button disabled={isDeleting}>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={name}
              onConfirm={onDeleteHandle}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      </div>
    </TableRow>
  );
}
