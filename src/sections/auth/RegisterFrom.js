import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { addUserToLocalStorage } from "../../service/localStorage";
import Iconify from '../../components/iconify';


// ----------------------------------------------------------------------

export default function RegisterFrom() {
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_PROD_API;
  const [anid, setAnid] = useState(null);




  const [values, setValues] = useState({
    name: "",
    fullName: "",
    email: "",
    password: "",
    bio: "",
  });

  const setAnidLocalStorage = () => {
    const anid = localStorage.getItem("anid");
    setAnid(anid);
  }

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async () => {
    const { email, password, name, bio } = values;

    if (!name || !email || !password) {
      toast.error("Please Provide All The Fields");
      return;
    }

    console.log("this is url from env --->", URL);
    try {
      const url = `${URL}/api/affiliates/?anid=${anid}`;
      console.log(url);
      const data = { name, email, password, bio, };
      console.log(data);

      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });




      toast.success(`Hi There your account created Successfully!! `);
      addUserToLocalStorage(response);
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 5000);
      console.log(response);
      // return response.data;




    } catch (error) {
      console.log("error while submitteing -->", error)
      toast.error(error.response.data.detail);

    }
  };


  useEffect(() => {
    setAnidLocalStorage();
  }, []);

  return (
    <>
      <Stack spacing={3}>
        <TextField

          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          name="name" label="Enter Name" />
        <TextField

          value={values.bio}
          onChange={(e) => setValues({ ...values, bio: e.target.value })}
          name="bio" label="Short Bio" />
        <TextField

          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
          name="email" label="Email address" />

        <TextField
          name="password"
          label="Password"
          value={values.password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}


          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Register
      </LoadingButton>
      <ToastContainer />
    </>
  );
}
