import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import "./Wallet.css";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

const ResponsiveBottomNavigation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.between("xs", "sm"));

  const [value, setValue] = useState(0);

  return (
    <>
      <Box>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Box className="wallet-bg-container">
              <Box className="wallet-info-container">
                <Box className="wallet-avatar"></Box>
                <Box className="wallet-name">Saurabh Jaykar</Box>
                <Box className="wallet-email">jaykar@gmail.com</Box>
              </Box>
              <Box className="walet-id text-light">wall.et/saurabh</Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={0} >
              <Grid item xs={6} >
                <Box
                  sx={{
                    [theme.breakpoints.up("xs")]: {
                      marginX: "auto",
                   
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px",
                     margin: "13px 8px"
                    },
                    [theme.breakpoints.up("md")]: {},
                  }}
                >
                  <PersonAddAltIcon />
                  <Typography variant="body1" color="textSecondary">
                    This is a
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    [theme.breakpoints.up("xs")]: {
                      marginX: "auto",
                     
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px",
                     margin: "13px 8px"

                    },
                    [theme.breakpoints.up("md")]: {},
                  }}
                >
                  <PersonAddAltIcon />
                  <Typography variant="body1" color="textSecondary">
                    This is a
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    [theme.breakpoints.up("xs")]: {
                      marginX: "auto",
                 
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px",
                     margin: "13px 8px"

                    },
                    [theme.breakpoints.up("md")]: {},
                  }}
                >
                  <PersonAddAltIcon />
                  <Typography variant="body1" color="textSecondary">
                    This is a
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    [theme.breakpoints.up("xs")]: {
                      marginX: "auto",
                 
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px",
                     margin: "13px 8px"

                    },
                    [theme.breakpoints.up("md")]: {},
                  }}
                >
                  <PersonAddAltIcon />
                  <Typography variant="body1" color="textSecondary">
                    This is a
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    [theme.breakpoints.up("xs")]: {
                      marginX: "auto",
                   
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px",
                     margin: "13px 8px"

                    },
                    [theme.breakpoints.up("md")]: {},
                  }}
                >
                  <PersonAddAltIcon />
                  <Typography variant="body1" color="textSecondary">
                    This is a
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    [theme.breakpoints.up("xs")]: {
                      marginX: "auto",
                     
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px",
                     margin: "13px 8px"

                    },
                    [theme.breakpoints.up("md")]: {},
                  }}
                >
                  <PersonAddAltIcon />
                  <Typography variant="body1" color="textSecondary">
                    This is a
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <BottomNavigation
        className="BottomNavigation-container"
        sx={{
          width: "100%",
          position: isMobile ? "fixed" : "static",
          bottom: isMobile ? 0 : "auto",
          padding: "0 auto",
        }}
        showLabels={isMobile}
        value={value}
        onChange={(e, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      </BottomNavigation>
    </>
  );
};

export default ResponsiveBottomNavigation;
