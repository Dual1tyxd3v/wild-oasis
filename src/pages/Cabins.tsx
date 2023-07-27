import { useState } from 'react';
import CabinTable from '../features/cabins/CabinTable';
import Button from '../ui/Button';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CreateCabinForm from '../features/cabins/CreateCabinForm';

function Cabins() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>filter/sort</p>
        <p>TEST</p>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setShowAddForm((s) => !s)}>Add new cabin</Button>
        {showAddForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
