import { NewCabin } from '../types';
import supabase from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    throw new Error('Cound not load Cabins😭');
  }
  return data;
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    throw new Error('Cound not delete Cabin😭');
  }
  return data;
}

export async function createCabin(newCabin: NewCabin) {
  const { data, error } = await supabase
    .from('cabins')
    .insert([newCabin])
    .select();
  if (error) {
    throw new Error('Cound not create Cabin😭');
  }
  return data;
}
