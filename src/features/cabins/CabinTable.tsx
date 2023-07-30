import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import useCabins from './useCabins';
import Table from '../../ui/Table';
import { CabinType } from '../../types';
import Menus from '../../ui/Menus';

export default function CabinTable() {
  const { isLoading, data } = useCabins();

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={data as CabinType[]}
          render={(cabin) => (
            <CabinRow cabin={cabin} key={`cabins_${cabin.id}`} />
          )}
        />
      </Table>
    </Menus>
  );
}
