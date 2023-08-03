import { DASHBOARD_FILTERS } from '../../const';
import Filter from '../../ui/Filter';

function DashboardFilter() {
  return <Filter filterField="last" options={DASHBOARD_FILTERS} />;
}

export default DashboardFilter;
