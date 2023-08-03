import { PAGINATION_COUNT } from '../const';
import { BookingType } from '../types';
import { getToday } from '../utils/helpers';
import supabase from './supabase';

type GetBookingsProps = {
  filter: string;
  page: number | null;
  filterValue: string | null;
  sortValue: string | null;
};

export async function getBookings({
  filter,
  filterValue,
  sortValue,
  page,
}: GetBookingsProps) {
  let query = supabase
    .from('bookings')
    .select('*, cabins(name), guests(fullName, email)', { count: 'exact' });

  if (filterValue) {
    query = query.eq(filter, filterValue);
  }

  if (sortValue) {
    const [field, direction] = sortValue.split('-');

    query = query.order(field, {
      ascending: direction === 'asc',
    });
  }

  if (page) {
    const from = (page - 1) * PAGINATION_COUNT;
    const to = from + PAGINATION_COUNT - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;
  if (error) throw new Error('Bookings could not be loaded');

  return { data, count };
}

export async function getBooking(id: number) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking not found');
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('created_at, total_price, extra_price')
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from('bookings')
    // .select('*')
    .select('*, guests(fullName)')
    .gte('start_date', date)
    .lte('start_date', getToday());

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data as BookingType[];
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality, countryFlag)')
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order('created_at');

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }
  return data;
}

type UpdateBookingObject = {
  status: string;
  is_paid: boolean;
}

export async function updateBooking(id: number, obj: UpdateBookingObject) {
  const { data, error } = await supabase
    .from('bookings')
    .update(obj)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return data as BookingType;
}

export async function deleteBooking(id: number) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  return data;
}
