import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import { toast } from 'react-toastify';
// @mui
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, TextField, Button } from '@mui/material';
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
    const [webURL, setWebURl] = useState("");
    const user2 = getUserFromLocalStorage();
    const accessToken = user2?.data.access_token;
    const URL = process.env.REACT_APP_PROD_API;

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


    const sendURL = async () => {
        try {
            console.log("Sending URL", webURL);
            const url = `${URL}/api/affiliates/save_website_pns?website_url=${webURL}`;
    
            const res = await axios.post(url, null, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                }
            });


    
            console.log("Response from server", res?.data);

            if(res?.status === 201){
                toast.success(res?.data?.message);
                setWebURl("");
            }


        } catch (error) {
            console.log("Error while sending URL--->", error?.response?.data?.detail);
            toast.error(error?.response?.data?.detail);
        }
    }
    

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
                <title> Add new site | Affworld </title>
            </Helmet>

            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Hi, {user?.data.name} Welcome  to Affworld-Adspace
                </Typography>




                <TextField value={webURL} onChange={(e) => setWebURl(e.target.value)} id="standard-basic" label="Enter Website URl" variant="standard" />
                <Button variant="contained" color='success' onClick={sendURL} >Send URL</Button>







            </Container>
        </>
    );
}
