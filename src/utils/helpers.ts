import { formatDistance, parseISO } from 'date-fns';
import { differenceInDays } from 'date-fns/esm';
import { CabinType } from '../types';

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1: string, dateStr2: string) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In');

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
    value
  );

export const sortCabinsArray = (arr: CabinType[], sort: string) => {
  const [sortField, direction] = sort?.split('-') || 'created_at';
  const key = sortField as keyof (typeof arr)[0];
  const type = typeof arr[0][key];

  arr.sort((a, b) => {
    if (type === 'string') {
      return direction === 'asc'
        ? (a[key] as string).localeCompare(b[key] as string)
        : (b[key] as string).localeCompare(a[key] as string);
    }
    if (type === 'number') {
      return direction === 'asc'
        ? (a[key] as number) - (b[key] as number)
        : (b[key] as number) - (a[key] as number);
    }
    return a.id - b.id;
  });

  switch (sortField) {
    case 'name':
      arr.sort((a, b) =>
        direction === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
      break;
    case 'regular_price':
      arr.sort((a, b) =>
        direction === 'asc'
          ? a['regular_price'] - b['regular_price']
          : b['regular_price'] - a['regular_price']
      );
      break;
    case 'max_capacity':
      arr.sort((a, b) =>
        direction === 'asc'
          ? a['max_capacity'] - b['max_capacity']
          : b['max_capacity'] - a['max_capacity']
      );
      break;
    default:
      arr.sort((a, b) =>
        direction === 'asc'
          ? a['created_at'].localeCompare(b['created_at'])
          : b['created_at'].localeCompare(a['created_at'])
      );
      break;
  }
};
