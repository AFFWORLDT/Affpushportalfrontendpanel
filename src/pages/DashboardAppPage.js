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
          Hi, {user?.data.name} Welcome back to Affworld
        </Typography>

       

        <Grid container spacing={3}>
          <Grid style={{ cursor: 'pointer' }}
            onClick={() => navigate("/affilate/offers")} item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="See Offers" total={97} icon={'ant-design:gold-filled'} />
          </Grid>
          <Grid style={{ cursor: 'pointer' }}
            onClick={() => navigate("/affilate/clicklogs")} item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="See ClickLogs" total={92} icon={'ant-design:gold-filled'} />
          </Grid>

          <Grid style={{ cursor: 'pointer' }} onClick={() => navigate("/affilate/conversions")}
            item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="See Conversions" total={203} color="info" icon={'ant-design:interaction-filled'} />
          </Grid>
          <Grid style={{ cursor: 'pointer' }} onClick={() => navigate("/affilate/user/details")}
            item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="See Overview" total={1352831}  icon={'ant-design:thunderbolt-outlined'} />
          </Grid>
          <Grid style={{ cursor: 'pointer' }} onClick={() => navigate("/affilate/finance")}
            item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Finance Details" total={489} color="info" icon={'ant-design:money-collect-outlined'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppClicks
              title="Clicks"
              subheader="Campaign Wise Clicks"
              chartLabels={names}
              chartData={[
                {
                  name: 'Campaign wise clciks',
                  type: 'column',
                  fill: 'solid',
                  data: count,
                },
              ]}
            />
          </Grid>
         
         
          


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

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Campagins"
              chartLabels={['KhelRaja', '1xBet', 'Cricbuzz', 'RoyalCasino', 'rollingslots', 'vulkan', 'STAKE']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
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

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
