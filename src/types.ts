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
