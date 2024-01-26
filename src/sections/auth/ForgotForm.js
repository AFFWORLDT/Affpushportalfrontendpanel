import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { addUserToLocalStorage } from '../../service/localStorage';
import Iconify from '../../components/iconify';

export default function RegisterForm() {
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_PROD_API;
  const [userMail, setUserMail] = useState('');

  const handleClick = async () => {
    try {
      console.log("this is UserMail from env --->", userMail);

      const formData = new URLSearchParams();

      formData.append('username', userMail);


      const res = await axios.post(`${URL}/api/reset-password/request`, formData);

      if (res.status === 200) {
        toast.success(res?.data?.message);
        setUserMail('');
      }

      console.log("this is res from Mail API --->", res);
    } catch (error) {
      console.log("Error While Sending Mail", error);
      toast.error("Something Went Wrong while sending Mail");
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          value={userMail}
          onChange={(e) => setUserMail(e.target.value)}
          name="name"
          label="Enter Your Registered Email"
        />
      </Stack>

      <LoadingButton sx={{ mt: 3 }} fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Send Reset Pass Mail
      </LoadingButton>
      <ToastContainer />
    </>
  );
}
