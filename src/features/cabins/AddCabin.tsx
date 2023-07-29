import { useCallback, useState } from 'react';
import CreateCabinForm from './CreateCabinForm';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';

function AddCabin() {
  const [showAddForm, setShowAddForm] = useState(false);

  const onCloseModal = useCallback(() => {
    setShowAddForm(false);
  }, []);
  return (
    <div>
      <Button onClick={() => setShowAddForm((s) => !s)}>Add new cabin</Button>
      {showAddForm && (
        <Modal onClose={onCloseModal}>
          <CreateCabinForm formType="modal" onClose={onCloseModal} />
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
