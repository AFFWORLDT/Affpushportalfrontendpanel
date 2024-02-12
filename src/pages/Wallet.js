import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import "./wallet.css";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

const Wallet = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.between("xs", "sm"));

  const [value, setValue] = useState(0);

  return (
    <>
      <Box>
        <Grid
          container
          spacing={0}
          sx={{
            [theme.breakpoints.up("md")]: {
              gap: "2.5rem ",
            },
            [theme.breakpoints.up("xs")]: {
              gap: "1rem ",
            },
          }}
        >
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
            <Grid container spacing={4}>
              <Grid item xs={6} md={4}>
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
                      margin: "13px 8px",
                    },
                    [theme.breakpoints.up("md")]: {
                      backgroundColor: "#f0f0f0",
                      padding: "10px",
                      width: "240px",
                      margin: "0 auto",
                      borderRadius: "8px",
                    },
                  }}
                >
                  <PersonAddAltIcon />
                  <Typography variant="body1" color="textSecondary">
                    This is a
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={4}>
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
                      margin: "13px 8px",
                    },
                    [theme.breakpoints.up("md")]: {
                      backgroundColor: "#f0f0f0",
                      padding: "10px",
                      width: "240px",
                      margin: "0 auto",
                      borderRadius: "8px",
                    },
                  }}
                >
                  <PersonAddAltIcon />
                  <Typography variant="body1" color="textSecondary">
                    This is a
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={4}>
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
                      margin: "13px 8px",
                    },
                    [theme.breakpoints.up("md")]: {
                      backgroundColor: "#f0f0f0",
                      padding: "10px",
                      width: "240px",
                      margin: "0 auto",
                      borderRadius: "8px",
                    },
                  }}
                >
                  <PersonAddAltIcon />
                  <Typography variant="body1" color="textSecondary">
                    This is a
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={4}>
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
                      margin: "13px 8px",
                    },
                    [theme.breakpoints.up("md")]: {
                      backgroundColor: "#f0f0f0",
                      padding: "10px",
                      width: "240px",
                      margin: "0 auto",
                      borderRadius: "8px",
                    },
                  }}
                >
                  <PersonAddAltIcon />
                  <Typography variant="body1" color="textSecondary">
                    This is a
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={4}>
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
                      margin: "13px 8px",
                    },
                    [theme.breakpoints.up("md")]: {
                      backgroundColor: "#f0f0f0",
                      padding: "10px",
                      width: "240px",
                      margin: "0 auto",
                      borderRadius: "8px",
                    },
                  }}
                >
                  <PersonAddAltIcon />
                  <Typography variant="body1" color="textSecondary">
                    This is a
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={4}>
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
                      margin: "13px 8px",
                    },
                    [theme.breakpoints.up("md")]: {
                      backgroundColor: "#f0f0f0",
                      padding: "10px",
                      width: "240px",
                      margin: "0 auto",
                      borderRadius: "8px",
                    },
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
          width: isMobile ? "100%" : "78%",
          margin: "0 auto",
          position: "fixed",
          bottom: 0,
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

export default Wallet;
