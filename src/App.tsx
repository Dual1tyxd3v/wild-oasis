import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import { APP_ROUTES } from './const';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './ui/AppLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import Booking from './pages/Booking';
import Checkin from './pages/Checkin';
import ProtectedRoute from './ui/ProtectedRoute';
import DarkModeProvider from './context/DarkModeContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to={APP_ROUTES.DASHBOARD} replace />} />
              <Route path={APP_ROUTES.DASHBOARD} element={<Dashboard />} />
              <Route path={APP_ROUTES.BOOKINGS} element={<Bookings />} />
              <Route path={`${APP_ROUTES.BOOKINGS}/:id`} element={<Booking />} />
              <Route path={`${APP_ROUTES.CHECK_IN}/:id`} element={<Checkin />} />
              <Route path={APP_ROUTES.CABINS} element={<Cabins />} />
              <Route path={APP_ROUTES.USERS} element={<Users />} />
              <Route path={APP_ROUTES.SETTINGS} element={<Settings />} />
              <Route path={APP_ROUTES.ACCOUNT} element={<Account />} />
            </Route>
            <Route path={APP_ROUTES.LOGIN} element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 5000 },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: 'var(--color-grey-0)',
              color: 'var(--color-grey-700)',
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
