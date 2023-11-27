import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Box, Link, Paper } from '@mui/material';



const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;


  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 40,
        height: 40,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      margin={"auto"}
      gap={"10px"}
    >
      <img style={{ borderRadius: "10px" }} src='/assets/images/avatars/favicon (2).ico' alt="logo" />
      <Paper elevation={3} style={{ padding: '10px' }}>

        <h6 className='text-center' style={{ fontWeight: 700 }}>Affworld Technologies </h6>
      </Paper>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
