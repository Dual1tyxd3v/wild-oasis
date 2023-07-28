import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateSettings } from '../../services/apiSettings';

export default function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettings,
    onError: (err: Error) => toast.error(err.message),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      });
      toast.success('Settings was updated');
    },
  });

  return { isUpdating, updateSetting };
}
