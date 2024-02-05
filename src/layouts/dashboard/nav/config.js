// component
import SvgColor from '../../../components/svg-color';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import PostAddIcon from '@mui/icons-material/PostAdd';
import TaskIcon from '@mui/icons-material/Task';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';



// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;



const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Offers',
    path: '/affilate/offers',
    icon: <LocalOfferIcon />,
  },
  {
    title: 'Conversions',
    path: '/affilate/conversions',
    icon: <ChangeCircleIcon />,
  },
  {
    title: 'ClickLogs',
    path: '/affilate/clicklogs',
    icon: <QueryStatsIcon />,
  },

  {
    title: 'Launch Camapgin ',
    path: '/dashboard/single-Campagin',
    icon: <PostAddIcon />,
  },
  {
    title: 'C-Statistics',
    path: '/dashboard/chistory',
    icon: <TaskIcon />,
  },
  {
    title: 'ConversionReport',
    path: '/affilate/conversionReport',
    icon: <ChangeCircleIcon />,
  },
  {
    title: 'AdSpace',
    path: '/affilate/Adspace',
    icon: <AddToQueueIcon />,
  },
  {
    title: 'Wallet',
    path: '/affilate/wallet',
    icon: <AccountBalanceWalletIcon />,
  },



];

export default navConfig;
