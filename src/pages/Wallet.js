import React, { useEffect, useState } from "react";

import { Grid, Typography } from "@mui/material";
import "./wallet.css";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import MoneyOutlinedIcon from "@mui/icons-material/MoneyOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";

import Box from "@mui/material/Box";

import { useTheme } from "@mui/material/styles";
import { Button } from "@mui/material";
import totalbill from "../images/total-bill.avif";
import totalAddedPhoto from "../images/totalAddedBalance.avif";
import totalRemainingPhoto from "../images/remainingbalance.jpg";
import addbalance from "../images/addbalance2.jpg";
import balanceStatement from "../images/statements.avif";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "src/service/localStorage";
import { FormControl } from "@mui/material";

import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { Select } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import LinearProgress from "@mui/material/LinearProgress";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import PauseIcon from "@mui/icons-material/Pause";
import QrPayment from "../images/laxmikant_fedral.jpeg";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import account from "src/_mock/account";
import { borderRadius } from "@mui/system";

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
        order_id: orderId,
      };

      const res = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

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
  };

  const getTotalBill = async () => {
    try {
      setLoading(true);
      const url = `${URL}/api/wallet/get-total-bill`;
      // console.log("Access token ", accessToken);

      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // console.log("Total Bill -->", res?.data);
      setTotalBill(Number(res?.data.toFixed(2)));
      setLoading(false);
    } catch (error) {
      console.log("Error While Getting Total Bill -->", error);
      toast.error("Error While Getting Total Bill !!");
    }
  };

  const getlBalanceStatements = async () => {
    try {
      setLoading(true);
      const url = `${URL}/api/wallet/balance-statements`;
      // console.log("Access token ", accessToken);

      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // console.log("Balance Statements -->", res?.data);
      setBalanceStateMents(res?.data);
      setLoading(false);
    } catch (error) {
      console.log("Error While Statements  -->", error);
      toast.error("Error While Statements !!");
    }
  };

  const getTotalAddedBalance = async () => {
    try {
      setLoading(true);
      const url = `${URL}/api/wallet/total-added-balance`;
      // console.log("Access token ", accessToken);

      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // console.log("Total Added Balance -->", res?.data);
      setTotalAddedBalance(Number(res?.data?.total_added_balance?.toFixed(2)));
      setLoading(false);
    } catch (error) {
      console.log("Error While Getting Total Added Balance -->", error);
      toast.error("Error While Getting Total Added Balance !!");
    }
  };

  const getTotalRemainingBalance = async () => {
    try {
      setLoading(true);
      const url = `${URL}/api/wallet/total-remaining-balance`;
      // console.log("Access token ", accessToken);

      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // console.log("Total Remaining Balance -->", res?.data);
      setTotalRemainingBalance(
        Number(res?.data?.total_remaining_balance?.toFixed(2))
      );
      setLoading(false);
    } catch (error) {
      console.log("Error While Getting Total Remaining Balance -->", error);
      toast.error("Error While Getting Total Remaining Balance !!");
    }
  };

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
    const dataForPage = balanceStateMents?.slice(
      startIndex,
      startIndex + rowsPerPage
    );
    setPageData(dataForPage);
  }, [page, rowsPerPage, balanceStateMents]);

  const formatLocalDate = (timestamp) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
    };

    return new Date(timestamp).toLocaleDateString("en-IN", options);
  };

  return (
    <>
      <Box>
        <Grid container rowSpacing={{ xs: 2, sm: 2, md: 6 }}>
          <Grid item xs={12}>
            <Box className="wallet-bg-container ">
              <Box className="wallet-info-container">
                <Box>
                  <img
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "50%",
                    }}
                    src={account?.photoURL}
                    alt="userImg"
                  />
                </Box>
                <Box className="wallet-name">{account?.displayName}</Box>
                <Box className="wallet-email">{account?.email}</Box>
              </Box>
              <Box className="walet-id text-light">
                Wallet/@{account?.displayName.split(" ")[0]}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid container rowSpacing={{ xs: 1, sm: 2, md: 6 }}>
              <Grid item xs={6} md={4}>
                <Box
                  sx={{
                    [theme.breakpoints.up("xs")]: {
                      marginX: "auto",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px",
                      margin: "13px 8px",
                    },
                    [theme.breakpoints.up("md")]: {
                      backgroundColor: "#f0f0f0",
                      padding: "10px",
                      width: "240px",
                      margin: "0 auto",
                      borderRadius: "8px",
                      gap: "10px",
                    },
                  }}
                >
                  <ReceiptOutlinedIcon />
                  <Typography variant="subtitle1" color="">
                    {loading ? <CircularProgress /> : <>₹{totalBill}</>}
                  </Typography>
                  <Typography variant="" color="text.secondary">
                    Total Bill
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></Box>
                </Box>
              </Grid>
              <Grid item xs={6} md={4}>
                <Box
                  sx={{
                    [theme.breakpoints.up("xs")]: {
                      marginX: "auto",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px",
                      margin: "13px 8px",
                    },
                    [theme.breakpoints.up("md")]: {
                      backgroundColor: "#f0f0f0",
                      padding: "10px",
                      width: "240px",
                      margin: "0 auto",
                      borderRadius: "8px",
                      gap: "10px",
                    },
                  }}
                >
                  <MoneyOutlinedIcon />
                  <Typography variant="subtitle1" color="">
                    {loading ? <CircularProgress /> : <>₹{totalAddedBalance}</>}
                  </Typography>
                  <Typography variant="" color="text.secondary">
                    Added Balance
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></Box>
                </Box>
              </Grid>
              <Grid item xs={6} md={4}>
                <Box
                  sx={{
                    [theme.breakpoints.up("xs")]: {
                      marginX: "auto",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px",
                      margin: "13px 8px",
                    },
                    [theme.breakpoints.up("md")]: {
                      backgroundColor: "#f0f0f0",
                      padding: "10px",
                      width: "240px",
                      margin: "0 auto",
                      borderRadius: "8px",
                      gap: "10px",
                    },
                  }}
                >
                  <MonetizationOnOutlinedIcon />
                  <Typography variant="subtitle1" color="">
                    {loading ? (
                      <CircularProgress />
                    ) : (
                      <>₹{totalRemainingBalance}</>
                    )}
                  </Typography>
                  <Typography
                    variant=""
                    color="text.secondary"
                    className="text-center"
                  >
                    Balance
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></Box>
                </Box>
              </Grid>
              <Grid item xs={6} md={4}>
                <Box
                  sx={{
                    [theme.breakpoints.up("xs")]: {
                      marginX: "auto",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px",
                      margin: "13px 8px",
                    },
                    [theme.breakpoints.up("md")]: {
                      backgroundColor: "#f0f0f0",
                      padding: "10px",
                      width: "240px",
                      margin: "0 auto",
                      borderRadius: "8px",
                      gap: "10px",
                    },
                  }}
                >
                  <AccountBalanceOutlinedIcon />
                  <Typography variant="subtitle1" color="">
                    {loading ? <CircularProgress /> : <>₹{totalBill}</>}
                  </Typography>
                  <Typography
                    variant=""
                    color="text.secondary"
                    className="text-center"
                  >
                    Statements
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button variant="outlined" onClick={handleShow}>
                      Get Statement
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6} md={4}>
                <Box
                  sx={{
                    [theme.breakpoints.up("xs")]: {
                      marginX: "auto",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px",
                      margin: "13px 8px",
                    },
                    [theme.breakpoints.up("md")]: {
                      backgroundColor: "#f0f0f0",
                      padding: "10px",
                      width: "240px",
                      margin: "0 auto",
                      borderRadius: "8px",
                      gap: "10px",
                    },
                  }}
                >
                  <AccountBalanceWalletOutlinedIcon />
                  <Typography component="div" variant="subtitle1">
                    Min ₹50
                  </Typography>
                  <Typography
                    variant=""
                    color="text.secondary"
                    className=" text-center"
                  >
                    Add Balance
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={handleShow1}
                    >
                      Add Balance
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="mt-5"
      >
        <Modal.Header closeButton>
          <Modal.Title>Bank Statements</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TableContainer
            component={Paper}
            style={{ maxHeight: "300px", overflowY: "auto" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Affiliate Name</TableCell>
                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="center">Order ID</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pageData?.length > 0 ? (
                  pageData.map((row) => (
                    <TableRow
                      key={row.affiliate_id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center" component="td" scope="row">
                        {row.affiliate_name}
                      </TableCell>
                      <TableCell align="center">{row?.amount}</TableCell>
                      <TableCell align="center">{row?.order_id}</TableCell>
                      <TableCell align="center">
                        {row?.verified === true ? (
                          <CloudDoneIcon sx={{ color: "green" }} />
                        ) : (
                          <PauseIcon sx={{ color: "red" }} />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {formatLocalDate(row?.timestamp)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <h6>No Statements Available!!</h6>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box className="mt-2">
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              count={balanceStateMents?.length + 1}
              rowsPerPage={rowsPerPage}
              component={"center"}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" color="error" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={show1}
        onHide={handleClose1}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ marginTop: "2%" }}
      >
        <Modal.Body>
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                className="mt-3"
                src={QrPayment}
                alt="QR Code"
                style={{ width: "40%" }}
              />
            </div>
            <h3 className="text-center">Minimum Amount Rs.50</h3>
            <h5 className="text-center" style={{ color: "#6E7A83" }}>
              Once you paid the amount enter below utr number and amount and
              submit the details in 5-10 minutes balance will be added
            </h5>

            <form>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                <FormControl fullWidth sx={{ marginBottom: 2, width: "50%" }}>
                  <TextField
                    // sx={{ width: '50%' }}
                    variant="outlined"
                    value={amount}
                    placeholder="Enter Amount"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ marginBottom: 2, width: "50%" }}>
                  <TextField
                    // sx={{ width: '50%' }}
                    id="outlined-basic"
                    label="Enter UTR"
                    variant="outlined"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                  />
                </FormControl>
                <Button
                  variant="contained"
                  color="success"
                  onClick={addbalanceToWallet}
                >
                  Send Deatils
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" color="error" onClick={handleClose1}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Wallet;
