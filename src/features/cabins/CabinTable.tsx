import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import useCabins from './useCabins';
import Table from '../../ui/Table';
import { CabinType } from '../../types';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';
import { sortCabinsArray } from '../../utils/helpers';

export default function CabinTable() {
  const { isLoading, data } = useCabins();
  const [params] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (!data) return <Empty resource="Cabins"></Empty>;

  // FILTER
  const filter = params.get('discount');
  let filteredCabins: CabinType[] = [];
  switch (filter) {
    case 'all':
      filteredCabins = [...data];
      break;
    case 'with-discount':
      filteredCabins = data.filter((cabin) => cabin.discount !== 0);
      break;
    case 'no-discount':
      filteredCabins = data.filter((cabin) => cabin.discount === 0);
      break;
    default:
      filteredCabins = [...data];
      break;
  }
  
  const sort = params.get('sort');
  sortCabinsArray(filteredCabins, sort || '');

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
          data={filteredCabins}
          render={(cabin) => (
            <CabinRow cabin={cabin} key={`cabins_${cabin.id}`} />
          )}
        />
      </Table>
    </Menus>
  );
}
