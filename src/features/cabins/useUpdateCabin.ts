import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { CabinType } from '../../types';
import { createAndEditCabin } from '../../services/apiCabins';

export default function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabin, id }: { newCabin: CabinType; id: number }) =>
      createAndEditCabin(newCabin, id),
    onError: (err: Error) => toast.error(err.message),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      toast.success('Cabin was edited');
    },
  });

  return { isEditing, editCabin };
}
