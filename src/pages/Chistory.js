import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import account from 'src/_mock/account'
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/system';


const Chistory = () => {
  const affiliate_id = account.affiliate_id;
  const affiliate_name = account.displayName;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getJobData = async () => {
    try {
      const url = `https://auto-api-affworld.vercel.app/api/particularjobs/${affiliate_id}`;
      setLoading(true);
      const res = await axios.get(url);
      setData(res.data);
      setLoading(false);
      console.log(" this is jobs  data--->", res.data);


    } catch (error) {
      console.log("Erro In getting jobs data--->", error);
      toast.error("Error In getting jobs data!!");
    }
  }

  const handleClick = (link) => {

    if (link) {
      // Open the link in a new tab/window
      window.open(link, '_blank');
    } else {
      toast.warning("No link available for this item.");
    }
    
  }

  useEffect(() => {
    getJobData()
  }, [affiliate_id])


  return (
    <div>
      <h1 className='text-center'> Campagin History </h1>
      <h2 className='text-center'> Welcome {affiliate_name} !! </h2>

      {/* Table */}

      <TableContainer component={Paper}>
        <Table id="offers-table" sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Max Execution</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Timing</TableCell>
              <TableCell align="center">Execution Count</TableCell>
              <TableCell align="center">Quantity</TableCell>

              {/* <TableCell align="center">Service ID</TableCell> */}
              <TableCell align="center">Total Charges</TableCell>
              <TableCell align="center">Total Quantity</TableCell>
              <TableCell align="center">Link</TableCell>
              <TableCell align="center">Show Execution</TableCell>
              <TableCell align="center">Change Status </TableCell>
              <TableCell align="center">Modify</TableCell>
              <TableCell align="center">Delete</TableCell>





            </TableRow>
          </TableHead>
          <TableBody>
            {
              data?.length > 0 ? (
                data.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="td" scope="row">{row.name}</TableCell>
                    <TableCell align="center">{row?.category === null ? "N/A" : row?.maxExecutions}</TableCell>
                    <TableCell align="center">{row?.status}</TableCell>
                    <TableCell align="center">{row?.timing}</TableCell>
                    <TableCell align="center">{row?.executionCount}</TableCell>
                    <TableCell align="center">{row?.quantity}</TableCell>
                    {/* <TableCell align="center">{row?.serviceId}</TableCell> */}
                    <TableCell align="center">{row?.totalCharges}</TableCell>
                    <TableCell align="center">{row?.totalQuantity}</TableCell>





                    <TableCell align="center">
                      <Button
                        variant='contained'
                        color='success'
                        onClick={() => {
                          handleClick(row?.link);
                        }}
                      >
                        URL
                      </Button>
                    </TableCell>

                    <TableCell align="center"><Button variant='contained' >View</Button></TableCell>
                    <TableCell align="center"><Button variant='contained' color='warning' >Change Status</Button></TableCell>
                    <TableCell align="center"><Button variant='contained' color='warning' >Modify</Button></TableCell>
                    <TableCell align="center"><Button variant='contained' color='error' >Delete</Button></TableCell>


                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                    <LinearProgress />
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  )
}

export default Chistory