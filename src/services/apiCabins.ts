import { CabinType, NewCabin } from '../types';
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

export async function updateCabin(newCabin: CabinType) {
  const { id, created_at, ...editedValues } = newCabin;
  const needUploadImage = typeof newCabin.image !== 'string';

  const imagePath = needUploadImage
    ? await uploadImage(newCabin.image as File)
    : (newCabin.image as string);

  const { data, error } = await supabase
    .from('cabins')
    .update({ ...editedValues, image: imagePath })
    .eq('id', id)
    .select();

  if (error) {
    console.log(error.message);
    throw new Error('Cound not create Cabin😭');
  }
  return data;
}

export async function createCabin(newCabin: NewCabin) {
  const imagePath = await uploadImage(newCabin.image as File);

  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();

  if (error) {
    throw new Error('Cound not create Cabin😭');
  }
  return data;
}

async function uploadImage(file: File) {
  const fileName = `${new Date().getTime()}_${file.name.replace(/\//, '')}`;

  const imagePath = `${supabaseCabinImagesUrl}${fileName}`;
  // Upload image
  const { error: imageError } = await supabase.storage
    .from('cabin-images')
    .upload(fileName, file);

  if (imageError) {
    throw new Error("Could not load Cabin image. Cabin wasn't created");
  }

  return imagePath;
}
