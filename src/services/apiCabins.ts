import { NewCabin } from '../types';
import supabase, { supabaseCabinImagesUrl } from './supabase';

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
  const fileName = `${new Date().getTime()}_${(
    newCabin.image as File
  ).name.replace(/\//, '')}`;
  const imagePath = `${supabaseCabinImagesUrl}${fileName}`;
    // Upload image
  const { error: imageError } = await supabase.storage
    .from('cabin-images')
    .upload(fileName, newCabin.image as File);
  if (imageError) {
    throw new Error("Could not load Cabin image. Cabin wasn't created");
  }
  // Insert new Cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select();
  if (error) {
    throw new Error('Cound not create Cabin😭');
  }
  return data;
}
