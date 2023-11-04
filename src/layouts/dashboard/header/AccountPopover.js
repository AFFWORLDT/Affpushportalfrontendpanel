import React, { useEffect, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Divider, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import account from '../../../_mock/account';
import { getResFromLocalStorage , removeUserFromLocalStorage,getUserFromLocalStorage} from "../../../service/localStorage";
// import AvatorIcon from '../../../components/assets/User.png';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: "none",
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
};





// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const user1 = getResFromLocalStorage();
  const user2 = getUserFromLocalStorage();
  const accessToken = user2?.data.access_token;
  const URL2 = process.env.REACT_APP_PROD_API;
  const url1 = `${URL2}/api/affiliates`;
  const [affiliateData, setAffiliateData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleProfile = () => {
    console.log("Profile clicked")
  }

  const handleClick = () => {
    console.log("Finance clicked")
    navigate("/affilate/finance");
    handleClose1();
  }

  const handleClickEdit = () => {
    console.log("Edit clicked")
    navigate("/affilate/user/details");
    handleClose1();
  }

  const handleFinance = () => {
    console.log("Payment clicked")
    navigate("/affilate/payment/details");
    handleClose1();

  }

  const handleDynamicAds = () => {
    console.log("DynamicAds clicked")
    navigate("/affilate/dynamicAds");
    handleClose1();

  }

  const handleLogout = () => {
    console.log("Logout clicked");
    removeUserFromLocalStorage();
    toast.success("Logout successfully", {
      position: toast.POSITION.BOTTOM_RIGHT,
    })
    setTimeout(() => {
      navigate("/login");
      
    },1000)

    
  }

  const handleLogin  = () => {
    console.log("Login clicked")
    navigate("/login");
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
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
   
};

async function init() {
  try {
      setLoading(true);
      
      await fetchAffiliateData();
      
  } catch (error) {
      console.error('Error fetching data:', error);
  } finally {
      setLoading(false);
  }
}
useEffect(() => {
  init();
}, []);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
        {user1 ? (
          <>
            <MenuItem onClick={handleOpen1} sx={{ m: 1 }}>
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
              Logout
            </MenuItem>
          </>
        ) : (
          <MenuItem onClick={handleLogin} sx={{ m: 1 }}>
            Login / Register
          </MenuItem>
        )}
      </Popover>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open1}
        onClose={handleClose1}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open1}>
          <Box sx={style}>
            <div style={{ textAlign: 'center', alignContent: 'center', alignItems: 'center', marginTop: '20px' }}>
              <Typography variant="h3" style={{ fontSize: '40px', fontWeight: 600, fontFamily: 'Poppins' }}>
                Hi! {account?.displayName}
              </Typography>
              <Avatar

                alt={account?.displayName}
                src={account?.photoURL}
                style={{ borderRadius: '50%', margin: 'auto', width: '150px', height: '150px' }}
              />
              <Typography
                variant="subtitle1"
                style={{ backgroundColor: 'gray.100', fontSize: '18px', margin: '10px', fontFamily: 'Poppins' }}
              >
                Email: {account?.email}
              </Typography>
              <Typography
                variant="subtitle1"
                style={{ backgroundColor: 'gray.100', fontSize: '18px', margin: '10px', fontFamily: 'Poppins' }}
              >
                Bio: {account?.bio}
              </Typography>
              <Typography
                variant="subtitle1"
                style={{ backgroundColor: 'gray.100', fontSize: '18px', margin: '10px', fontFamily: 'Poppins' }}
              >
                Level: {account?.level}
              </Typography>
              <Box>


                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '20px' }}
                  onClick={handleFinance}
                >
                  Payment Details
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '20px', marginLeft: '20px' }}
                  onClick={handleClickEdit}
                >
                  Overview
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '20px', marginLeft: '20px' }}
                  onClick={handleClick}
                >
                  Finance
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '20px', marginLeft: '20px' }}
                  onClick={handleDynamicAds}
                >
                  DynamicAds
                </Button>
              </Box>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
