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

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to={APP_ROUTES.DASHBOARD} />} />
          <Route path={APP_ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={APP_ROUTES.BOOKINGS} element={<Bookings />} />
          <Route path={APP_ROUTES.CABINS} element={<Cabins />} />
          <Route path={APP_ROUTES.USERS} element={<Users />} />
          <Route path={APP_ROUTES.SETTINGS} element={<Settings />} />
          <Route path={APP_ROUTES.ACCOUNT} element={<Account />} />
          <Route path={APP_ROUTES.LOGIN} element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
