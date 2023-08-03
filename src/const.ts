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
  { value: '7', label: 'Last 7 days' },
  { value: '30', label: 'Last 30 days' },
  { value: '90', label: 'Last 90 days' },
];

export const SORT_CABIN_OPTIONS = [
  { value: 'name-asc', label: 'name (A-Z)' },
  { value: 'name-desc', label: 'name (Z-A)' },
  { value: 'regular_price-asc', label: 'price (low first)' },
  { value: 'regular_price-desc', label: 'price (high first)' },
  { value: 'max_capacity-asc', label: 'capacity (low first)' },
  { value: 'max_capacity-desc', label: 'capacity (high first)' },
];

export const PAGINATION_COUNT = 10;

export const START_DATA_DARK = [
  {
    duration: '1 night',
    value: 0,
    color: '#b91c1c',
  },
  {
    duration: '2 nights',
    value: 0,
    color: '#c2410c',
  },
  {
    duration: '3 nights',
    value: 0,
    color: '#a16207',
  },
  {
    duration: '4-5 nights',
    value: 0,
    color: '#4d7c0f',
  },
  {
    duration: '6-7 nights',
    value: 0,
    color: '#15803d',
  },
  {
    duration: '8-14 nights',
    value: 0,
    color: '#0f766e',
  },
  {
    duration: '15-21 nights',
    value: 0,
    color: '#1d4ed8',
  },
  {
    duration: '21+ nights',
    value: 0,
    color: '#7e22ce',
  },
];

export const START_DATA_LIGHT = [
  {
    duration: '1 night',
    value: 0,
    color: '#ef4444',
  },
  {
    duration: '2 nights',
    value: 0,
    color: '#f97316',
  },
  {
    duration: '3 nights',
    value: 0,
    color: '#eab308',
  },
  {
    duration: '4-5 nights',
    value: 0,
    color: '#84cc16',
  },
  {
    duration: '6-7 nights',
    value: 0,
    color: '#22c55e',
  },
  {
    duration: '8-14 nights',
    value: 0,
    color: '#14b8a6',
  },
  {
    duration: '15-21 nights',
    value: 0,
    color: '#3b82f6',
  },
  {
    duration: '21+ nights',
    value: 0,
    color: '#a855f7',
  },
];
