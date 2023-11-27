import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Typography,
    Grid,
    MenuItem,
} from '@mui/material';
import axios from 'axios';
import { getPaymentInfo } from "../service/api";
import { getUserFromLocalStorage } from "../service/localStorage";

import PaymentModal from "./modal/PaymentModal";

function PaymentDetails() {
    const user = getUserFromLocalStorage();

    const [account, setAccount] = useState('');
    const [nameBeni, setNameBeni] = useState('');
    const [bankName, setBankName] = useState('');
    const [BankAddress, setBankAddress] = useState('');
    const [beniAddress, setBeniAddress] = useState('');
    const [sortCode, setSortCode] = useState('');
    const [iBan, setIBan] = useState('');
    const [swift, setSwift] = useState('');
    const [accountType, setAccountType] = useState('');

    const [paymentInfo, setPaymentInfo] = useState(false);
    const [payment, setPayment] = useState([]);
    const [showAllProjects, setShowAllProjects] = useState(false);

    useEffect(() => {
        getSetPaymentInfo();
    }, []);

    const resetForm = () => {
        setAccount('');
        setNameBeni('');
        setBankName('');
        setBankAddress('');
        setBeniAddress('');
        setSortCode('');
        setAccountType('');
        setIBan('');
        setSwift('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const accessToken = user.data.access_token;

        const data = {
            account_number: account,
            beneficiary_name: nameBeni,
            bank_name: bankName,
            bank_address: BankAddress,
            beneficiary_address: beniAddress,
            sort_code: sortCode,
            iban: iBan,
            swift,
            account_type: accountType,
        };

        const url = `${process.env.REACT_APP_PROD_API}/api/affiliates/payment_info`;

        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 200) {
                toast.success('Payment Details saved successfully!');
                resetForm();
                await getPaymentInfo();
            }
        } catch (error) {
            console.log('Error in submitting data:', error);
            toast.error(error.response.data.detail);
        }
    };

    const getSetPaymentInfo = async () => {
        try {
            const res = await getPaymentInfo();

            if (res[0]) {
                setPaymentInfo(true);
            }
            setPayment(res);
        } catch (error) {
            console.log('Error while getting payment details:', error);
        }
    };

    const handlesavedpayment = async () => {
        setShowAllProjects(true);
    };

    const boxstyle = {
        background: 'linear-gradient(to left, #7928CA, #FF0080)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '4xl',
        fontWeight: 'extrabold',
        textAlign: 'center',
    };

    const boxstyleForm = {
        margin: 'auto',
        border: '2px solid white',
        padding: '10px',
        borderRadius: '20px',
    };

    return (
        <>
            <Box sx={boxstyle}>
                <Typography variant="h3">Payment Details</Typography>
            </Box>
            <Box
                maxWidth="1200px"
                sx={boxstyleForm}
                bgcolor="gray.100"
                className="labour-form"
            >
                <form className="roleform" onSubmit={handleSubmit}>
                    <Grid container spacing={2} p={4}>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="account">Account Number:</FormLabel>
                                <Input
                                    type="number"
                                    id="account"
                                    // placeholder="Enter Account Number"
                                    min={0}
                                    value={account}
                                    onChange={(event) => setAccount(event.target.value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="name">Beneficiary Name:</FormLabel>
                                <Input
                                    type="string"
                                    id="name"
                                    // placeholder="Enter Name"
                                    value={nameBeni}
                                    onChange={(event) => setNameBeni(event.target.value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="name">Beneficiary Address:</FormLabel>
                                <Input
                                    type="text"
                                    id="address"
                                    // placeholder="Enter Address"
                                    value={beniAddress}
                                    onChange={(event) => setBeniAddress(event.target.value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="bankName">Bank Name:</FormLabel>
                                <Input
                                    type="text"
                                    id="bankName"
                                    // placeholder="Enter Bank Name"
                                    value={bankName}
                                    onChange={(event) => setBankName(event.target.value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="BankAddress">Bank Address:</FormLabel>
                                <Input
                                    type="text"
                                    id="BankAddress"
                                    // placeholder="Enter Bank Address"
                                    value={BankAddress}
                                    onChange={(event) => setBankAddress(event.target.value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="name">Sort Code:</FormLabel>
                                <Input
                                    type="text"
                                    id="sort-code"
                                    // placeholder="Enter Sort Code"
                                    value={sortCode}
                                    onChange={(event) => setSortCode(event.target.value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="pin">IBAN:</FormLabel>
                                <Input
                                    type="number"
                                    id="iban"
                                    // placeholder="Enter IBAN"
                                    value={iBan}
                                    onChange={(event) => setIBan(event.target.value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="number">SWIFT:</FormLabel>
                                <Input
                                    type="text"
                                    id="swift"
                                    // placeholder="SWIFT"
                                    value={swift}
                                    onChange={(event) => setSwift(event.target.value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="name">Type of Account:</FormLabel>
                                <Select
                                    id="role"
                                    cursor="pointer"
                                    value={accountType}
                                    onChange={(e) => setAccountType(e.target.value)}
                                >
                                    <MenuItem value="">--Please select--</MenuItem>
                                    <MenuItem value="Current">Current Account</MenuItem>
                                    <MenuItem value="Saving">Saving Account</MenuItem>
                                    <MenuItem value="Salary">Salary Account</MenuItem>
                                    <MenuItem value="NRI">NRI Account</MenuItem>
                                </Select>
                            </FormControl>

                        </Grid>
                        {/* Continue adding other form fields */}
                    </Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handlesavedpayment}
                    style={{ marginTop: '1rem' }}
                >
                    Saved Details
                </Button>
            </Box>
            <PaymentModal
                showModal={showAllProjects}
                hideModal={() => setShowAllProjects(false)}
                projects={payment}
                projectInfo={paymentInfo}
            />
            <ToastContainer />
        </>
    );
}

export default PaymentDetails;
