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
import { afterLoginStorage } from "../service/localStorage";
import { getUserFromLocalStorage } from '../service/localStorage';
import { removeUserFromLocalStorage } from '../service/localStorage';
import { Box } from '@mui/system';


// import PrivateComponent from "../components/PrivateRoute";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [newsData, setNewsData] = useState([]);
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
    const PAGENUMBER = 1;
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
  const count = data.map(item => item.count);




  return (
    <>

      <Helmet>
        <title> Dashboard | Affworld </title>
      </Helmet>

      <Container maxWidth="xl">



        <Grid container spacing={3}>
          <Grid style={{ cursor: 'pointer' }}
            onClick={() => navigate("/affilate/Addnewsite")} item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Add new Site" total={97} icon={'ant-design:gold-filled'} />
          </Grid>
          <Grid style={{ cursor: 'pointer' }}
            onClick={() => navigate("/affilate/updatedsite")} item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Updatedsite " total={92} icon={'ant-design:gold-filled'} />
          </Grid>

          <Grid style={{ cursor: 'pointer' }} onClick={() => navigate("/affilate/listedsites")}
            item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Listed sites" total={203} color="info" icon={'ant-design:interaction-filled'} />
          </Grid>
          <Grid style={{ cursor: 'pointer' }} onClick={() => navigate("/affilate/pushPortalDashboard")}
            item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="PushPortal" total={1352831} icon={'ant-design:thunderbolt-outlined'} />
          </Grid>
















        </Grid>
      </Container>
    </>
  );
}
