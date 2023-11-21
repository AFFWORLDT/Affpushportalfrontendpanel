import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import account from 'src/_mock/account'
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/system';
import Modal from '@mui/material/Modal';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import PauseIcon from '@mui/icons-material/Pause';


const Chistory = () => {
  const affiliate_id = account.affiliate_id;
  const affiliate_name = account.displayName;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [apires, setApires] = useState([]);
  const URL = process.env.REACT_APP_PROD_FILINGSOLUTIONS_API;
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);




  const getJobData = async () => {
    try {
      // const url = `https://auto-api-affworld.vercel.app/api/particularjobs/${affiliate_id}`;
      const url = `${URL}/api/particularjobs/${affiliate_id}`;

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

  const handleApires = (apires) => {

    console.log("this is apires array--->", apires.apiResponse);


    setApires(apires.apiResponse);
    setIsOpen(true);
  }

  const handleChnageStatus = async (row) => {
    try {
      const url = `${URL}/api/toggle-job/${row?._id}`;
      const res = await axios.post(url);
      if (res.status === 200) {
        toast.success(`Status  of ${row?.name} has been changed successfully`, {
          position: toast.POSITION.TOP_CENTER,
        })
        getJobData();
      }
    } catch (error) {
      console.log("Error in changing status--->", error);
      toast.error("Error in changing status!!");
    }
  }

  // const handleDelete = async (row) => {


  //   try {
  //     const url = `${URL}/api/jobs/${row?._id}`;
  //     const res = await axios.delete(url);

  //     if (res.status === 200) {
  //       toast.success(`Job  of ${row?.name} has been deleted successfully`, {
  //         position: toast.POSITION.TOP_CENTER,
  //       })
  //     }
  //     getJobData();
  //   } catch (error) {
  //     console.log("Error in deleting--->", error);
  //     toast.error("Error in deleting!!");
  //   }
  // }

  const handleDelete = (row) => {
    setServiceToDelete(row);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const url = `${URL}/api/jobs/${serviceToDelete?._id}`;
      const res = await axios.delete(url);

      if (res.status === 200) {
        toast.success(`Job of ${serviceToDelete?.name} has been deleted successfully`, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      getJobData();
    } catch (error) {
      console.log("Error in deleting--->", error);
      toast.error("Error in deleting!!");
    } finally {
      setDeleteConfirmationOpen(false);
      setServiceToDelete(null);
    }
  };

  const formatMilliseconds = (milliseconds) => {
    const days = Math.floor(milliseconds / (24 * 60 * 60 * 1000));
    const hours = Math.floor((milliseconds % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((milliseconds % (60 * 60 * 1000)) / (60 * 1000));
  
    return `${days}d/${hours}h/${minutes}m`;
  };

  const totalCharges = data?.reduce((acc, item) => {
    return acc + (item?.totalCharges ?? 0);
  }, 0);



  useEffect(() => {
    getJobData()
  }, [affiliate_id])


  return (
    <div>
      <h1 className='text-center'> Campagin History </h1>
      <h2 className='text-center'> Welcome {affiliate_name} !! </h2>
      <h3>Total Charges : ₹{totalCharges}</h3>

      {loading ? (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      ) : (

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

              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={12} align="center">
                    <h1>No data found , Use Campagin Management to create..</h1>
                  </TableCell>
                </TableRow>
              ) :
                (

                  data.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="td" scope="row">{row.name}</TableCell>
                      <TableCell align="center">{row?.category === null ? "N/A" : row?.maxExecutions}</TableCell>
                      <TableCell align="center">
                        {row?.status === "active" ? (
                          <CloudDoneIcon style={{ color: '#32e620' }} />
                        ) : row?.status === "inactive" ? (
                          <PauseIcon style={{ color: '#FF0000' }} />
                        ) : null}
                        {"   "}
                        <span style={{ fontWeight: 700 }}>{row?.status} </span>
                      </TableCell>
                      <TableCell align="center">{formatMilliseconds(row?.timing)}</TableCell>
                      <TableCell align="center">{row?.executionCount}</TableCell>
                      <TableCell align="center">{row?.quantity}</TableCell>
                      <TableCell align="center">₹ {row?.totalCharges}</TableCell>
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
                      <TableCell align="center"><Button onClick={() => handleApires(row)} variant='contained' >View</Button></TableCell>
                      <TableCell align="center"><Button onClick={() => handleChnageStatus(row)} variant='contained' color='warning' >Change Status</Button></TableCell>
                      <TableCell align="center"><Button variant='contained' color='warning' >Modify</Button></TableCell>
                      <TableCell align="center">
                        <Button onClick={() => handleDelete(row)} variant='contained' color='error'>
                          Delete
                        </Button>
                      </TableCell>

                    </TableRow>
                  ))

                )



              }



            </TableBody>
          </Table>
        </TableContainer>

      )
      }

      <Modal onClose={() => setIsOpen(false)} open={isOpen}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'white', boxShadow: 24, p: 2, borderRadius: '8px', width: '60%' }}>
          <Typography variant="h6" align="center" gutterBottom>
            Api Response
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Order</TableCell>
                <TableCell>Time Stamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                apires?.length > 0 &&
                apires.map((item, index) => (
                  <TableRow
                    key={index}
                    style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }} // Alternating colors

                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item?.response?.order}</TableCell>
                    <TableCell>{item?.timestamp}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </Box>
      </Modal>

      <Modal onClose={() => setDeleteConfirmationOpen(false)} open={isDeleteConfirmationOpen}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'white', boxShadow: 24, p: 2, borderRadius: '8px', width: '60%' }}>
          <Typography variant="h6" align="center" gutterBottom>
            Confirm Deletion
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Are you sure you want to delete the service: {serviceToDelete?.name}?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button onClick={confirmDelete} variant='contained' color='error'>
              Yes
            </Button>
            <Button onClick={() => setDeleteConfirmationOpen(false)} variant='contained'>
              No
            </Button>
          </Box>
        </Box>
      </Modal>




    </div>
  )
}

export default Chistory