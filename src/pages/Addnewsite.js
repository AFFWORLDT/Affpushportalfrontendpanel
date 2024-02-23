import { Helmet } from "react-helmet-async";
import { faker } from "@faker-js/faker";
import axios from "axios";
import { toast } from "react-toastify";
// @mui
import { useEffect, useState, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Grid,
  Container,
  Typography,
  TextField,
  Button,
  CardMedia,
  Card,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// components
import Iconify from "../components/iconify";
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
  AppClicks,
} from "../sections/@dashboard/app";
import { afterLoginStorage } from "../service/localStorage";
import { getUserFromLocalStorage } from "../service/localStorage";
import { removeUserFromLocalStorage } from "../service/localStorage";
import { Box, Stack } from "@mui/system";
import AddnewsiteImg01 from "./../images/addnewsitess01.png";
import WordPressSvg from "./../images/wordpress.svg";
import ReactSvg from "./../images/react.svg";
import ShopifySvg from "./../images/shopify.svg";

// import PrivateComponent from "../components/PrivateRoute";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [user, setUser] = useState(null);
  const user1 = getUserFromLocalStorage();
  const [loading, setLoading] = useState(false);
  const URL2 = process.env.REACT_APP_PROD_API;
  const URL3 = process.env.REACT_APP_PROD_ADMIN_API;
  const [webURL, setWebURl] = useState("");
  const user2 = getUserFromLocalStorage();
  const accessToken = user2?.data.access_token;
  const URL = process.env.REACT_APP_PROD_API;
  const [formate, setFormate] = useState("react");

  const handleFormateChange = (event, newFormate) => {
    setFormate(newFormate);
  };

  const PrivateCheck = () => {
    const auth = localStorage.getItem("user");
    if (!auth) {
      navigate("/login");
    }
  };

  const fetchData = async () => {
    const url = `${URL2}/api/analytics/clicks`;
    const accessToken = user1.data.access_token;
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setData(response.data);
      setLoading(true);
    } catch (error) {
      console.log("Error While Fetching data click --->", error);
      toast.error("Session Expired Please Login Again");
      navigate("/login");
      removeUserFromLocalStorage();
    }
  };

  const fetchNewsData = async () => {
    const PAGENUMBER = 1;
    const url_news = `${URL3}/news/?page=${PAGENUMBER}`;
    // console.log("THis is user data --->", url);
    const accessToken = user1.data.access_token;
    // console.log("This is access token --->", accessToken);
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(url_news, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
      setNewsData(jsonData);
      setLoading(true);
    } catch (error) {
      console.log("Error While Fetching data click --->", error);
      toast.error("Error in Fetching Data");
    }
  };

  const sendURL = async () => {
    try {
      console.log("Sending URL", webURL);
      const url = `${URL}/api/pns/add_pns_site?website_url=${webURL}`;

      const res = await axios.post(url, null, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("Response from server", res?.data);

      if (res?.status === 201) {
        toast.success(res?.data?.message);
        setWebURl("");
      }
    } catch (error) {
      console.log("Error while sending URL--->", error?.response?.data?.detail);
      toast.error(error?.response?.data?.detail);
    }
  };

  useEffect(() => {
    // Check if user is authenticated
    // privateCheck();
    PrivateCheck();
    afterLoginStorage((res) => {
      setUser(res);
    });
    fetchData();
    fetchNewsData();
  }, []);

  const names = data.map((item) => item.name);
  const count = data.map((item) => item.count);

  const codeRef = useRef(null);

  const handleCopyClick = () => {
    const codeElement = codeRef.current;

    // Select the text in the code element
    const range = document.createRange();
    range.selectNode(codeElement);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    // Copy the selected text
    document.execCommand("copy");

    // Deselect the text
    window.getSelection().removeAllRanges();
    toast.success("script tag coppied successfully");
  };

  return (
    <>
      <Helmet>
        <title> Add new site | Affworld </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4">
          Hi, {user?.data.name.split(" ")[0]} Welcome to Affworld-Adspace
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            value={webURL}
            onChange={(e) => setWebURl(e.target.value)}
            id="standard-basic"
            label="Enter Website URl"
            variant="standard"
          />
          <Button
            sx={{ mt: 3 }}
            variant="contained"
            color="success"
            onClick={sendURL}
          >
            Send URL
          </Button>
        </Box>
      </Container>

      <Container className="mt-4">
        <Typography
          variant="h5"
          component={"div"}
          bgcolor={"#5CA8EB"}
          className="ml-4  px-2 py-1 rounded-1 text-white"
          sx={{
            [theme.breakpoints.up("xs")]: {
              fontSize: "15px",
            },
            [theme.breakpoints.up("md")]: {
              fontSize: "18px",
            },
          }}
        >
          INSTALL AND ACTIVE THIS PLUGIN TO INSTNALY ACTIVE THE PUSH
        </Typography>
        <Stack
          spacing={2}
          direction="column"
          boxShadow={3}
          display={"inline-block"}
          mt={4}
          sx={{
            [theme.breakpoints.up("xs")]: {
              marginLeft: "15px",
            },
            [theme.breakpoints.up("md")]: {
              marginLeft: "22px",
            },
          }}
        >
          <ToggleButtonGroup
            aria-label="text formatting"
            value={formate}
            color="primary"
            exclusive
            onChange={handleFormateChange}
          >
            <ToggleButton value="react" aria-label="react">
              <CardMedia
                component="img"
                image={ReactSvg}
                alt="Image Alt Text"
                sx={{
                  [theme.breakpoints.up("xs")]: {
                    height: "30px",
                  },
                  [theme.breakpoints.up("md")]: {
                    height: "40px",
                  },
                }}
              />
            </ToggleButton>
            <ToggleButton value="wordpress" aria-label="wordpress">
              <CardMedia
                component="img"
                image={WordPressSvg}
                alt="Image Alt Text"
                sx={{
                  [theme.breakpoints.up("xs")]: {
                    height: "30px",
                  },
                  [theme.breakpoints.up("md")]: {
                    height: "40px",
                  },
                }}
              />
            </ToggleButton>
            <ToggleButton value="shopyfy" aria-label="shopyfy">
              <CardMedia
                component="img"
                image={ShopifySvg}
                alt="Image Alt Text"
                sx={{
                  [theme.breakpoints.up("xs")]: {
                    height: "30px",
                  },
                  [theme.breakpoints.up("md")]: {
                    height: "40px",
                  },
                }}
              />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        {formate === "react" && (
          <Container sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    [theme.breakpoints.up("xs")]: {
                      border: "1px solid gray",
                      padding: "10px",
                      borderRadius: "10px",
                      height: "510px",
                    },
                    [theme.breakpoints.up("md")]: {
                      border: "1px solid gray",
                      padding: "10px",
                      borderRadius: "10px",
                      height: "410px",
                    },
                  }}
                >
                  <Typography variant="h5">
                    Step 1 : Insert the Code in Your index.html File
                  </Typography>
                  <Typography variant="body2">
                    To integrate Firebase and the Push Notification Service
                    (PNS) into your application, follow these steps:
                  </Typography>

                  <Typography variant="body2">
                    <strong>Step 1 : </strong> Open your <code>index.html</code>{" "}
                    file.
                  </Typography>

                  <Typography variant="body2">
                    <strong>Step 2 :</strong> Locate the{" "}
                    <code>&lt;head&gt;</code> tag in your HTML file.
                  </Typography>

                  <Typography variant="body2">
                    <strong>Step 3 :</strong> Inside the{" "}
                    <code>&lt;head&gt;</code> tag, add the following script tags
                    in the specified order:
                  </Typography>

                  <Box
                    sx={{
                      border: "1px solid gray",
                      padding: "10px",
                      borderRadius: "10px",
                      position: "relative",
                    }}
                  >
                    <pre>
                      <code ref={codeRef}>
                        {`
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"></script>
<script src="https://pns.affworld.cloud/client-script"></script>
          `}
                      </code>
                    </pre>

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleCopyClick}
                      sx={{
                        position: "absolute",
                        bottom: "10px",
                        right: "10px",
                      }}
                    >
                      Copy
                    </Button>
                  </Box>

                  {/* Copy Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCopyClick}
                    sx={{ position: "absolute", top: "10px", right: "10px" }}
                  >
                    Copy
                  </Button>

                  <Typography variant="body2">
                    <strong>Step 4 :</strong> Save the <code>index.html</code>{" "}
                    file.
                  </Typography>

                  <Typography variant="body2">
                    Your application is now set up with Firebase and the Push
                    Notification Service.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    [theme.breakpoints.up("xs")]: {
                      border: "1px solid gray",
                      padding: "10px",
                      borderRadius: "10px",
                      height: "510px",
                    },
                    [theme.breakpoints.up("md")]: {
                      border: "1px solid gray",
                      padding: "10px",
                      borderRadius: "10px",
                      height: "410px",
                    },
                  }}
                >
                  <Typography variant="h5">
                    Step 2 : Download firebase-messaging-sw.js
                  </Typography>

                  <Typography variant="body2">
                    <strong>Step 1 : </strong> click or tap on the link to{" "}
                    <a
                      href="https://affworld-affiliate-api.s3.amazonaws.com/firebase-messaging-sw.js"
                      target="_blank"
                    >
                      firebase-messaging-sw.js
                    </a>
                  </Typography>
                  <Typography variant="body2">
                    <strong>Step 2 : </strong> Right-click and select{" "}
                    <span style={{ fontWeight: "bold" }}>Save As</span> from the
                    options to download the file. You will need the code in this
                    file.
                  </Typography>

                  <Typography variant="body2">
                    <strong>Step 3 :</strong> Place Or Create the downloaded{" "}
                    <code>firebase-messaging-sw.js</code> file in the same
                    directory as your <code>index.html</code> file.
                  </Typography>
                  <Card>
                    <CardMedia
                      style={{ height: "250px", width: "200px" }}
                      component="img"
                      image={AddnewsiteImg01}
                      alt="Image Alt Text"
                    />
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </Container>
        )}
        {formate === "wordpress" && (
          <Container sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Box
                  sx={{
                    [theme.breakpoints.up("xs")]: {
                      border: "1px solid gray",
                      padding: "10px",
                      borderRadius: "10px",
                      height: "510px",
                    },
                    [theme.breakpoints.up("md")]: {
                      border: "1px solid gray",
                      padding: "10px",
                      borderRadius: "10px",
                      height: "410px",
                    },
                  }}
                >
                  <Typography variant="h5">
                    Step 1 : Download the zip file
                  </Typography>
                  <Typography variant="body2">
                    To integrate Firebase and the Push Notification Service
                    (PNS) into your wordpress application download the zip  file <a href="https://affworld-affiliate-api.s3.ap-south-1.amazonaws.com/AffworldAccelerator.zip">Click or tap here </a>
                  </Typography>
                  <Typography variant="body2">
                   
                   </Typography>
</Box>
                  
              </Grid>
           
            </Grid>
          </Container>
        )}
        {formate === "shopyfy" && (
           <Container sx={{ mt: 3 }}>
           <Grid container spacing={3}>
             <Grid item xs={12} md={12}>
               <Box
                 sx={{
                   [theme.breakpoints.up("xs")]: {
                     border: "1px solid gray",
                     padding: "10px",
                     borderRadius: "10px",
                     height: "510px",
                   },
                   [theme.breakpoints.up("md")]: {
                     border: "1px solid gray",
                     padding: "10px",
                     borderRadius: "10px",
                     height: "410px",
                   },
                 }}
               >
                 <Typography variant="h5">
                   Comming soon
                 </Typography>
                 <Typography variant="body2">
                   
                 </Typography>
</Box>
                 
             </Grid>
          
           </Grid>
         </Container>
        )}
      </Container>
    </>
  );
}
