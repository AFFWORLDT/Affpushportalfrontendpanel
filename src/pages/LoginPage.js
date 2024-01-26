import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks


import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';
import { Box } from '@mui/system';


// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));



// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();
  const privateCheck = () => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }

  useEffect(() => {
    privateCheck();
  }, []);
  const boxstyle = {
    // background: "linear(to-l, #7928CA, #FF0080)",
    color: "green"
    // bgClip: "text",
    // fontSize: "4xl",
    // fontWeight: "extrabold"
  }

  return (
    <>
      <Helmet>
        <title> Login |  Affworld </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 80, sm: 80, md: 80 },
          }}
        />

        {mdUp && (
          <StyledSection >
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back to  <span style={boxstyle}> Affworld</span>
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to Affworld
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account ? {''}
              <Link to="/register" variant="subtitle2" style={{ textDecoration: 'none' }} underline="hover"><b>Get started</b></Link>
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
