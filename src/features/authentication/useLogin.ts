import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../../services/apiAuth';
import { LoginType } from '../../types';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../const';
import { toast } from 'react-hot-toast';

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, mutate: auth } = useMutation({
    mutationFn: ({ email, password }: LoginType) => login({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueriesData(['user'], user);
      navigate(`/${APP_ROUTES.DASHBOARD}`);
    },
    onError: (err) => {
      console.log((err as Error).message);
      toast.error('Provided email or password are incorrect');
    },
  });

  return { auth, isLoading };
}
