// component
import SvgColor from '../../../components/svg-color';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import PostAddIcon from '@mui/icons-material/PostAdd';
import TaskIcon from '@mui/icons-material/Task';



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
    icon: <LocalOfferIcon/>,
  },
  {
    title: 'Conversions',
    path: '/affilate/conversions',
    icon: <ChangeCircleIcon/>,
  },
  {
    title: 'ClickLogs',
    path: '/affilate/clicklogs',
    icon: <QueryStatsIcon/>,
  },
  {
    title: 'Campaign Management',
    path: '/dashboard/clicklogs2',
    icon: <PostAddIcon/>,
  },
  {
    title: 'C-Statistics',
    path: '/dashboard/chistory',
    icon: <TaskIcon/>,
  },
  // {
  //   title: 'user',
  //   path: '/dashboard/user',
  //   icon: icon('ic_user'),
  // },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },

 


  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },


  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
 
];

export default navConfig;
