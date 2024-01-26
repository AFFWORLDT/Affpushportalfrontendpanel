import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { addUserToLocalStorage, getUserFromLocalStorage } from "../../../service/localStorage";
import Iconify from '../../../components/iconify';


// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_PROD_API;

  const [values, setValues] = useState({
    email: "",
    password: "",
    loading: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async () => {
    console.log("loginclicked")
    const user = getUserFromLocalStorage();
    console.log("user is -->", user)

    setValues({ ...values, loading: true });
    const { email, password } = values;
    console.log("thi si svalue--->", values)
    if (!email || !password) {
      toast.error("Please Fill All the Fields");
      setValues({ ...values, loading: false });
      return;
    }
    try {
      const url = `${URL}/api/login`;
      const response = await axios.post(url,
        new URLSearchParams({
          'grant_type': '',
          'username': email,
          'password': password,
          'scope': '',
          'client_id': '',
          'client_secret': ''
        }),
        {
          headers: {
            'accept': 'application/json'
          }
        }
      );
      console.log(response);
      toast.success(`Welcome Back! to Affworld!`);
      addUserToLocalStorage(response);
      setValues({ ...values, loading: false });
      navigate("/");
      console.log(response);
      // return response.data;

    } catch (error) {

      console.log("Error while login-->", error)
      toast.error(error?.response?.data?.detail);
      setValues({ ...values, loading: false });

    }

  };

  return (
    <>
      <Stack spacing={3}>
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
        <Link href="/forgotpass" variant="subtitle2" style={{ textDecoration: 'none' }} underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
      <ToastContainer />
    </>
  );
}
