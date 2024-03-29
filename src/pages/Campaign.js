import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button, Box, Select, MenuItem, FormControl, InputLabel, Modal } from '@mui/material';
import { toast } from 'react-toastify';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import LinearProgress from '@mui/material/LinearProgress';
import useClipboard from "react-use-clipboard";
import copy from 'clipboard-copy';
import * as XLSX from 'xlsx';
import { getData } from '../service/api';
import { getResFromLocalStorage, getUserFromLocalStorage } from '../service/localStorage';
import axios from 'axios';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import PauseIcon from '@mui/icons-material/Pause';
import { fontWeight } from '@mui/system';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Import the Expired icon
import Typography from 'src/theme/overrides/Typography';


// const getApprovedCount = () => {
//     //const startIndex = page * rowsPerPage;
//     const approvedData = data.filter((row, index) => approvalStatus[index] === 'approved');
//     //const dataForPage = approvedData.slice(startIndex, startIndex + rowsPerPage);
//     return approvedData.length;
//   };


const Campaign = () => {
  const URL = process.env.REACT_APP_PROD_ADMIN_API;
  const URL2 = process.env.REACT_APP_PROD_API;

  const navigate = useNavigate();
  const res = getResFromLocalStorage();
  const user = getUserFromLocalStorage();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageData, setPageData] = useState([]);
  const { copied, copyToClipboard } = useClipboard(); // Initialize useClipboard

  const [status, setStatus] = useState("");
  const [buttonStates, setButtonStates] = useState({});
  const user2 = getUserFromLocalStorage();
  const accessToken = user2?.data.access_token;
  const url = `${URL}/approve/`;
  //const url ="http://localhost:8000/approve/";
  const affiliateId = res?.data.affiliate_id;
  const [approvalStatus,setApprovalStatus] = useState([]);
  const publicOfferData = data.filter((row) => (row?.type === 'Public'));
  const otherPublicOfferData = data.filter((row) => (row?.type === null));
  const privateOfferData=data.filter((row) => buttonStates[row._id]==="Approved");
  const approvedData = [...publicOfferData,...privateOfferData,...otherPublicOfferData];
  let approvedCount= approvedData.length;
  

  const privateCheck = () => {
    const auth = localStorage.getItem('user');
    if (!auth) {
      navigate('/login');
    }
  };

  
  const [payoutVal , setPayoutVal] = useState();
  const [ isPayoutVal , setIsPayoutVal] = useState(false); 
  

  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {

    privateCheck();
    fetchData();
  }, []); // Use an empty dependency array to run the effect only once

  // const fetchData = async () => {
  //   try {
  //     const result = await getData();
      




  //     console.log("offers data -->", result);
  //     setData(result);
  //     setLoading(true);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };
  


  useEffect(() => {

    fetchData();
  }, [status]);

  // useEffect(() => {
  //   console.log("DATA__",data);
  //   (data.map((each)=>{
  //     console.log("NAME__",each?.name);
  //     console.log("TYPE__",each?.type);
  //   }))
  //   // console.log("DATA__", data);
  //   (data.map((each) => {
  //   }))

    
  // }, [data])


  useEffect(()=>{
    (data.map((row) => {
      console.log("NAME__",row?.name);
      console.log("TYPE__",row?.type);
      console.log("publicOfferData",publicOfferData);
      console.log("buttonStates[row._id]____",buttonStates[row._id]);
        }))
    
  },[data])

  const fetchData = async () => {
    try {
      console.log("status-->", status);
      const result = await axios.get(`${URL}/campaign/?page=1&status=${status}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.data.access_token}`,
        }
      } );
      
      console.log("offers data -->", result);
      setData(result.data);
      setLoading(true);

      for (const row of result.data) {
        if (row?.type === 'Private') {
        await checkApprovalStatus(row);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }


  };

  const checkApprovalStatus = async (row) => {
    
    try {
      const url_approve=`${URL}/approve/?page=1&affiliate_id=${affiliateId}&campaign_id=${row._id}`
      // Replace with your actual access token
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      };
     
      
      const response = await fetch(url_approve, {
        method: 'GET',
        headers: headers,
        
      });

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
        // Log additional response data if needed
        const responseData = await response.json();
        console.error('Response Data:', responseData);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
      setApprovalStatus(prevStatus => [...prevStatus, jsonData[0]?.approval_status]);
      console.log("jsonData__",jsonData);
      console.log("jsonData.approval_status____",jsonData[0]?.approval_status);
      console.log("ApprovalStatus",approvalStatus);
      if (jsonData[0]?.approval_status === 'approved') {
        setButtonStates((prevStates) => ({
          ...prevStates,
          [row._id]: 'Approved',
        }));
      } else if (jsonData[0]?.approval_status === 'disapproved') {
        setButtonStates((prevStates) => ({
          ...prevStates,
          [row._id]: 'Disapproved',
        }));
      } else if (jsonData[0]?.approval_status === 'pending') {
        setButtonStates((prevStates) => ({
          ...prevStates,
          [row._id]: 'Pending',
        }));

        
      }
      
    } catch (error) {
      console.error('Error fetching approval status:', error);
    }
     
    
  };

  
 


  const sendRequest = async (campaignId) => {
    
    try {
      // Replace with your actual access token
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      };
      const requestData = {
        
          "affiliate_id": `${affiliateId}`,
          "campaign_id": `${campaignId}`,
          "request_sent": true,
          "approval_status": "pending"
        
      };
      
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
     
     
    } catch (error) {
      console.error('Error fetching data:', error);
      
    }
  };






  const handleIframe = async (row) => {
    try {
      const campageinId = row._id;
      const url = `${URL2}/api/affiliates/set_on_iframe?campaign_id=${campageinId}`;
      const accessToken = user.data.access_token;
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
      if (response.status === 200) {
        toast.success("Iframe set successfully!!");
      }
    } catch (error) {
      console.log("Error While setting iframe-->", error);
      toast.error("Error While setting iframe!!");
    }
  };

  
  const handleCopyAff = (item) => {
    const link = `${URL}/${item?.code}?affiliate_id=${res.data.affiliate_id}`;
    // console.log('Copy clicked');
    // console.log('Link is -->', link);
    // console.log('This is res --->', res);
    // console.log('This is user affiliate id -----> :', res.data.affiliate_id);

    try {


      copy(link);

      toast.success('Link copied to clipboard', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (error) {
      console.error('Error copying link to clipboard:', error);
      toast.error('Error copying link to clipboard', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };


  const handleClick = async (row) => {
    try {
      if (row?.type === 'Public' || row?.type === null) {
        await handleCopyAff(row);
      } else if (row?.type === 'Private') {
        // Update the state for the specific button
        await checkApprovalStatus(row);
      console.log("buttonStates[row._id]____",buttonStates[row._id]);
        if (buttonStates[row._id]==="Approved"){
          await handleCopyAff(row);
        }
        
        else{
          setButtonStates((prevStates) => ({
            ...prevStates,
            [row._id]: 'Pending',
          }));
          await sendRequest(row?._id);
        }
        console.log('Button clicked and changed to pending for row:', row._id);
        
        // navigate('/affiliate/detail-offer'); // Commented out to isolate the issue
        
      }
      
      
    } catch (error) {
      console.error('Error:', error);
    }
  };
  // const handleClick = async (row) => {
  //   try {
  //     if (row?.type === 'Public' || row?.type === null) {
  //       await handleCopyAff(row);
  //     } else if (row?.type === 'Private') {
  //       setButtonText('Pending'); 
  //       // Update the state for the specific button
  //       setButtonStates((prevStates) => ({
  //         ...prevStates,
  //         [row._id]: true,
  //       }));
  //       await sendRequest(row?._id);
  //       // navigate('/affiliate/detail-offer'); // Commented out to isolate the issue
  //     }
  //     console.log('Button clicked and changed to pending');
  //   } catch (error) {
  //     console.error('Error:', error);
  //   } finally {
  //     // Update the state for the specific button
  //     setButtonStates((prevStates) => ({
  //       ...prevStates,
  //       [row._id]: false,
  //     }));
  //   }
  // };


  const exportData = () => {


    const fileName = 'Offers.xlsx';
    const table = document.getElementById('offers-table');
    const rows = table.querySelectorAll('tr');
    const tabledata = [];
    const headers = [];
    rows[0].querySelectorAll('th').forEach((header) => {
      headers.push(header.innerText);
    });
    tabledata.push(headers);
    rows.forEach((row, index) => {
      if (index === 0) {
        return; // Skip the header row
      }

      const rowData = [];
      const cells = row.querySelectorAll('td');


      console.log(`INDEX:  ${index}`)
      console.log(`DATA[0]:  ${data[0]}`)
      cells.forEach((cell, cellIndex) => {
        // If this is the action column, add a link
        if (cellIndex === 6) {

          const actionLink = `${URL}/${data[index - 1]?.code}?affiliate_id=${res.data.affiliate_id}`;

          rowData.push(actionLink);

        } else {
          rowData.push(cell.innerText);
        }
      });

      tabledata.push(rowData);
    });

    const ws = XLSX.utils.aoa_to_sheet(tabledata);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName);
  };

  const handlePayout = (row)=>{
    setPayoutVal(row?.payouts);
    setIsPayoutVal(true);
    // console.log("row this is payout row--->", row?.payouts);
  }

  useEffect(() => {
    const startIndex = page * rowsPerPage;
    // Filter data based on approved status
    
    const dataForPage = approvedData.slice(startIndex, startIndex + rowsPerPage);
    setPageData(dataForPage);
  }, [page, rowsPerPage, data, approvalStatus]);





  return (
    <>
      <Helmet>
        <title>Best Offers | Affworld</title>
      </Helmet>
      <Button
        variant="contained"
        color="primary"
        onClick={exportData}
        style={{ margin: "8px" }}
      >
        Export to Excel
      </Button>
      
      

      <Box style={{margin:"10px", color:"grey", fontWeight:"bold"}}>
  Total number of approved offers: {approvedCount}
</Box>

      <TableContainer component={Paper}>
        <Table id="offers-table" sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Offers</TableCell>
              <TableCell align="center">Approval Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              pageData?.length > 0 ? (
                pageData.map((row,index) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="td" scope="row">{row.name}</TableCell>
                    <TableCell align="center">
                    Approved
                    </TableCell>
                    <TableCell align="center">
                    <Button
        key={row._id}
        onClick={() => handleClick(row)}
        disabled={buttonStates[row._id] === 'Pending'}
        variant="contained"
        style={{ fontWeight: 700, marginBottom: '10px' }}
      >
        {row?.type === 'Private' ? (buttonStates[row._id]==="Approved" ? (copied ? 'Copied' : 'Copy Link') : buttonStates[row._id]==="Disapproved" ? 'Rejected' :buttonStates[row._id]==="Pending"? 'Pending': 'Get Approval') : (copied ? 'Copied' : 'Copy Link')  }
      </Button>
</TableCell>


                    
                  </TableRow>
                ))
              ) : null
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <LinearProgress />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={approvedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>


      <Modal onClose={() => setIsPayoutVal(false)} open={isPayoutVal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'white', boxShadow: 24, p: 2, borderRadius: '8px', width: '90%' }}>
          <Table >
            <TableHead>
              <TableRow>
                <TableCell className='text-center'>Reg</TableCell>
                <TableCell className='text-center'>Ftd</TableCell>
                <TableCell className='text-center'>deposite</TableCell>
                <TableCell className='text-center'>Deposite</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow style={{ backgroundColor: '#f2f2f2' }}>
                <TableCell className='text-center' >{payoutVal?.reg ? payoutVal?.reg : "N/A"}</TableCell>
                <TableCell className='text-center' >{payoutVal?.ftd ? payoutVal?.ftd : "N/A"}</TableCell>
                <TableCell className='text-center' >{payoutVal?.deposit ? payoutVal?.deposit : "N/A"}</TableCell>
                <TableCell className='text-center' >{payoutVal?.Deposit ? payoutVal?.Deposit : "N/A"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Modal>





    </>
  );
};

export default Campaign;