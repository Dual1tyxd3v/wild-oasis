import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../const';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, mutate: logOut } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate(`/${APP_ROUTES.LOGIN}`, { replace: true });
    },
  });

  return { isLoading, logOut };
}
