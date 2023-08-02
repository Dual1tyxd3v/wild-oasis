import { ReactNode, useEffect } from 'react';
import { useUser } from '../features/authentication/useUser';
import { styled } from 'styled-components';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../const';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoading, isAuth } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth && !isLoading) navigate(`/${APP_ROUTES.LOGIN}`);
  }, [isAuth, navigate, isLoading]);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  return children;
}

export default ProtectedRoute;
