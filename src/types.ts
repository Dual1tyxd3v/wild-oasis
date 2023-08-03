import { ReactNode } from 'react';

export type CabinType = {
  id: number;
  created_at: string;
  name: string;
  max_capacity: number;
  regular_price: number;
  discount: number;
  description: string;
  image: string | File;
};

export type NewCabin = Omit<CabinType, 'id' | 'created_at'>;

export type SettingsType = {
  breakfast_price: number;
  created_at: string;
  id: number;
  max_booking_length: number;
  max_guests: number;
  min_booking_length: number;
};

export type NewSetting = {
  [key: string]: string | number;
};

export type BookingType = {
  cabin_id: number;
  cabin_price: number;
  created_at: string;
  end_date: string;
  extra_price: number;
  guest_id: number;
  has_breakfast: boolean;
  id: number;
  is_paid: boolean;
  num_guests: number;
  num_nights: number;
  observations: string;
  start_date: string;
  status: string;
  total_price: number;
  guests: {
    country_flag: string;
    created_at: string;
    email: string;
    fullName: string;
    id: number;
    nationalID: string;
    nationality: string;
  };
  cabins: {
    created_at: string;
    description: string;
    discount: number;
    id: number;
    image: string;
    max_capacity: number;
    name: string;
    regular_price: number;
  };
};

export type FormTypeProp = 'modal' | 'regular';

export type WithChildren = {
  children: ReactNode;
};

export type PositionType = {
  x: number;
  y: number;
};

export type SortOption = {
  value: string;
  label: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type OptionsType = {
  value: string;
  label: string;
}
