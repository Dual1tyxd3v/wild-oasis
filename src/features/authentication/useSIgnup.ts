import { useMutation } from '@tanstack/react-query';
import { signup } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';

export function useSIgnup() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      console.log(data);
      toast.success('Account successfully created! Please verify the new account from the users email address');
    },
  });

  return { signUp, isLoading };
}
