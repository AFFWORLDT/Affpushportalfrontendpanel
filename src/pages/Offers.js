import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button, Box } from '@mui/material';
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
import { fontWeight } from '@mui/system';

const Offers = () => {
  const URL = process.env.REACT_APP_PROD_ADMIN_API;
  const URL2 = process.env.REACT_APP_PROD_API;

  const navigate = useNavigate();
  const res = getResFromLocalStorage();
  const user = getUserFromLocalStorage();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { copied, copyToClipboard } = useClipboard(); // Initialize useClipboard

  const privateCheck = () => {
    const auth = localStorage.getItem('user');
    if (!auth) {
      navigate('/login');
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
    privateCheck();
    fetchData();
  }, []); // Use an empty dependency array to run the effect only once

  const fetchData = async () => {
    try {
      const result = await getData();
      console.log("offers data -->", result);
      setData(result);
      setLoading(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleIframe = async (row) => {
    try {
      const campageinId = row._id;
      console.log(campageinId);
      const url = `${URL2}/api/affiliates/set_on_iframe?campaign_id=${campageinId}`;
      console.log(url);
      const accessToken = user.data.access_token;
      console.log(accessToken);
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      console.log(response);
      if (response.status === 200) {
        toast.success("Iframe set successfully!!");
      }



    } catch (error) {
      console.log("Error While setting iframe-->", error);
      toast.error("Error While setting iframe!!");
    }
  }

  const handleCopyAff = (item) => {
    const link = `${URL}/${item?.code}?affiliate_id=${res.data.affiliate_id}`;
    console.log('Copy clicked');
    console.log('Link is -->', link);
    console.log('This is res --->', res);
    console.log('This is user affiliate id -----> :', res.data.affiliate_id);

    try {


      copy(link);

      toast.success('Link copied to clipboard', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (error) {
      console.error('Error copying link to clipboard:', error);
      toast.error('Error copying link to clipboard', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const exportData = () => {


    const fileName = 'Offers.xlsx';
    const table = document.getElementById('offers-table');
    const rows = table.querySelectorAll('tr');
    const tabledata = [];
    const headers = [];
    rows[0].querySelectorAll('th').forEach((header) => {
      headers.push(header.innerText);
    });
    tabledata.push(headers);
    rows.forEach((row, index) => {
      if (index === 0) {
        return; // Skip the header row
      }

      const rowData = [];
      const cells = row.querySelectorAll('td');


      console.log(`INDEX:  ${index}`)
      console.log(`DATA[0]:  ${data[0]}`)
      cells.forEach((cell, cellIndex) => {
        // If this is the action column, add a link
        if (cellIndex === 5) {

          const actionLink = `${URL}/${data[index - 1]?.code}?affiliate_id=${res.data.affiliate_id}`;

          rowData.push(actionLink);

        } else {
          rowData.push(cell.innerText);
        }
      });

      tabledata.push(rowData);
    });

    const ws = XLSX.utils.aoa_to_sheet(tabledata);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName);
  };






  return (
    <>
      <Helmet>
        <title>Best Offers | Affworld</title>
      </Helmet>
      <Button
        variant="contained"
        color="primary"
        onClick={exportData}
        style={{ margin: "8px" }}
      >
        Export to Excel
      </Button>

      <TableContainer component={Paper}>
        <Table id="offers-table" sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Offers</TableCell>
              <TableCell align="center">Categories</TableCell>
              <TableCell align="center">Payout</TableCell>
              <TableCell align="center">Metrics</TableCell>
              <TableCell align="center">Targeting</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Iframe</TableCell>
              <TableCell align="center">Action</TableCell>
              <TableCell align="center">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              data?.length > 0 ? (
                data.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="td" scope="row">{row.name}</TableCell>
                    <TableCell align="center">{row?.description}</TableCell>
                    <TableCell align="center">$20</TableCell>
                    <TableCell align="center">
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <span style={{ color: '#6E7A83' }}>CR</span>
                          &nbsp;&nbsp;&nbsp; <span>0%</span>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">India</TableCell>
                    <TableCell align="center">{row?.status == "active" ? <CloudDoneIcon style={{ color: '#32e620' }} /> : <PauseIcon style={{ color: '#FF0000' }} />}{"   "}<span style={{fontWeight: 700}}>{row?.status} </span></TableCell>


                    <TableCell align="center">
                      <Button variant="contained" onClick={() => handleIframe(row)}>
                        Link Iframe
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => {
                          handleCopyAff(row);
                        }}
                        variant="contained"
                        style={{ fontWeight: 700 }}
                      >
                        {copied ? 'Copied' : 'Copy Link'}
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => {
                          navigate('/affilate/detail-offer');
                        }}
                        variant="contained"
                        color="success"
                        style={{ fontWeight: 700 }}
                      >
                        More Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : null
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <LinearProgress />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

    </>
  );
};

export default Offers;