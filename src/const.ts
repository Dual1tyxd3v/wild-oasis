export enum APP_ROUTES {
  MAIN = '/',
  DASHBOARD = 'dashboard',
  BOOKINGS = 'bookings',
  CABINS = 'cabins',
  USERS = 'users',
  SETTINGS = 'settings',
  ACCOUNT = 'account',
  LOGIN = 'login',
  CHECK_IN = 'checkin'
}

export const CABINS_FILTERS = ['All', 'With discount', 'No discount'];

export const BOOKINGS_FILTERS = ['All', 'Checked in', 'Checked out', 'Unconfirmed'];

export const SORT_CABIN_OPTIONS = [
  { value: 'name-asc', label: 'name (A-Z)' },
  { value: 'name-desc', label: 'name (Z-A)' },
  { value: 'regular_price-asc', label: 'price (low first)' },
  { value: 'regular_price-desc', label: 'price (high first)' },
  { value: 'max_capacity-asc', label: 'capacity (low first)' },
  { value: 'max_capacity-desc', label: 'capacity (high first)' },
];

export const PAGINATION_COUNT = 10;
