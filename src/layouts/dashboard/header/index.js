
import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Typography, ListItemIcon, Icon } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import Iconify from '../../../components/iconify';
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
import { bgBlur } from '../../../utils/cssStyles';
import HomeIcon from '@mui/icons-material/Home';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const NAV_WIDTH = 280;
const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

const NavItem = ({ to, text, icon, elevation }) => (
  <NavLink to={to} className="nav-link" style={{ marginLeft: 10, textDecoration: 'none' }}>
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      elevation={elevation}
      sx={{
        borderRadius: 1,
        boxShadow: elevation === 2 ? '0px 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
      }}
    >
      <ListItemIcon>
        {/* Use Material-UI Icons here */}
        {icon === 'home' && <Icon component={HomeIcon} fontSize="small" />}
        {icon === 'chart-line-2' && <Icon component={TrendingUpIcon} fontSize="small" />}
        {icon === 'bar-chart-outline' && <Icon component={BarChartIcon} fontSize="small" />}
        {icon === 'credit-card-outline' && <Icon component={CreditCardIcon} fontSize="small" />}
      </ListItemIcon>
      <Typography variant="h6" color="text.primary">
        {text}
      </Typography>
    </Stack>
  </NavLink>
);


NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  elevation: PropTypes.number.isRequired,
};

export default function Header({ onOpenNav }) {
  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
         <Icon component={HomeIcon} fontSize="small" /> {/* Example usage of Material-UI Icon */}
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1 }}>
          <NavItem to="/" text="Home" icon="home" elevation={2} />
          <NavItem to="/affilate/conversions" text="Conversions" icon="chart-line-2" elevation={2} />
          <NavItem to="/affilate/user/details" text="Overview" icon="bar-chart-outline" elevation={2} />
          <NavItem to="/affilate/conversions" text="Finance" icon="credit-card-outline" elevation={2} />

          <LanguagePopover />
          <NotificationsPopover />
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
