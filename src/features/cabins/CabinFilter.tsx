import { CABINS_FILTERS, SORT_CABIN_OPTIONS } from '../../const';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
import TableOperations from '../../ui/TableOperations';

function CabinFilter() {
  return (
    <TableOperations>
      <Filter filterField="discount" options={CABINS_FILTERS} />

      <SortBy options={SORT_CABIN_OPTIONS} />
    </TableOperations>
  );
}

export default CabinFilter;
