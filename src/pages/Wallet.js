import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import "./Wallet.css";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

const ResponsiveBottomNavigation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.between("xs", "sm"));

  const [value, setValue] = useState(0);

    return (
        <>
            <Helmet>
                <title>Wallet Details | Affworld</title>
            </Helmet>
            <h1 className='text-center'>Your Wallet </h1>
            <div className='d-flex justify-content-between row  ' >

                <div className='col-md-4 mt-4'>

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

                <div className='col-md-4 mt-4' >

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

                <div className='col-md-4 mt-4'>


                    <Card sx={{ display: 'flex', width: "fit-content" }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    {
                                        loading ? <CircularProgress /> : (<>₹{totalRemainingBalance}</>)
                                    }
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Remaining Balance
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

                <div className='col-md-4 mt-4'>

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

                <div className='col-md-4 mt-4'>

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