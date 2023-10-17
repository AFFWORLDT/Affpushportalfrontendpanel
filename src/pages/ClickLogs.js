import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
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
import { v4 as uuidv4 } from 'uuid';
import { subDays, isAfter } from 'date-fns';
// import { DateRangePicker } from "react-date-range";
// import { DateRange } from 'react-date-range';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Loader from '../components/Loader';
import CustomDateRangePicker from './CustomDateRangePicker'; // Your custom date range picker
import axios from 'axios';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import PauseIcon from '@mui/icons-material/Pause';
import { fontWeight } from '@mui/system';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Import the Expired icon



const ClickLogs = () => {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [campaignNameData,setCampaignNameData]=useState("");
  const [campaignNames, setCampaignNames] = useState({});
  const [selectedOffer, setSelectedOffer] = useState('');
  const initialStartDate = new Date('2023-10-02'); // Set your desired initial start date
  const initialEndDate = new Date('2023-10-16'); // Set your desired initial end date 
  const [startDate, setStartDate] = useState(initialStartDate); // Set initial date if needed
  const [endDate, setEndDate] = useState(initialEndDate); // Set initial date if needed
  const [filteredData, setFilteredData] = useState(data); // State for filtered data
  const [pageData, setPageData] = useState([]);
  const user2 = getUserFromLocalStorage();
  const accessToken = user2?.data.access_token;
  const URL = process.env.REACT_APP_PROD_ADMIN_API;
  const URL2 = process.env.REACT_APP_PROD_API;
  const URL3=process.env.REACT_APP_PROD_ADMIN_API;
  const url1 = `${URL2}/api/analytics/clicks_and_postbacks`;
  const navigate = useNavigate();
  const res = getResFromLocalStorage();
  const user = getUserFromLocalStorage();
  const { copied, copyToClipboard } = useClipboard(); // Initialize useClipboard
  const options=Object.values(campaignNames);
  const validOptions = ["All Offers", ...options];
  
    
  const privateCheck = () => {
    const auth = localStorage.getItem('user');
    if (!auth) {
      navigate('/login');
    }
  };
  /* styles.css */
  const useStyles = makeStyles((theme) => ({
    datepicker: {
        color: `#333`,
        border: '1px solid #ccc',
        backgroundColor:'#fff',
        width: '200px',
    },
    borderDate:{
        border:'1px solid #E0E0E0'
    }
 
}));
const classes = useStyles();
const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleDateChange = (date, isStartDate) => {
    if (isStartDate) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    setSelectedOffer('');
    
  };
 
  
  const handleDateChangeAndFetch=()=>{
    fetchClickLogsData(startDate, endDate);
  }
//   const dateRangeProps = {
//     ranges: [selectedDateRange],
//     onChange: handleDateRangeChange,
//   };
  
const handleOfferSelect = (offer) => {
  // Check if the selected offer is a valid option
  if (validOptions.includes(offer)) {
    if (offer === "All Offers") {
        setSelectedOffer("");
      } else {
        setSelectedOffer(offer);
      }
    
    
  } else {
    console.log("Option selected is not valid");
    // Handle the case where the selected option is not valid
    // You can display an error message or take appropriate action.
  }
  }

  useEffect(() => {
    privateCheck();
    fetchClickLogsData(initialStartDate,initialEndDate);
    //fetchData();
  }, []); // Use an empty dependency array to run the effect only once

//   const fetchData = async () => {
//     try {
//       const result = await getData();
//       console.log("offers data -->", result);
//       setData(result);
//       setLoading(true);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
const fetchClickLogsData = async (startDate, endDate) => {
    try {

        if (!startDate || !endDate) {
            // Handle the case where startDate or endDate is not defined
            console.error('Start date or end date is not defined');
            return;
          }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      };
  
      const postData = {
        "start_time": startDate.toISOString(),
        "end_time": endDate.toISOString(),
        "campaign": "",
        "page": 1
      };
      setLoading(true);
      const response = await fetch(url1, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(postData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const jsonData = await response.json();
  
      setData(jsonData);
      console.log(`clickLogs Data for table Length: ${data.length}`);
      
  
      if (jsonData && jsonData.length > 0) {
        const names = {};
        for (const row of jsonData) {
          const name = await fetchCampaignName(row.campaign_id);
          names[row.campaign_id] = name;
        }
        setCampaignNames(names);
        
      }
  
      // After fetching data, apply filtering as needed and update filteredData state
      const updatedData = jsonData.filter(row => {
        console.log(`selectedOffer: ${selectedOffer}`)
        if(selectedOffer) {
          return (
            isAfter(new Date(row.timestamp), startDate) && 
            campaignNames[row?.campaign_id].includes(selectedOffer)
          );
        }
      
        return isAfter(new Date(row.timestamp), startDate);
      
      });
      setFilteredData(updatedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };
  

const fetchCampaignName = async (campaignID) => {
    try {
      const url2 = `${URL3}/campaign/${campaignID}?campaign_id=${campaignID}`;
      const response = await fetch(url2, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
      return jsonData.name;
    } catch (error) {
      console.error('Error fetching campaign name:', error);
      return '';
    }
  };

  const exportData = () => {


    const fileName = 'clciklogs.xlsx';
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
        
        
          rowData.push(cell.innerText);
        
      });

      tabledata.push(rowData);
    });

    const ws = XLSX.utils.aoa_to_sheet(tabledata);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName);
  };

  useEffect(() => {
    // Any code that depends on the updated selectedOffer should be placed here
    // For example, you can call a function or log the updated selectedOffer.
  
    console.log("Selected Offer has been updated:", selectedOffer);
  
    // Fetch click logs data when selectedOffer changes
    fetchClickLogsData(startDate, endDate);
  
  }, [selectedOffer]);

  useEffect(() => {
    const startIndex = page * rowsPerPage;
    const dataForPage = filteredData.slice(startIndex, startIndex + rowsPerPage);
    setPageData(dataForPage);
  }, [page, rowsPerPage, filteredData]);


  return (
    <>
      <Helmet>
        <title>Click Logs | Affworld</title>
      </Helmet>
      {/* <DateRange {...dateRangeProps} /> */}
      <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginBottom:"10px"}}>
      
  <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",padding:"4px",alignItems:"end"}} className={classes.borderDate}>
  <div style={{marginRight:"6px"}}>
    <p style={{fontWeight:"bold"}}>Start Date</p>
    <DatePicker
  selected={startDate}
  onChange={(date) => handleDateChange(date, true)}
  className={classes.datepicker}
