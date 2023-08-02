import SortBy from '../../ui/SortBy';
import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';
import { BOOKINGS_FILTERS } from '../../const';

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={BOOKINGS_FILTERS}
      />

      <SortBy
        options={[
          { value: 'start_date-desc', label: 'Sort by date (recent first)' },
          { value: 'start_date-asc', label: 'Sort by date (earlier first)' },
          {
            value: 'total_price-desc',
            label: 'Sort by amount (high first)',
          },
          { value: 'total_price-asc', label: 'Sort by amount (low first)' },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
