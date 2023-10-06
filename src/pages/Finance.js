import React, {useEffect,useState} from "react";
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


const Finance =()=>{
    const { user } = useAppContext() || {};
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('UPI');
    const [totalCount, setTotalCount] = useState(0);
    const user1 = getUserFromLocalStorage();
    const URL2 = process.env.REACT_APP_PROD_API;
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

    const rows=userData;
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
                            <TableRow style={{position:"sticky",top:0,zIndex: 1000}}>
                                        <TableCell className="affilate-deatils-all">Campaign Id</TableCell>
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
          console.log("response in finance page -->" ,response)
  
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
    
      const handlePageChange = (page) => {
        setCurrentPage(page);
      };      
      useEffect(() => {
        fetchData();
        fetchUserData();
      }, []);

      
    
      if (loading) {
        return <p>Loading data...</p>;
      }
      

    return(
        <div style={{width:"100%"}}>
            {user && <SideDrawer/>}
            <Typography style={{fontSize:"40px", fontWeight:"600",marginLeft:"50px",width:"fit-content"}}>Balances</Typography>
            <Grid style={{marginLeft:"50px",display:"flex",justifyContent:"space-evenly"}} minChildWidth={250} spacing={4}>
            <Grid container spacing={2}>
        {/* Adjusted layout using Grid */}
            <Grid item xs={12} md={4}>
                <Box style={{marginRight:"15px",display:"flex",justifyContent:"space-between",border:"2px solid gray",borderRadius:"10px",backgroundColor:"#E6EDFA",width:"100%",height:"25.5vh",padding:"30px"}}>
                    <div style={{fontSize:"10px",fontWeight:"700"}}>
                        <h2>RevShare</h2>
                        <h2 style={{fontSize: "30px",fontWeight:"bold"}}>{data.total_earnings}</h2>
                    </div>
                </Box>
            </Grid>
            <Grid item xs={12} md={4}>
                <Box style={{marginRight:"15px",display:"flex",justifyContent:"space-between",border:"2px solid orange",borderRadius:"10px",backgroundColor:"#E6EDFA",width:"100%",height:"25.5vh",padding:"30px"}}>
                    <div style={{fontSize:"10px",fontWeight:"700"}}>
                        <h2>In processing</h2>
                        <h2 style={{fontSize: "30px",fontWeight:"bold"}}>{data.unapproved_wallet}</h2>
                    </div>
                </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                <Box style={{marginRight:"8px",display:"flex",justifyContent:"space-between",border:"2px solid purple",borderRadius:"10px",backgroundColor:"#E6EDFA",width:"100%",height:"25.5vh",padding:"30px"}}>
                    <div style={{fontSize:"10px",fontWeight:"700"}}>
                        <h2>To the payment</h2>
                        <h2 style={{fontSize: "30px",fontWeight:"bold"}}>$1000.00</h2>
                    </div>
                </Box>
                </Grid>
            </Grid>
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Choose Payment Method</DialogTitle>
                <DialogContent>
                    <Typography>
                        Choose your payment method:
                    </Typography>
                    <FormControl component="fieldset">
            <RadioGroup name="payment options" defaultValue="UPI" onChange={handleRadioChange}>
              <Stack style={{fontWeight:"600",display:"flex",Direction:"column"}} spacing={3}>
                <FormControlLabel
                  value="UPI"
                  control={<Radio />}
                  label="UPI"
                  
                />
                <FormControlLabel
                  value="Astropay"
                  control={<Radio />}
                  label="Astropay"
                />
                <FormControlLabel
                  value="Bitcoin"
                  control={<Radio />}
                  label="Bitcoin"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio />}
                  label="Other"
                />
              </Stack>
            </RadioGroup>
          </FormControl>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} style={{color:"white",colorScheme:"blue",backgroundColor:"#1976D2"}}>
                    Close
                </Button>
                <Button onClick={handleClose} style={{color:"white",colorScheme:"whatsup",backgroundColor:"#25D366"}}>
                    Save
                </Button>
                </DialogActions>
            </Dialog>
           
            <Grid style={{marginTop:"20px",marginLeft:"50px",padding:"5px",display:"flex",justifyContent:"space-evenly",flexDirection:"row"}} minChildWidth={250} spacing={10}>
            <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
                <Box style={{display:"flex",justifyContent:"space-between",border:"1px solid green",borderRadius:"10px",backgroundColor:"#E6EDFA",width:"100%",height:"25.5vh",padding:"20px"}}>
                    <Box style={{fontSize:"10px",fontWeight:"700"}}>
                        <h2>Manual payment</h2>
                        
                        <h2 style={{marginTop: "8px",fontSize: "20px"}}>Payment is made within 3 days of order</h2>
                        
                        
                    </Box>
                    <Box style={{width:"30%"}}>
                        <Button style={{variant:"outlined",colorScheme:"purple",backgroundColor:"purple",color:"white"}} onClick={handleClickOpen} v w={200}>
                            Order Payment
                        </Button>
                    </Box>
                </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                <Box style={{marginRight:"8px",display:"flex",justifyContent:"space-between",border:"1px solid orange",borderRadius:"10px",backgroundColor:"#E6EDFA",width:"100%",height:"25.5vh",padding:"20px"}}>
                    <div style={{fontSize:"10px",fontWeight:"700"}}>
                        <h2>Autopay</h2>
                        <h2 style={{ marginTop: "8px", fontSize: "20px" }}>You haven't activated the autopay feature</h2>
                    </div>
                </Box>
                </Grid>
                </Grid>
            </Grid>
            <Grid style={{marginTop:"20px",marginLeft:"50px",padding:"5px",display:"flex",justifyContent:"space-evenly"}} minChildWidth={250} spacing={10}>
                
                <Box style={{marginRight:"15px",display:"flex",justifyContent:"space-between",border:"1px solid green",borderRadius:"10px",backgroundColor:"#E6EDFA",width:"100%",height:"112vh",padding:"30px",overflowX: "auto",display: "inline-block",maxWidth:"100%"}}>
                    <div style={{fontSize:"10px",fontWeight:"700"}}>
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
                                    <TableCell>{row.event}</TableCell>
                                    <TableCell>{row.amount}</TableCell>
                                    <TableCell>{row?.approved ? "Approved" :"Pending"}</TableCell>
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
export default Finance