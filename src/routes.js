import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import Offers from './pages/Offers';
import ConversionReport from './pages/ConversionReport';
import DetailOffer from './pages/DetailOffer';
import Conversions from './pages/Conversions';
import PrivateComponent from './components/PrivateRoute';
import PaymentDetails from './pages/PaymentDetails';
import UserDetails from './pages/UserDetails';
import RegisterPage from './pages/RegisterPage';
import Finance from './pages/Finance';
import DynamicAds from './pages/DynamicAds';
import ClickLogs from './pages/ClickLogs';
import ClickLogs2 from './pages/ClickLogs2';
import Chistory from './pages/Chistory';
import PlayerPage from './pages/PlayerPage';



export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element:

        <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: 'app', element: <PrivateComponent children={<DashboardAppPage />} /> },
        {
          path: 'offers', element: <Offers />,
        },
        {
          path: 'conversionReport', element: <ConversionReport />,
        },
        {
          path: 'clicklogs', element: <ClickLogs />,
        },
        {
          path: 'clicklogs2', element: <ClickLogs2 />,
        },
        { path: 'chistory', element: <Chistory /> },
        { path: 'PlayerPage', element: <PlayerPage /> },

      ],
    },
    {

      path: '/affilate',
      element: <DashboardLayout />,
      children: [
        { path: 'detail-offer', element: <DetailOffer /> },
        { path: 'offers', element: <Offers /> },
        { path: 'conversionReport', element: <ConversionReport /> },
        { path: 'conversions', element: <Conversions /> },
        { path: 'payment/details', element: <PaymentDetails /> },
        { path: 'user/details', element: <UserDetails /> },
        { path: 'finance', element: <Finance /> },
        { path: 'dynamicAds', element: <DynamicAds /> },
        { path: 'clicklogs', element: <ClickLogs /> },
        { path: 'clicklogs2', element: <ClickLogs2 /> },


      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },

    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

