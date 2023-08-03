export enum APP_ROUTES {
  MAIN = '/',
  DASHBOARD = 'dashboard',
  BOOKINGS = 'bookings',
  CABINS = 'cabins',
  USERS = 'users',
  SETTINGS = 'settings',
  ACCOUNT = 'account',
  LOGIN = 'login',
  CHECK_IN = 'checkin',
}


export const CABINS_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'with-discount', label: 'With discount' },
  { value: 'no-discount', label: 'No discount' },
];

export const BOOKINGS_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'checked-in', label: 'Checked in' },
  { value: 'checked-out', label: 'Checked out' },
  { value: 'unconfirmed', label: 'Unconfirmed' },
];

export const DASHBOARD_FILTERS = [
  {value: '7', label: 'Last 7 days'},
  {value: '30', label: 'Last 30 days'},
  {value: '90', label: 'Last 90 days'},
]

export const SORT_CABIN_OPTIONS = [
  { value: 'name-asc', label: 'name (A-Z)' },
  { value: 'name-desc', label: 'name (Z-A)' },
  { value: 'regular_price-asc', label: 'price (low first)' },
  { value: 'regular_price-desc', label: 'price (high first)' },
  { value: 'max_capacity-asc', label: 'capacity (low first)' },
  { value: 'max_capacity-desc', label: 'capacity (high first)' },
];

export const PAGINATION_COUNT = 10;
