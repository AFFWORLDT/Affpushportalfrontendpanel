import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Typography,
  Grid,
  TextField,
  LinearProgress,
  Input,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { blue, red } from "@mui/material/colors";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import UnpublishedIcon from "@mui/icons-material/Unpublished";

import {
  getUserFromLocalStorage,
  getResFromLocalStorage,
} from "../utils/localStorage";
import ManagersTable from "./ManagersTable";
import Campaign from "./Campaign";
import account from "src/_mock/account";
import { Image } from "react-bootstrap";
import "./userStyle.css";
function UserDetails() {
  const useStyles = makeStyles((theme) => ({
    boxstyle: {
      color: `#7928CA`,
      fontSize: "40px",
      fontWeight: "bold",
      textAlign: "center",
    },
    boxstyleForm: {
      margin: "auto",
      border: "2px solid white",
      padding: "10px",
      borderRadius: "10px",
    },
    boxstyleForm1: {
      margin: "auto",
      display: "flex",
      alignItems: "left",
      justifyContent: "left",
      padding: "10px",
      borderRadius: "10px",
    },
    innerbox: {
      border: "0.5px solid gray",
      borderRadius: "10px",
      padding: "10px",
      width: "115px",
      marginLeft: "10px",
    },
    dabox: {
      border: "0.5px solid gray",
      borderRadius: "10px",
      padding: "10px",
      width: "240px",
      marginLeft: "10px",
    },
    textinBox: {
      marginLeft: "10px",
      fontWeight: "bold",
      marginTop: "10px",
      cursor: "pointer",
    },
  }));

  const classes = useStyles();
  const [data, setData] = useState([]);
  const [affiliateData, setAffiliateData] = useState([]);
  const [verificationSent, setVerificationSent] = useState(false);
  const URL = process.env.REACT_APP_PROD_ADMIN_API;
  const URL2 = process.env.REACT_APP_PROD_API;
  const urlVerifyMail = `${URL2}/api/affiliates/send_verification_mail`;
  const urlVerifyAfterMail = `${URL2}/api/affiliates/`;
  const [checkEmailVerifiedStatus, setCheckEmailVerifiedStatus] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const user2 = getUserFromLocalStorage();
  const accessToken = user2?.data.access_token;
  const [image, setImage] = useState(null);
  const [affiliate, setAffiliate] = useState();
  const [nameBeni, setNameBeni] = useState();
  const [last, setLast] = useState();
  const [username, setUserName] = useState();
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [postCode, setPostCode] = useState();
  const [skype, setSkype] = useState("");
  const [age, setAge] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const urlWallet = `${URL2}/api/analytics/wallet`;
  const [walletData, setWalletData] = useState([]);
  const [campaignData, setCampaignData] = useState();
  const [campaginName, setCampaginName] = useState("");

  const url = `${URL2}/api/analytics/clicks`;
  const url1 = `${URL2}/api/affiliates`;
  const url_image = `${URL2}/api/affiliates/update_profile_image`;
  const user1 = getResFromLocalStorage();
  const date = new Date(affiliateData.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3,
    hour12: false,
  });
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const sendVerificationEmail = async () => {
    // Make an API request to send the verification email.

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(urlVerifyMail, {
        method: "GET",
        mode: "cors",
        headers: headers,
      });
      console.log("RESPONSE:__", response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();

      setVerificationSent(true);

      console.log("RESPONSE:", jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const checkEmailVerified = async () => {
    // Make an API request to send the verification email.

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(urlVerifyAfterMail, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();

      setCheckEmailVerifiedStatus(jsonData?.verified);

      console.log("RESPONSE:", jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async () => {
    try {
      // Replace with your actual access token
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchCampaginDetails = async (id) => {
    if (!id) return;
    try {
      const campageinId = id;
      const url = `${URL}/campaign/${campageinId}`;
      const Camdata = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("this is campagin data -->", Camdata.data);
      setCampaignData(Camdata.data);
      setCampaginName(Camdata.data.name);
    } catch (error) {
      console.error("Error fetching CampaginData data:", error);
      toast.error("Error fetching CampaginData");
    }
  };
  const fetchAffiliateData = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(url1, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();

      setAffiliateData(jsonData);
      await fetchCampaginDetails(jsonData?.iframe_campaign_id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchWalletData = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch(urlWallet, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();

      setWalletData(jsonData[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchImage = async () => {
    try {
      if (!image) {
        toast.error("No image selected for upload.");
        return;
      }

      const formData = new FormData();
      formData.append("profile_image", image);

      const response = await axios.post(url_image, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        toast.success("Image uploaded successfully.");
      } else {
        toast.error("Error uploading image. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image. Please try again.");
    }
  };

  async function init() {
    try {
      setLoading(true);
      await fetchData();
      await fetchAffiliateData();
      await fetchWalletData();
      await fetchImage();
      await checkEmailVerified();
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0]; // Get the first selected image
    if (selectedImage) {
      const reader = new FileReader();

      reader.onload = (event) => {
        // Set the result of FileReader (image data) to the image state
        setImage(event.target.result);
      };

      reader.readAsDataURL(selectedImage); // Read the selected image
    }
    console.log(`selectedImage: ${selectedImage}`);
    console.log(`image: ${image}`);
  };

  useEffect(() => {
    if (data && data.length > 0) {
      // Calculate the total count when data changes
      const calculatedTotalCount = data.reduce(
        (acc, item) => acc + (item.count || 0),
        0
      );
      setTotalCount(calculatedTotalCount);
    }
  }, [data]);

  useEffect(() => {
    init();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      userId: user1?._id,
      affiliate,
      nameBeni,
      last,
      username,
      companyName,
      phoneNumber,
      address2,
      address1,
      age,
      skype,
      postCode,
      state,
      city,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/v1/userDetail/userDetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        toast.success("Form data submitted successfully!");
      } else {
        toast.error("Error submitting form data. Please try again.");
      }
    } catch (error) {
      toast.error("Error submitting form data. Please try again.");
    }
  };

  if (loading) {
    return <LinearProgress />;
  }

  const OverviewForm = () => {
    return (
      <Box
        style={{ maxWidth: "1200px", backgroundColor: "#EDF2F7" }}
        className={classes.boxstyleForm}
      >
        <form className="roleform" onSubmit={handleSubmit}>
          <Grid container spacing={3} mt={1}>
            <Grid item xs={6} md={3} display={"flex"} justifyContent={"center"}>
              <FormControl>
                <FormLabel htmlFor="account">Affiliate ID:</FormLabel>
                <TextField
                  type="number"
                  id="affiliate"
                  placeholder="Enter Affiliate ID"
                  min={0}
                  value={affiliate}
                  onChange={(event) => setAffiliate(event.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3} display={"flex"} justifyContent={"center"}>
              {" "}
              <FormControl>
                <FormLabel htmlFor="name">First Name:</FormLabel>
                <TextField
                  type="text"
                  id="name"
                  placeholder="Enter Name"
                  min={0}
                  value={nameBeni}
                  onChange={(event) => setNameBeni(event.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3} display={"flex"} justifyContent={"center"}>
              <FormControl>
                <FormLabel htmlFor="name">Last Name:</FormLabel>
                <TextField
                  type="text"
                  id="address"
                  placeholder="Last Name"
                  value={last}
                  onChange={(event) => setLast(event.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3} display={"flex"} justifyContent={"center"}>
              <FormControl>
                <FormLabel htmlFor="bankName">User Name:</FormLabel>
                <TextField
                  type="text"
                  id="username"
                  placeholder="Enter User Name"
                  value={username}
                  onChange={(event) => setUserName(event.target.value)}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={3} mt={1}>
            <Grid item xs={6} md={3} display={"flex"} justifyContent={"center"}>
              <FormControl>
                <FormLabel htmlFor="name">Company Name:</FormLabel>
                <TextField
                  type="text"
                  id="companyname"
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(event) => setCompanyName(event.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3} display={"flex"} justifyContent={"center"}>
              {" "}
              <FormControl>
                <FormLabel htmlFor="name">Address1:</FormLabel>
                <TextField
                  type="text"
                  id="address1"
                  placeholder="Address Line 1"
                  value={address1}
                  onChange={(event) => setAddress1(event.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3} display={"flex"} justifyContent={"center"}>
              <FormControl>
                <FormLabel htmlFor="name">Address2:</FormLabel>
                <TextField
                  type="text"
                  id="address2"
                  placeholder="Address Line 2"
                  value={address2}
                  onChange={(event) => setAddress2(event.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3} display={"flex"} justifyContent={"center"}>
              <FormControl>
                <FormLabel htmlFor="city">City:</FormLabel>
                <TextField
                  type="text"
                  id="city"
                  placeholder="City Name"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={3} mt={1}>
            <Grid item xs={6} md={3} display={"flex"} justifyContent={"center"}>
              <FormControl>
                <FormLabel htmlFor="state">State:</FormLabel>
                <TextField
                  type="text"
                  id="state"
                  placeholder="State"
                  value={state}
                  onChange={(event) => setState(event.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3} display={"flex"} justifyContent={"center"}>
              {" "}
              <FormControl>
                <FormLabel htmlFor="zipcode">Postcode:</FormLabel>
                <TextField
                  type="text"
                  id="postcode"
                  placeholder="Enter Post Code"
                  value={postCode}
                  onChange={(event) => setPostCode(event.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3} display={"flex"} justifyContent={"center"}>
              <FormControl>
                <FormLabel htmlFor="price">Skype ID:</FormLabel>
                <TextField
                  type="text"
                  placeholder="Enter Skype ID"
                  id="skype"
                  value={skype}
                  onChange={(event) => setSkype(event.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3} display={"flex"} justifyContent={"center"}>
              <FormControl>
                <FormLabel htmlFor="phone">Phone Number :</FormLabel>
                <TextField
                  type="number"
                  id="phonenumber"
                  placeholder="Enter Phone Number"
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={3} mt={1}>
            <Grid
              item
              xs={6}
              md={3}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <FormControl>
                <FormLabel htmlFor="age">Age (only 18+):</FormLabel>
                <TextField
                  type="number"
                  id="age"
                  placeholder="Your Age"
                  value={age}
                  onChange={(event) => setAge(event.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={6}
              md={3}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={sendVerificationEmail}
                className={classes.button + "  send-email-btn "}
                sx={{ padding: "10px 0", width: "218px", marginTop: "25px" }}
              >
                Send Verification Email
              </Button>
              {verificationSent && (
                <Typography style={{ marginLeft: "16px" }}>
                  Verification email sent!
                </Typography>
              )}
              {checkEmailVerifiedStatus && (
                <Typography style={{ marginLeft: "16px" }}>
                  User Already verified!
                </Typography>
              )}
            </Grid>
            <Grid
              item
              xs={6}
              md={3}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <FormControl>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="raised-button-file"
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="raised-button-file">
                  <Button
                    variant="contained"
                    component="span"
                    color="primary"
                    onClick={fetchImage}
                    sx={{
                      padding: "10px 0",
                      width: "218px",
                      marginTop: "25px",
                    }}
                    className="common-btn"
                  >
                    Upload Profile Image
                  </Button>
                </label>
                {image && (
                  <img
                    src={image}
                    alt="Preview"
                    style={{ width: "150px", height: "150px" }}
                  />
                )}
              </FormControl>
            </Grid>
            <Grid
              item
              xs={6}
              md={3}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button
                variant="contained"
                component="span"
                color="primary"
                onClick={handleSubmit}
                sx={{ padding: "10px 0", width: "218px", marginTop: "25px" }}
                className="common-btn"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    );
  };

  return (
    <>
      <Box>
        <Typography className={classes.boxstyle}> User Details </Typography>
      </Box>

      <Grid style={{ padding: "300", minChildWidth: "300", spacing: "5" }}>
        <Box
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: "1200px",
            backgroundColor: "#EDF2F7",
            flexWrap: "wrap",
            overflowX: "auto",
            overflowY: "auto",
            padding: " 20px 15px",
          }}
          className={classes.boxstyleForm1}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              md={2}
              bgcolor={"lightgray"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={5}
              className="upload-image-container"
            >
              <Box
                style={{
                  backgroundColor: blue[100],
                  borderRadius: "10px",
                  width: "135px", // display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "column",
                  height: "120px",
                  padding: "10px 19px",
                  display: "flex",
                  justifyContent: "space-evenly",
                  flexDirection: "column",
                  margin: "0px auto",
                  alignItems: "center",
                }}
              >
                {account.photoURL === "" ? (
                  <>
                    <Input type="file" onChange={handleImageChange} />
                    <Button
                      variant="contained"
                      component="span"
                      color="primary"
                      onClick={fetchImage}
                    >
                      {" "}
                      Upload
                    </Button>
                  </>
                ) : (
                  <Image src={account.photoURL} rounded />
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={10}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  md={6}
                  display={"flex"}
                  justifyContent={"center"}
                >
                  <Box
                    display={"flex"}
                    justifyContent={"space-evenly"}
                    flexWrap={"wrap"}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gapY: 2,
                      gapX: 4,
                    }}
                    className="basic-info-container"
                  >
                    <Box className="1">
                      <Typography fontWeight={400}>
                        {" "}
                        <AccountCircleIcon /> {user1.data.name} Active
                      </Typography>
                    </Box>
                    <Box className="2">
                      <Typography fontWeight={400}>
                        {" "}
                        <AddLocationIcon /> India
                      </Typography>
                    </Box>
                    <Box className="3">
                      <Box display="flex" alignItems="center">
                        <Typography fontWeight={400}>
                          {account.verified ? (
                            <VerifiedUserIcon style={{ color: "green" }} />
                          ) : (
                            <UnpublishedIcon style={{ color: "red" }} />
                          )}{" "}
                          <span style={{ whiteSpace: "nowrap" }}>
                            {user1.data.email}
                          </span>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} px={2} py={1}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      {" "}
                      <Button
                        style={{
                          backgroundColor: "blue",
                          color: "white",
                          width: "100%",
                          marginRight: "20px",
                          padding: "8px 3px",
                        }}
                      >{`MEMBER ${date}`}</Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Button
                        style={{
                          backgroundColor: "blue",
                          color: "white",
                          width: "100%",
                          padding: "18px 3px",
                        }}
                      >
                        {" "}
                        RESET PASSWORD{" "}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid
                    item
                    xs={6}
                    md={2}
                    display="flex"
                    justifyContent="center"
                  >
                    <Box className={classes.innerbox}>
                      <Box>
                        {walletData?.total_earnings
                          ? walletData?.total_earnings
                          : 0}
                      </Box>
                      <Box>
                        <Typography
                          style={{ color: "#4CAF50", fontWeight: "bold" }}
                        >
                          Earnings(INR)
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    md={2}
                    display="flex"
                    justifyContent="center"
                  >
                    <Box className={classes.innerbox}>
                      <Box>1</Box>
                      <Box>
                        <Typography
                          style={{ color: "#1976D2", fontWeight: "bold" }}
                        >
                          Offers
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    md={2}
                    display="flex"
                    justifyContent="center"
                  >
                    <Box className={classes.innerbox}>
                      <Box>{totalCount}</Box>
                      <Box>
                        <Typography
                          style={{ color: "#FFA000", fontWeight: "bold" }}
                        >
                          Clicks
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    md={2}
                    display="flex"
                    justifyContent="center"
                  >
                    <Box className={classes.innerbox}>
                      <Box>{affiliateData.level}</Box>
                      <Box>
                        <Typography
                          style={{ color: "#FFA000", fontWeight: "bold" }}
                        >
                          Level
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    display="flex"
                    justifyContent="center"
                  >
                    <Box className={classes.dabox}>
                      <Box>
                        {campaginName ? campaginName : "No Campaign Linked"}
                      </Box>
                      <Box>
                        <Typography
                          style={{ color: "#FFA000", fontWeight: "bold" }}
                        >
                          DA
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Box
              style={{
                display: "flex",
                marginTop: "15px",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
              }}
            >
              <Typography
                className={classes.textinBox}
                onClick={() => handleTabClick("overview")}
              >
                Overview
              </Typography>

              <Typography
                className={classes.textinBox}
                onClick={() => handleTabClick("managers")}
              >
                Managers
              </Typography>
              <Typography
                className={classes.textinBox}
                onClick={() => handleTabClick("campaign")}
              >
                Campaigns{" "}
              </Typography>
              <Typography className={classes.textinBox}>PostBacks</Typography>
              <Typography className={classes.textinBox}>Payouts</Typography>
              <Typography className={classes.textinBox}>Comapany</Typography>
              <Typography className={classes.textinBox}>Billing</Typography>
            </Box>
          </Grid>
        </Box>
      </Grid>

      {activeTab === "overview" && <OverviewForm />}

      {activeTab === "managers" && <ManagersTable />}
      {activeTab === "campaign" && <Campaign />}

      <ToastContainer />
    </>
  );
}

export default UserDetails;
