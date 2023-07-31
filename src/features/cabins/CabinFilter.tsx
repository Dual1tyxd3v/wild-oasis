import { CABINS_FILTERS } from '../../const';
import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';

function CabinFilter() {
  return (
    <TableOperations>
      <Filter filterField="discount" options={CABINS_FILTERS}></Filter>
    </TableOperations>
  );
}

export default CabinFilter;
