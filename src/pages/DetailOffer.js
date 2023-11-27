/*eslint-disable */

import React from 'react'
import { Helmet } from 'react-helmet-async';
import { Skeleton, Typography, Box } from '@mui/material';




const DetailOffer = () => {
    return (
        <>
            <Helmet>
                <title> Detail Offer | Affworld </title>
            </Helmet>
            <Box sx={{ backgroundColor: "#e1e9ff", height: "18vh", borderRadius: "10px" }} padding={2}>
                <Box sx={{ display: "flex" }} >
                    <Box sx={{ width: "10%", height: "18vh" }} >
                        <Skeleton animation="wave" variant="circular" width={50} height={50} />
                        <Skeleton variant="rectangular" />
                        <Skeleton width={"40%"} />
                        <Skeleton width={"40%"} />
                    </Box>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 500 }} color={"#8764b2"}  >
                            Sample Offer (ID : 8892)
                        </Typography>

                        <Box marginTop={2}>
                            <Typography variant="h7" align="center">
                                Start Date :<span style={{ backgroundColor: "#bed0fe", padding: 5, margin: 4, borderRadius: 8 }}>28-11-2001</span>
                            </Typography>
                            <Typography marginLeft={20} variant="h7" align="center">
                                End Date : <span style={{ backgroundColor: "#f77381", padding: 5, margin: 4, borderRadius: 8 }}>28-12-2001</span>
                            </Typography>
                        </Box>

                        <Box marginTop={2}>
                            <Typography variant="h7" align="center">
                                Status :<span style={{ backgroundColor: "#fed78a", padding: 5, margin: 4, borderRadius: 8 }}>Not Approved</span>
                            </Typography>

                        </Box>


                    </Box>

                    <Box sx={{marginLeft:50}}>
                        <Box  >
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <span style={{ color: "#6E7A83" }}>AR</span>
                                &nbsp;&nbsp;&nbsp; <span>0%</span>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "center" ,marginTop:2 }}>
                                <span style={{ color: "#6E7A83" }}>CR</span>
                                &nbsp;&nbsp;&nbsp; <span>0%</span>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "center" , marginTop:2 }}>
                                <span style={{ color: "#6E7A83" }}>EPC</span>
                                &nbsp;&nbsp;&nbsp; <span>$0,00</span>
                            </Box>
                        </Box>
                    </Box>
                </Box>

            </Box>



        </>
    )
}

export default DetailOffer