import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Typography,
    Grid,
    TextField,
    LinearProgress,
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddLocationIcon from '@mui/icons-material/AddLocation';
// import CheckCircleIcon from '@material-ui/icons/CheckCircle';


import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { blue } from '@mui/material/colors';
import { useAppContext } from "../context/ChatProvider";
import SideDrawer from "../components/SideDrawer";
import CircularProgress from '@mui/material/CircularProgress';

import { getUserFromLocalStorage, getResFromLocalStorage } from '../utils/localStorage';
import VerificationMail from './VerificationMail';
import verificationSent from './VerificationMail';





function UserDetails() {

    const useStyles = makeStyles((theme) => ({
        boxstyle: {
            color: `#7928CA`,
            fontSize: '40px',
            fontWeight: 'bold',
            textAlign: 'center',
        },
        boxstyleForm: {
            margin: 'auto',
            border: '2px solid white',
            padding: '10px',
            borderRadius: '10px',
        },
        boxstyleForm1: {
            margin: 'auto',
            display: 'flex',
            alignItems: 'left',
            justifyContent: 'left',
            padding: '10px',
            borderRadius: '10px',
        },
        innerbox: {
            border: '0.5px solid gray',
            borderRadius: '10px',
            padding: '10px',
            width: '115px',
            marginLeft: '10px',
        },
        dabox: {
            border: '0.5px solid gray',
            borderRadius: '10px',
            padding: '10px',
            width: '240px',
            marginLeft: '10px',
        },
        textinBox: {
            marginLeft: '10px',
            fontWeight: 'bold',
            marginTop: '10px',
            cursor: 'pointer',
        },
    }));

    const classes = useStyles();
    const { user } = useAppContext() || {};
    const [data, setData] = useState([]);
    const [affiliateData, setAffiliateData] = useState([]);
    const [verificationSent, setVerificationSent] = useState(false);
    const URL = process.env.REACT_APP_PROD_ADMIN_API;
    const URL2 = process.env.REACT_APP_PROD_API;
    const urlVerifyMail = `${URL2}/api/affiliates/send_verification_mail`;
    const urlVerifyAfterMail=`${URL2}/api/affiliates/`;
    const [checkEmailVerifiedStatus,setCheckEmailVerifiedStatus]=useState(false);
    const [loading, setLoading] = useState(false);
    const user2 = getUserFromLocalStorage();
    const accessToken = user2?.data.access_token;
    const [image, setImage] = useState(null);
    const [affiliate, setAffiliate] = useState();
    const [nameBeni, setNameBeni] = useState();
    const [last, setLast] = useState();
    const [username, setUserName] = useState();
    const [companyName, setCompanyName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [address1, setAddress1] = useState();
    const [address2, setAddress2] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [postCode, setPostCode] = useState();
    const [skype, setSkype] = useState('');
    const [age, setAge] = useState();
    const [totalCount, setTotalCount] = useState(0);
    const urlWallet = `${URL2}/api/analytics/wallet`;
    const [walletData, setWalletData] = useState([]);
    const [userDataLoaded, setUserDataLoaded] = useState(false);
    const [campaignData, setCampaignData] = useState();
    const [campageinId111, setCampageinId] = useState();
    const [campaginName, setCampaginName] = useState('');
    const [profile, setProfile] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);




    const url = `${URL2}/api/analytics/clicks`;
    const url1 = `${URL2}/api/affiliates`;
    const url_image = `${URL2}/api/affiliates/update_profile_image`;
    const user1 = getResFromLocalStorage();
    const date = new Date(affiliateData.created_at).toLocaleString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        fractionalSecondDigits: 3,
        hour12: false,
    })

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

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchCampaginDetails = async (id) => {
        if (!id) return;
        try {
            const campageinId = id;
            const url = `${URL}/campaign/${campageinId}`;
            const Camdata = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            console.log("this is campagin data -->", Camdata.data);
            setCampaignData(Camdata.data);
            setCampaginName(Camdata.data.name);


        } catch (error) {
            console.error('Error fetching CampaginData data:', error);
            toast.error('Error fetching CampaginData');
        }
    }
    const fetchAffiliateData = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            };
            const response = await fetch(url1, {
                method: 'GET',
                headers: headers,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const jsonData = await response.json();

            setAffiliateData(jsonData);
            await fetchCampaginDetails(jsonData?.iframe_campaign_id);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const fetchWalletData = async () => {
        try {
            // Replace with your actual access token
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            };

            const response = await fetch(urlWallet, {
                method: 'GET',
                headers: headers,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const jsonData = await response.json(); 

            setWalletData(jsonData[0]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchImage = async () => {
        try {
            if (!image) {
                toast.error('No image selected for upload.');
                return;
            }

            const formData = new FormData();
            formData.append('profile_image', image);

            const response = await axios.post(url_image, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (response.status === 200) {
                toast.success('Image uploaded successfully.');
            } else {
                toast.error('Error uploading image. Please try again.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Error uploading image. Please try again.');
        }
    };




    async function init() {
        try {
            setLoading(true);
            await fetchData();
            await fetchAffiliateData();
            await fetchWalletData();
            await fetchImage()
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }
    // await fetchImage()



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
            const calculatedTotalCount = data.reduce((acc, item) => acc + (item.count || 0), 0);
            setTotalCount(calculatedTotalCount);
        }
    }, [data]);

    useEffect(() => {
        init();
    }, []);




    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            userId: user?._id,
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

        console.log("User is :", user);

        try {
            const response = await fetch(`${process.env.REACT_APP_API}/api/v1/userDetail/userDetails`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                toast.success('Form data submitted successfully!');
            } else {
                toast.error('Error submitting form data. Please try again.');
            }
        } catch (error) {
            toast.error('Error submitting form data. Please try again.');
        }
    };

    if (loading) {
        return (
            <LinearProgress />
        )
    }










    return (
        <>
            {user && <SideDrawer />}
            <Box>
                <Typography className={classes.boxstyle}> User Details </Typography>
            </Box>
            <Grid style={{ padding: "300", minChildWidth: "300", spacing: "5" }}>
                <Box style={{ display: "flex", flexDirection: "column", maxWidth: "1200px", height: "250", backgroundColor: "#EDF2F7", flexWrap: "wrap", overflowX: "auto", overflowY: "auto" }} className={classes.boxstyleForm1}>
                    <Box width={"100%"} height={180} bg={"gray.100"} >
                        <Box style={{ display: "flex", flexDirection: "row", width: "95%", marginBottom: "7px", marginTop: "6px", height: 150 }} >
                            <Box style={{ backgroundColor: blue[100], borderRadius: "10px", height: "150px", width: "120px", padding: "1px" }}>

                                <Box>
                                    <input type="file" id="profileImage" accept="image/jpeg" onChange={handleFileChange} />

                                </Box>

                                <br />

                                <Box>

                                    <Button variant='contained' onClick={handleImageChange}>Upload Profile</Button>

                                </Box>
                            </Box>

                            <Box style={{ marginLeft: "10px", height: "150px", width: "100%" }} >
                                <Box h={"50%"} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                                    <Box display={"flex"} flexDirection={"column"}>
                                        <Box h={"50%"} >
                                            <Typography fontWeight={700}>{user1.data.name}</Typography>
                                        </Box>
                                        <Box display={"flex"} flexDirection={"row"} h={"50%"} alignItems="center">

                                            <Box display="flex" alignItems="center" marginRight="5px">
                                                <AccountCircleIcon style={{ cursor: "pointer" }} fontSize='small' />&nbsp;
                                            </Box>
                                            <Box display="flex" alignItems="center">
                                                <Typography fontWeight={400}>
                                                    Active
                                                </Typography>
                                            </Box>
                                            <Box display="flex" alignItems="center" marginRight="5px" marginLeft="40px">
                                                <AddLocationIcon style={{ cursor: "pointer" }} fontSize='small' />&nbsp;
                                            </Box>
                                            <Box display="flex" alignItems="center">
                                                <Typography fontWeight={400}>
                                                    India
                                                </Typography>
                                            </Box>
                                            <Box display="flex" alignItems="center" marginRight="5px" marginLeft="40px">
                                            {verificationSent ? (
        <CheckCircleIcon style={{ color: 'green' }} />
      ) : (
        <EmailIcon />)}
                                            </Box>
                                            <Box display="flex" alignItems="center">
                                                <Typography fontWeight={400}>
                                                    <span style={{ whiteSpace: 'nowrap' }}>{user1.data.email}</span>
                                                </Typography>
                                            </Box>



                                        </Box>
                                    </Box>
                                    <Box style={{ display: 'flex', flexDirection: "row", marginTop: "10px", width: "80%", height: "60%", marginBottom: "40px", marginLeft: "40px" }}>
                                        <Button style={{ backgroundColor: "blue", color: "white", width: "100%", marginRight: "20px" }}>{`MEMBER ${date}`}</Button>
                                        <Button style={{ backgroundColor: "blue", color: "white", width: "100%" }}> RESET PASSWORD</Button>
                                    </Box>
                                </Box>
                                <Box display={"flex"} flexDirection={"row"} h={"50%"} >
                                    <Box className={classes.innerbox}>
                                        <Box>
                                            {walletData?.total_earnings ? walletData?.total_earnings : 0}
                                        </Box>
                                        <Box>
                                            <Typography style={{ color: '#4CAF50', fontWeight: 'bold' }}>Earnings(INR)</Typography>
                                        </Box>
                                    </Box>
                                    <Box className={classes.innerbox}>
                                        <Box>
                                            1
                                        </Box>
                                        <Box>
                                            <Typography style={{ color: '#1976D2', fontWeight: 'bold' }}>Offers</Typography>
                                        </Box>
                                    </Box>

                                    <Box className={classes.innerbox}>
                                        <Box>
                                            {totalCount}
                                        </Box>
                                        <Box>
                                            <Typography style={{ color: '#FFA000', fontWeight: 'bold' }}>Clicks</Typography>
                                        </Box>
                                    </Box>
                                    <Box className={classes.innerbox}>
                                        <Box>
                                            1
                                        </Box>
                                        <Box>
                                            <Typography color={'#9C27B0'} fontWeight={"bold"}>Offers</Typography>
                                        </Box>
                                    </Box>
                                    <Box className={classes.dabox}>

                                        <Box>

                                            {
                                                campaginName ? (
                                                    campaginName
                                                ) :
                                                    (
                                                        "No Campaign Linked"
                                                    )
                                            }
                                        </Box>
                                        <Box>
                                            <Typography style={{ color: '#FFA000', fontWeight: 'bold' }}>DA</Typography>
                                        </Box>
                                    </Box>
                                    <Box className={classes.innerbox}>

                                        <Box>
                                            {affiliateData.level}
                                        </Box>
                                        <Box>
                                            <Typography style={{ color: '#FFA000', fontWeight: 'bold' }}>Level</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box style={{ display: "flex", marginTop: "15px", marginLeft: "10px" }}>
                        <Typography className={classes.textinBox} >Overview</Typography>
                        <Typography className={classes.textinBox}>Managers </Typography>
                        <Typography className={classes.textinBox}>Campaigns </Typography>
                        <Typography className={classes.textinBox}>PostBacks</Typography>
                        <Typography className={classes.textinBox}>Payouts</Typography>
                        <Typography className={classes.textinBox}>Comapany</Typography>
                        <Typography className={classes.textinBox}>Billing</Typography>
                    </Box>
                </Box>
            </Grid>
            <Box style={{ maxWidth: "1200px", backgroundColor: "#EDF2F7" }} className={classes.boxstyleForm}>
                <form className="roleform" onSubmit={handleSubmit}>
                    <Grid style={{ minChildWidth: "250", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                        <Box style={{ margin: "8px" }}>
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
                        </Box>
                        <Box style={{ margin: "8px" }}>
                            <FormControl>
                                <FormLabel htmlFor="name">First Name:</FormLabel>
                                <TextField
                                    type="string"
                                    id="name"
                                    placeholder="Enter Name"
                                    min={0}
                                    value={nameBeni}
                                    onChange={(event) => setNameBeni(event.target.value)}

                                />
                            </FormControl>
                        </Box>
                        <Box style={{ margin: "8px" }}>
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
                        </Box>
                        <Box style={{ margin: "8px" }}>
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
                        </Box>
                        <Box style={{ margin: "8px" }}>
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
                        </Box>
                        <Box style={{ margin: "8px" }}>
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
                        </Box>
                        <Box style={{ margin: "8px" }}>
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
                        </Box>
                        <Box style={{ margin: "8px" }}>
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
                        </Box>
                        <Box style={{ margin: "8px" }}>
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
                        </Box>
                        <Box style={{ margin: "8px" }}>
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
                        </Box>
                        <Box style={{ margin: "8px" }}>
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
                        </Box>
                        <Box style={{ margin: "8px" }}>
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
                        </Box>
                        <Box style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                            <Box style={{ margin: "8px" }}>
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
                        </Box>
                        <Box style={{ margin: "15px" }}>
                        <FormControl style={{ display: 'flex', flexDirection: 'row' }}>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
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
                                >
                                    Upload Profile Image
                                </Button>
                            </label>
                            {image && (
                                <img
                                    src={image}
                                    alt="Preview"
                                    style={{ width: '150px', height: '150px' }}
                                />
                            )}
                        </FormControl>
                </Box>
                <Box style={{ margin: "8px" }}>
                            <FormControl>
                                <VerificationMail/>
                            </FormControl>
                        </Box>
                            
                            
                                <Box style={{display:"flex",alignItems:"center",justifyContent:"center",margin:"8px"}}>
                                <Button style={{ variant: "contained", backgroundColor: "blue", color: "white", width: "50%", height: "50%", marginTop: "30px", marginLeft: "6px",display:"flex",justifyContent:"center",alignItems:"center" }} onClick={handleSubmit} type="submit">
                                Submit
                            </Button>
                                </Box>
                            
                                </Box>
                            
                            
                        
                    </Grid>
                </form>
            </Box >
            <ToastContainer />
        </>
    );
}

export default UserDetails;