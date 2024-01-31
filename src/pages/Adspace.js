import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import { toast } from 'react-toastify';
// @mui
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
  AppClicks,
} from '../sections/@dashboard/app';
import { afterLoginStorage   } from "../service/localStorage";
import { getUserFromLocalStorage } from '../service/localStorage';
import { removeUserFromLocalStorage } from '../service/localStorage';
import { Box } from '@mui/system';


// import PrivateComponent from "../components/PrivateRoute";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [newsData,setNewsData] = useState([]);
  const [user, setUser] = useState(null);
  const user1 = getUserFromLocalStorage();
  const [loading, setLoading] = useState(false);
  const URL2 = process.env.REACT_APP_PROD_API;
  const URL3 = process.env.REACT_APP_PROD_ADMIN_API;

  const PrivateCheck = () => {
    const auth = localStorage.getItem("user");
    if (!auth) {
      navigate('/login');
    }
  }
 
  
  const fetchData = async () => {
    const url = `${URL2}/api/analytics/clicks`;
    const accessToken = user1.data.access_token;
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setData(response.data);
      setLoading(true);
    } catch (error) {
      console.log('Error While Fetching data click --->', error);
      toast.error('Session Expired Please Login Again');
      navigate('/login');
      removeUserFromLocalStorage();
    }
  };

  const fetchNewsData = async () => {
    const PAGENUMBER=1;
    const url_news = `${URL3}/news/?page=${PAGENUMBER}`;
    // console.log("THis is user data --->", url);
    const accessToken = user1.data.access_token;
    // console.log("This is access token --->", accessToken);
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      };
      const response = await fetch(url_news, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
      setNewsData(jsonData);
      setLoading(true);
    } catch (error) {
      console.log('Error While Fetching data click --->', error);
      toast.error('Error in Fetching Data');
    }
  };
  
  useEffect(() => {
    // Check if user is authenticated
    // privateCheck();
    PrivateCheck();
    afterLoginStorage(
      (res) => {
        setUser(res);
      }
    );
    fetchData();
    fetchNewsData();

  }, []);

  const names = data.map(item => item.name);
  const count = data.map(item=>item.count);
  
 


  return (
    <>
      
      <Helmet>
        <title> Dashboard | Affworld </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, {user?.data.name} Welcome  to Affworld-Adspace
        </Typography>

       

        <Grid container spacing={3}>
          <Grid style={{ cursor: 'pointer' }}
            onClick={() => navigate("/affilate/Webportal")} item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Web portal" total={97} icon={'ant-design:gold-filled'} />
          </Grid>
          <Grid style={{ cursor: 'pointer' }}
            onClick={() => navigate("/affilate/clicklogs")} item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Adspace " total={92} icon={'ant-design:gold-filled'} />
          </Grid>

          <Grid style={{ cursor: 'pointer' }} onClick={() => navigate("/affilate/conversions")}
            item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Settings" total={203} color="info" icon={'ant-design:interaction-filled'} />
          </Grid>
          <Grid style={{ cursor: 'pointer' }} onClick={() => navigate("/affilate/user/details")}
            item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bids" total={1352831}  icon={'ant-design:thunderbolt-outlined'} />
          </Grid>
          
<iframe src="https://affiliate-api.affworld.cloud/api/misc/iframe_code?affiliate_id=4b5562fb788d4cdf99b0dcd5d461a8b2&iframe_id=1&iframe_type=main" scrolling="no" style="border: none; width: 100%; height: 100vh; margin: 0 auto; display: block;"></iframe>
         
          


          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={newsData.slice(-5).map((eachNews, index) => ({
                id: eachNews?.news_id,
                title: eachNews?.subject,
                description: eachNews?.description,
                image: eachNews?.icon,
                postedAt: eachNews?.timestamp,
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          
          
        </Grid>
      </Container>
    </>
  );
}
