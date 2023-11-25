
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import Loader from '../components/Loader';
import { getUserFromLocalStorage } from '../service/localStorage';


const Conversions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = getUserFromLocalStorage();
  const URL2 = process.env.REACT_APP_PROD_API;
  const navigate = useNavigate();
  const [totalCount, setTotalCount] = useState(0);

  const privateCheck = () => {
    const auth = localStorage.getItem("user");
    if (!auth) {
      navigate("/login");
    }
  }

  const fetchData = async () => {
    const url = `${URL2}/api/analytics/clicks`;
  
    const accessToken = user.data.access_token;
  
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      console.log('this is response this is laxmikant edit page  --->', response);
      setData(response.data);
      setLoading(true);
    } catch (error) {
      console.log('Error While Fetching data click --->', error);
      toast.error('Error in Fetching Data');
    }
  };

  useEffect(() => {
    fetchData();
    privateCheck();
  }, []);

  useEffect(() => {
    // Calculate the total count when the data changes
    const calculatedTotalCount = data.reduce((acc, item) => acc + (item.count || 0), 0);
    setTotalCount(calculatedTotalCount);
  }, [data]);

  const handlePostback = async (item) => {
    const accessToken = user.data.access_token;
    const campageinId = item.campaign_id;
    console.log('id is -->', campageinId);
    const url = `${URL2}/api/analytics/postback?campaign_id=${campageinId}`;

    setIsOpen(true);

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('data of post back data in clickcon------>', response.data);
      setPostData(response.data);
      setLoading(true);
    } catch (error) {
      console.log('error is-->', error);
      toast.error(error.response.data.detail);
    }
  };

  return (
    <>
      <Helmet>
        <title>Conversions | Affworld</title>
      </Helmet>

      <div>
        <Typography variant="h4" align="center" sx={{ padding: '16px' }}>
          Clicks and Conversions!
        </Typography>

        <Typography variant="h6" align="center"  sx={{ padding: '16px' }}>
            Total Count: <span style={{fontFamily:"cursive"}}>{totalCount}</span>
          </Typography>

        <div style={{ margin: '20px' }} className="affilate-table-container">
          <div className="affilate-table-container">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>Campaign</TableCell>
                  <TableCell>Counts</TableCell>
                  <TableCell>Conversions</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  data?.length > 0 &&
                  data.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item?.name}</TableCell>
                      <TableCell>{item?.count}</TableCell>

                      <TableCell>
                        <Button onClick={() => handlePostback(item)} variant="contained" color="success">
                          Status
                        </Button>
                      </TableCell>

                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <LinearProgress />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      

      <Modal onClose={() => setIsOpen(false)} open={isOpen}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'white', boxShadow: 24, p: 2, borderRadius: '8px', width: '60%' }}>
          <Typography variant="h6" align="center" gutterBottom>
            Conversion Details
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Count</TableCell>
                <TableCell>Event ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                postData?.length > 0 &&
                postData.map((item, index) => (
                  <TableRow
                    key={index}
                    style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }} // Alternating colors

                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item?.count}</TableCell>
                    <TableCell>{item?.event_id}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <Loader />
                    
                  </TableCell>
                </TableRow>
              )
              }
            </TableBody>
          </Table>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </Box>
      </Modal>
      




    </>
  );
};


export default Conversions;