/>

  </div>
  <div>
    <p style={{fontWeight:"bold"}}>End Date</p>
    <DatePicker
  selected={endDate}
  onChange={(date) => handleDateChange(date, false)}
  className={classes.datepicker}
/>
  </div>
  <div>
 <Button
  variant="contained"
  color="primary"
  style={{backgroundColor:"green", marginLeft:"6px"}}
  onClick={handleDateChangeAndFetch}
  >
    Fetch Logs
  </Button>
 </div>
  </div>
  <div style={{marginTop:"10px"}}>
  <select style={{width:"200px"}} value={selectedOffer} onChange={(e) => handleOfferSelect(e.target.value)}>
  
  {validOptions.map(row => (
    <option key={uuidv4()} value={row}>{row}</option>  
  ))}
</select>
  </div>
  

<div>
<Button
                variant="contained"
                color="primary"
                onClick={exportData}
                style={{ margin: "8px" }}
            >
                Download Click Logs
            </Button>
</div>

                    
      </div>
      
      {loading? <Loader/>:(<TableContainer component={Paper}>
        <Table id="offers-table" sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Time</TableCell>
              <TableCell align="center">Click ID</TableCell>
              <TableCell align="center">Offer</TableCell>
              <TableCell align="center">IP</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <LinearProgress />
                </TableCell>
              </TableRow>
            ):(
                pageData?.length > 0 ? (
                    pageData.map((eachRow) => (
                  <TableRow
                    key={uuidv4()}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="td" scope="row">{new Date(eachRow?.timestamp).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    })}</TableCell>
                    <TableCell align="center">{eachRow?.click_id}</TableCell>
                    <TableCell align="center">{campaignNames[eachRow?.campaign_id]}</TableCell>
                    <TableCell align="center">{eachRow?.client_addr}</TableCell>
                  </TableRow>
                ))
              ) : null
            ) }
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>)}

      

    </>
  );
};

export default ClickLogs;  