import React, { useEffect, useState } from 'react'



import { Helmet } from 'react-helmet-async';
import { Button, Box, Select, MenuItem, FormControl, InputLabel, Modal } from '@mui/material';
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
import axios from 'axios';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import PauseIcon from '@mui/icons-material/Pause';
import CloseIcon from '@mui/icons-material/Close';
// import { fontWeight } from '@mui/system';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Import the Expired icon




const UpdatedSite = () => {
    const URL = process.env.REACT_APP_PROD_API;
    const user1 = getUserFromLocalStorage();
    const accessToken = user1.data.access_token;
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);




    const updatedsiteList = async () => {

        try {
            setLoading(true);
            const url = `${URL}/api/affiliates/pns_site`;
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

    useEffect(() => {
        updatedsiteList();
    }, [])


    return (
        <div>



            <TableContainer component={Paper}>
                <Table id="offers-table" sx={{ minWidth: 650 }} aria-label="simple table">

                    {loading ? <LinearProgress /> : (
                        <>
                            <TableHead>
                                <TableRow>

                                    <TableCell align="center">Web URL</TableCell>
                                    <TableCell align="center">Verified</TableCell>
                                    <TableCell align="center">Time</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>


                                <TableRow>
                                    <TableCell align="center" >{data?.website_url}</TableCell>
                                    <TableCell align="center">{data?.verified === true ? <CloudDoneIcon color="success" />  : <CloseIcon color="error" />}</TableCell>

                                    <TableCell align="center">{data?.timestamp}</TableCell>


                                </TableRow>




                            </TableBody>


                        </>




                    )}



                </Table>

            </TableContainer>



        </div>
    )
}

export default UpdatedSite