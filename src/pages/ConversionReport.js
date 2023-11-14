import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  FormControlLabel,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Container,
  TableContainer,
  TablePagination,
  Paper,
  Checkbox
} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import { useAppContext } from "../context/ChatProvider";
import SideDrawer from "../components/SideDrawer";
import Loader from '../components/Loader';
import { getUserFromLocalStorage } from '../utils/localStorage';
import LinearProgress from '@mui/material/LinearProgress';




const ConversionReport = () => {
  const { user } = useAppContext() || {};
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('UPI');
  const [totalCount, setTotalCount] = useState(0);
  const [campaignNamesFetched, setCampaignNamesFetched] = useState(false);
  const user1 = getUserFromLocalStorage();
  const URL2 = process.env.REACT_APP_PROD_API;
  const URL= process.env.REACT_APP_PROD_ADMIN_API;
  const url = `${URL2}/api/analytics/wallet`;
  const url_payment = `${URL2}/api/analytics/transactions`;
  //const [userDataLoaded, setUserDataLoaded] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const accessToken = user1?.data.access_token;
  const [tableLoading, settableLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showApproved, setShowApproved] = useState(false);

  const rows = userData;
  const filteredRows = showApproved
    ? rows?.filter(row => row.approved === true)
    : rows?.filter(row => row.approved === false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const finalRef = React.useRef(null)
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const TableStickyHeader = () => {
    return (
      <TableRow style={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <TableCell className="affilate-deatils-all">Campaign Id</TableCell>
        <TableCell className="affilate-deatils-all">Campaign Name</TableCell>
        <TableCell className="affilate-deatils-all">Event</TableCell>
        <TableCell className="affilate-deatils-all">Amount</TableCell>
        <TableCell className="affilate-deatils-all">Approved</TableCell>
        <TableCell className="affilate-deatils-all">Initiated At</TableCell>
      </TableRow>
    );
  };
  const fetchData = async () => {
    try {
      // Replace with your actual access token
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      };

      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
      });
      console.log("response in finance page -->", response)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
      setData(jsonData[0]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };



  const fetchUserData = async () => {
    try {
      // Replace with your actual access token
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      };
      settableLoading(true);
      const response = await fetch(url_payment, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
      setUserData(jsonData);
      settableLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      settableLoading(false);
    }
  };

  const fetchCampaignName = async (campaignId) => {
    const campaignUrl = `${URL}/campaign/${campaignId}`;
    
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      };
      settableLoading(true);
      const response = await fetch(campaignUrl, {
        method: 'GET',
        headers: headers,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const jsonData = await response.json();
      console.log("JSONDATA:".jsonData);
      return jsonData?.name || "N/A"; 
      
    } catch (error) {
      console.error('Error fetching campaign name:', error);
      settableLoading(false);
      return "N/A"; // Return "N/A" in case of an error
      
    }
  };
  

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    fetchData();
    fetchUserData();
    
    
    
  }, []);
  useEffect(() => {
    // Fetch campaign names for each row
    if (userData && !campaignNamesFetched) {
      const fetchCampaignNames = async () => {
        const updatedRows = [...userData]; // Create a copy to avoid modifying the original data
      console.log("first userdata", userData);
      updatedRows.sort((a, b) => new Date(b.initiated_at) - new Date(a.initiated_at)); // Sort the data
      console.log("AFTER SORTING", updatedRows);
      
      for (const row of updatedRows) {
        const campaignName = await fetchCampaignName(row.campaign_id);
        row.campaignName = campaignName; // Update the row with the campaign name
      }
        setUserData(updatedRows);
        setCampaignNamesFetched(true);
        settableLoading(false);
      };
      fetchCampaignNames();
    }
  }, [userData,campaignNamesFetched]);
  



  if (loading) {
    return (
      <LinearProgress />
    )
  }


  return (
    <div style={{ width: "100%", padding: "0px 26px" }}>
      {user && <SideDrawer />}
     
      <Grid style={{ marginTop: "20px", padding: "5px", display: "flex", justifyContent: "space-evenly" }} minChildWidth={250} spacing={10}>

        <Box style={{
          display: "flex", justifyContent: "space-between", border: "1px solid green", borderRadius: "10px", backgroundColor: "#E6EDFA", width: "100%", height: "112vh", padding: "30px", overflowX: "auto", display: "inline-block", maxWidth: "100%"
        }}>
          <div style={{ fontSize: "10px", fontWeight: "700" }}>
            <h2>Payment History</h2>
            <Checkbox
              checked={showApproved}
              onChange={() => setShowApproved(!showApproved)}
            />
            <label>Show Approved</label>
            {tableLoading ? <Loader /> : (


              <TableContainer component={Paper} >
                <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                  <Table>
                    <TableHead>
                      <TableStickyHeader></TableStickyHeader>
                    </TableHead>
                    <TableBody>
                      {filteredRows?.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.campaign_id}</TableCell>
                          <TableCell>{row.campaignName}</TableCell>
                          <TableCell>{row.event}</TableCell>
                          <TableCell>{row.amount}</TableCell>
                          <TableCell>{row?.approved ? "Approved" : "Pending"}</TableCell>
                          <TableCell>
                            {new Date(row.initiated_at).toLocaleString(undefined, {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit',
                              fractionalSecondDigits: 3,
                              hour12: false,
                            })}
                          </TableCell>
                          {/* Add more cells for each column in your data */}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <TablePagination
                  rowsPerPageOptions={[10]}
                  component="div"
                  count={filteredRows?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>



            )}

          </div>
        </Box>

      </Grid>

    </div>

  )

}
export default ConversionReport