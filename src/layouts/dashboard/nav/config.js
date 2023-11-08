// component
import SvgColor from '../../../components/svg-color';


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
    icon: icon('ic_disabled'),
  },
  {
    title: 'Conversions',
    path: '/affilate/conversions',
    icon: icon('ic_disabled'),
  },
  {
    title: 'ClickLogs',
    path: '/affilate/clicklogs',
    icon: icon('ic_disabled'),
  },
  {
    title: 'ConversionReport',
    path: '/affilate/conversionReport',
    icon: icon('ic_disabled'),
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
