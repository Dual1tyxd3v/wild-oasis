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

export type FormTypeProp =  'modal' | 'regular';

export type WithChildren = {
  children: ReactNode;
}

export type PositionType = {
  x: number;
  y: number;
}

export type SortOption = {
  value: string;
  label: string;
}
