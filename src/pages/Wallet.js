import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { Button } from '@mui/material';
import totalbill from "../images/total-bill.avif";
import totalAddedPhoto from "../images/totalAddedBalance.avif";
import totalRemainingPhoto from "../images/remainingbalance.jpg";
import addbalance from "../images/addbalance2.jpg";
import balanceStatement from "../images/statements.avif";
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from 'src/service/localStorage';
import { FormControl } from '@mui/material';

import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Select } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import LinearProgress from '@mui/material/LinearProgress';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import PauseIcon from '@mui/icons-material/Pause';
import QrPayment from "../images/laxmikant_fedral.jpeg";
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';








const Wallet = () => {
    const theme = useTheme();
    const URL = process.env.REACT_APP_PROD_API;
    const user = getUserFromLocalStorage();
    const accessToken = user?.data?.access_token;
    const [totalBill, setTotalBill] = useState(0);
    const [totalAddedBalance, setTotalAddedBalance] = useState(0);
    const [totalRemainingBalance, setTotalRemainingBalance] = useState(0);
    const [balanceStateMents, setBalanceStateMents] = useState([]);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    const [pageData, setPageData] = useState([]);
    const [amount, setAmount] = useState(0);
    const [orderId, setOrderId] = useState("");

    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);

    const handleShow = () => setShow(true);
    const handleShow1 = () => setShow1(true);



    const addbalanceToWallet = async () => {
        try {
            const url = `${URL}/api/wallet/add-balance`;
            const data = {
                amount: amount,
                order_id: orderId
            }

            const res = await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                }
            })

            console.log("Add Balance -->", res?.data);

            if (res.status === 200) {
                toast.success(res?.data?.message);
                setAmount(0);
                setOrderId("");
                handleClose1();
            }


        } catch (error) {
            console.log("Error While Adding Balance -->", error);
            toast.error("Error While Adding Balance !!");

        }
    }



    const getTotalBill = async () => {
        try {
            setLoading(true);
            const url = `${URL}/api/wallet/get-total-bill`;
            // console.log("Access token ", accessToken);

            const res = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                }
            })

            // console.log("Total Bill -->", res?.data);
            setTotalBill(Number(res?.data.toFixed(2)));
            setLoading(false);


        } catch (error) {
            console.log("Error While Getting Total Bill -->", error);
            toast.error("Error While Getting Total Bill !!");

        }
    }

    const getlBalanceStatements = async () => {
        try {
            setLoading(true);
            const url = `${URL}/api/wallet/balance-statements`;
            // console.log("Access token ", accessToken);

            const res = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                }
            })

            // console.log("Balance Statements -->", res?.data);
            setBalanceStateMents(res?.data);
            setLoading(false);

        } catch (error) {
            console.log("Error While Statements  -->", error);
            toast.error("Error While Statements !!");

        }
    }

    const getTotalAddedBalance = async () => {
        try {
            setLoading(true);
            const url = `${URL}/api/wallet/total-added-balance`;
            // console.log("Access token ", accessToken);

            const res = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                }
            })

            // console.log("Total Added Balance -->", res?.data);
            setTotalAddedBalance(Number(res?.data?.total_added_balance?.toFixed(2)));
            setLoading(false);

        } catch (error) {
            console.log("Error While Getting Total Added Balance -->", error);
            toast.error("Error While Getting Total Added Balance !!");

        }
    }

    const getTotalRemainingBalance = async () => {
        try {
            setLoading(true);
            const url = `${URL}/api/wallet/total-remaining-balance`;
            // console.log("Access token ", accessToken);

            const res = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                }
            })

            // console.log("Total Remaining Balance -->", res?.data);
            setTotalRemainingBalance(Number(res?.data?.total_remaining_balance?.toFixed(2)));
            setLoading(false);

        } catch (error) {
            console.log("Error While Getting Total Remaining Balance -->", error);
            toast.error("Error While Getting Total Remaining Balance !!");

        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };



    useEffect(() => {
        getTotalAddedBalance();
        getTotalBill();
        getTotalRemainingBalance();
        getlBalanceStatements();
    }, []);

    useEffect(() => {
        const startIndex = page * rowsPerPage;
        const dataForPage = balanceStateMents?.slice(startIndex, startIndex + rowsPerPage);
        setPageData(dataForPage);
    }, [page, rowsPerPage, balanceStateMents]);



    return (
        <>
            <Helmet>
                <title>Wallet Details | Affworld</title>
            </Helmet>

            <div className='d-flex justify-content-between row  ' >

                <div className=' col-md-3 mt-4'>

                    <Card sx={{ display: 'flex', width: "fit-content" }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    {
                                        loading ? <CircularProgress /> : (<>₹{totalBill}</>)
                                    }

                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Your Total Bill
                                </Typography>
                            </CardContent>
                            <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", pl: 1, pb: 1 }}>
                                <Button variant="contained" onClick={getTotalBill}  >Refresh</Button>
                            </Box>
                        </Box>
                        <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image={totalbill}
                            alt="Your Total Bill"
                        />
                    </Card>
                </div>

                <div className=' col-md-3 mt-4' >

                    <Card sx={{ display: 'flex', width: "fit-content" }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    {
                                        loading ? <CircularProgress /> : (<>₹{totalAddedBalance}</>)
                                    }
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Added Balance
                                </Typography>
                            </CardContent>
                            <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", pl: 1, pb: 1 }}>
                                <Button variant="contained" onClick={getTotalAddedBalance} >Refresh</Button>
                            </Box>
                        </Box>
                        <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image={totalAddedPhoto}
                            alt="Your total Balance"
                        />
                    </Card>

                </div>

                <div className='col-md-3 mt-4'>


                    <Card sx={{ display: 'flex', width: "fit-content" }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    {
                                        loading ? <CircularProgress /> : (<>₹{totalRemainingBalance}</>)
                                    }
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Remaining Bal.
                                </Typography>
                            </CardContent>
                            <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", pl: 1, pb: 1 }}>
                                <Button variant="contained" onClick={getTotalRemainingBalance}  >Refresh</Button>
                            </Box>
                        </Box>
                        <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image={totalRemainingPhoto}
                            alt="Remaining Balance"
                        />
                    </Card>
                </div>

                <div className='col-md-3 mt-4'>

                    <Card sx={{ display: 'flex', width: "fit-content" }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    {
                                        loading ? <CircularProgress /> : (<>₹{totalBill}</>)
                                    }

                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Bank Statements
                                </Typography>
                            </CardContent>
                            <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", pl: 1, pb: 1 }}>
                                <Button variant="contained" onClick={handleShow}  >Get Statement</Button>
                            </Box>
                        </Box>
                        <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image={balanceStatement}
                            alt="Your Statements"
                        />
                    </Card>
                </div>

                <div className='col-md-3 mt-4'>

                    <Card sx={{ display: 'flex', width: "fit-content" }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    Min ₹50
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Add More Balance
                                </Typography>
                            </CardContent>
                            <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", pl: 1, pb: 1 }}>
                                <Button variant="contained" color="success" onClick={handleShow1} >Add Balance</Button>
                            </Box>
                        </Box>
                        <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image={addbalance}
                            alt="Add Baalnce "
                        />
                    </Card>
                </div>

            </div>

            <Modal show={show} onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >
                <Modal.Header closeButton>
                    <Modal.Title>Bank Statements</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <TableContainer component={Paper}>
                        <Table id="offers-table" sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" >Affiliate Name</TableCell>
                                    <TableCell align="center">Amount</TableCell>
                                    <TableCell align="center">Order Id</TableCell>
                                    <TableCell align="center">Verified</TableCell>
                                    <TableCell align="center">Time</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    pageData?.length > 0 ? (
                                        pageData.map((row) => (
                                            <TableRow
                                                key={row.affiliate_id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center" component="td" scope="row">{row.affiliate_name}</TableCell>
                                                <TableCell align="center">{row?.amount}</TableCell>

                                                <TableCell align="center">{row?.order_id}</TableCell>

                                                <TableCell align="center">{
                                                    row?.verified === true ? <CloudDoneIcon sx={{ color: "green" }} /> : <PauseIcon sx={{ color: "red" }} />}</TableCell>
                                                <TableCell align="center">{row?.timestamp}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <h3>No Statements Available!!</h3>
                                    )
                                }
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 50, 100]}
                            component="div"
                            count={balanceStateMents?.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>




                </Modal.Body>
                <Modal.Footer>
                    <Button variant="contained" color='error' onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>


            <Modal show={show1} onHide={handleClose1}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{ marginTop: '2%' }}
            >


                <Modal.Body>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img className='mt-3' src={QrPayment} alt="QR Code" style={{ width: '40%' }} />

                        </div>
                        <h3 className='text-center' >Minimum Amount Rs.50</h3>
                        <h5 className='text-center' style={{ color: '#6E7A83' }}  >
                            Once you paid the amount enter below utr number and amount and submit the details in 5-10 minutes balance will be added
                        </h5>

                        <form>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: 'auto',

                            }} >

                                <FormControl fullWidth sx={{ marginBottom: 2, width: '50%' }}>
                                    <TextField
                                        // sx={{ width: '50%' }}
                                        variant="outlined"
                                        value={amount}
                                        placeholder='Enter Amount'
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl fullWidth sx={{ marginBottom: 2, width: '50%' }}>
                                    <TextField
                                        // sx={{ width: '50%' }}
                                        id="outlined-basic"
                                        label="Enter UTR"
                                        variant="outlined"
                                        value={orderId}
                                        onChange={(e) => setOrderId(e.target.value)}
                                    />
                                </FormControl>
                                <Button variant='contained' color='success' onClick={addbalanceToWallet}>Send Deatils</Button>

                            </div>
                        </form>
                    </div>




                </Modal.Body >
                <Modal.Footer>
                    <Button variant="contained" color='error' onClick={handleClose1}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal >

        </>
    )
}

export default Wallet