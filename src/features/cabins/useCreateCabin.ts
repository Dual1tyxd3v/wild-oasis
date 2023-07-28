import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createAndEditCabin } from '../../services/apiCabins';

export default function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createNewCabin, isLoading: isCreating } = useMutation({
    mutationFn: createAndEditCabin,
    onError: (err: Error) => toast.error(err.message),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      toast.success('Cabin was added');
    },
  });

  return {createNewCabin, isCreating};
}