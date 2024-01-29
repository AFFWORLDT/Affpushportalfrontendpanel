import React, { useEffect, useState } from 'react'



import { Helmet } from 'react-helmet-async';
import { Button, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
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
import TextField from '@mui/material/TextField';

import CloseIcon from '@mui/icons-material/Close';
// import { fontWeight } from '@mui/system';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Import the Expired icon




const UpdatedSite = () => {
    const URL = process.env.REACT_APP_PROD_API;
    const user1 = getUserFromLocalStorage();
    const accessToken = user1?.data?.access_token;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    // const [newData, setNewData] = useState({});

    // const [name, setName] = useState('');
    // const [desc, setDesc] = useState('');
    // const [manager, setManager] = useState('');
    const [country, setCountry] = useState('');
    const [category, setCategory] = useState('');
    // const [description, setDescription] = useState('');
    // const [imageUrl, setImageUrl] = useState('');
    // const [statusCampagin, setStatusCampagin] = useState('');
    // const [advitisorData, setAdvitisorData] = useState([]);
    const [estivis, setEstivis] = useState('');
    const [audience_type, setAudience_type] = useState('');
    const [website_brief, setWebsite_brief] = useState('');
    const [website_tagline, setWebsite_tagline] = useState('');
    const [web_url, setweb_url] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleNameChange = (event) => setName(event.target.value);
    // const handleDescChange = (event) => setDesc(event.target.value);
    // const handleManagerChange = (event) => setManager(event.target.value);
    const handleCountryChange = (event) => setCountry(event.target.value);
    const handleCategoryChange = (event) => setCategory(event.target.value);
    // const handleDescriptionChange = (event) => setDescription(event.target.value);
    // const handleImageUrlChange = (event) => setImageUrl(event.target.value);
    // const handleStatusCampaginChange = (event) => setStatusCampagin(event.target.value);
    const handleEstivisChange = (event) => setEstivis(event.target.value);
    const handleAudience = (event) => setAudience_type(event.target.value);
    const handleWebsiteBrif = (event) => setWebsite_brief(event.target.value);
    const handleWebsiteTagLine = (event) => setWebsite_tagline(event.target.value);




    const updatedsiteList = async () => {

        try {
            setLoading(true);
            const url = `${URL}/api/affiliates/get_pns_site`;
            const res = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                }
            })

            console.log("this is data--->", res?.data);
            setData(res?.data);

            setLoading(false);


        } catch (error) {
            console.log("Error while Getting Updated URL--->", error);

        }



    }


    const handleEditButtonClick = (data) => {
        // Set the form input values based on the data received
        setweb_url(data.website_url);
        setName(data.website_name);
        setEstivis(data.estimate_visitors);
        setCategory(data.category);
        setCountry(data.geo);
        setAudience_type(data.audience_type);
        setWebsite_brief(data.website_brief);
        setWebsite_tagline(data.website_tagline);

        // Show the modal
        handleShow();
    };

    const handleUpdatedsiteList = async () => {
        try {
            const updatedData = {
                website_name: name,
                estimate_visitors: estivis,
                category: category,
                geo: country,
                audience_type: audience_type,
                website_tagline: website_tagline,
                website_brief: website_brief
            };

            const res = await axios.put(`${URL}/api/affiliates/update_pns_site?website_url=${web_url}`, updatedData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (res?.status === 200) {
                toast.success(res?.data?.message);
                updatedsiteList();
                handleClose();
                setName('');
                setEstivis('');
                setCategory('');
                setCountry('');
                setAudience_type('');
                setWebsite_brief('');
                setWebsite_tagline('');
            }
        } catch (error) {
            console.error("Error while updating site data--->", error);
        }
    };



    useEffect(() => {
        updatedsiteList();
    }, [])


    return (
        <div>
            <Helmet>
                <title> Manage AdSpace | Affworld </title>
            </Helmet>



            <TableContainer component={Paper}>
                <Table id="offers-table" sx={{ minWidth: 650 }} aria-label="simple table">

                    {loading ? <LinearProgress /> : (
                        <>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Web URL</TableCell>
                                    <TableCell align="center">Verified</TableCell>
                                    <TableCell align="center">Website Name</TableCell>
                                    <TableCell align="center">Estimate Visitors</TableCell>
                                    <TableCell align="center">Category</TableCell>

                                    <TableCell align="center">Geo</TableCell>
                                    <TableCell align="center">Audience type</TableCell>
                                    <TableCell align="center">Website Tagline</TableCell>
                                    <TableCell align="center">Website Brief</TableCell>
                                    <TableCell align="center">Time</TableCell>
                                    <TableCell align="center">Remarks </TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.length === 0 ? (
                                    <TableRow><TableCell align="center" colSpan={3}>No Data Found</TableCell></TableRow>
                                ) : (
                                    <>
                                        {data?.map((rowData) => (
                                            <TableRow key={rowData?.affiliate_id}>
                                                <TableCell align="center">{rowData?.website_url}</TableCell>
                                                <TableCell align="center">{rowData?.verified === true ? <CloudDoneIcon color="success" /> : <CloseIcon color="error" />}</TableCell>
                                                <TableCell align="center">{rowData?.website_name}</TableCell>
                                                <TableCell align="center">{rowData?.estimate_visitors}</TableCell>
                                                <TableCell align="center">{rowData?.category}</TableCell>
                                                <TableCell align="center">{rowData?.geo}</TableCell>
                                                <TableCell align="center">{rowData?.audience_type}</TableCell>
                                                <TableCell align="center">{rowData?.website_tagline}</TableCell>
                                                <TableCell align="center">{rowData?.website_brief}</TableCell>
                                                <TableCell align="center">{rowData?.timestamp}</TableCell>
                                                <TableCell align="center"> <Button variant='contained' onClick={() => handleEditButtonClick(rowData)}>Edit</Button></TableCell>


                                            </TableRow>
                                        ))}
                                    </>
                                )}
                            </TableBody>
                        </>
                    )}
                </Table>
            </TableContainer>


            <Modal show={show} onHide={handleClose} style={{ marginTop: '80px' }} >
                <Modal.Header closeButton>
                    <Modal.Title>+ Edit Site Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <TextField
                                fullWidth
                                placeholder="Enter Name"
                                variant="outlined"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </FormControl>

                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <TextField
                                fullWidth
                                placeholder="Enter Estimated visitors "
                                variant="outlined"
                                value={estivis}
                                onChange={handleEstivisChange}
                            />
                        </FormControl>


                        <FormControl fullWidth sx={{ marginBottom: 2 }}>

                            <TextField
                                fullWidth
                                placeholder="Enter Country "
                                variant="outlined"
                                value={country}
                                onChange={handleCountryChange}
                            />
                        </FormControl>

                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <InputLabel>Select Category</InputLabel>
                            <Select
                                value={category}
                                onChange={handleCategoryChange}
                                placeholder='Select Category'
                            >
                                <MenuItem value="technology">Technology</MenuItem>
                                <MenuItem value="news">News</MenuItem>
                                <MenuItem value="entertainment">Entertainment</MenuItem>
                                <MenuItem value="ecommerce">Ecommerce</MenuItem>
                                <MenuItem value="health">Health</MenuItem>
                                <MenuItem value="other">Other</MenuItem>

                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <TextField
                                fullWidth
                                placeholder="Enter Audience Type"
                                variant="outlined"
                                value={audience_type}
                                onChange={handleAudience}
                            />
                        </FormControl>

                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <TextField
                                fullWidth
                                placeholder="Enter Website Brif"
                                variant="outlined"
                                value={website_brief}
                                onChange={handleWebsiteBrif}
                            />
                        </FormControl>

                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <TextField
                                fullWidth
                                placeholder="Enter Website Tagline"
                                variant="outlined"
                                value={website_tagline}
                                onChange={handleWebsiteTagLine}
                            />
                        </FormControl>


                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="contained" color="error" onClick={handleClose}>
                        Close
                    </Button>
                    <Button sx={{ margin: "10px" }} variant="contained" color="success" onClick={handleUpdatedsiteList}>
                        Save Changes in List
                    </Button>
                </Modal.Footer>
            </Modal>





        </div>
    )
}

export default UpdatedSite