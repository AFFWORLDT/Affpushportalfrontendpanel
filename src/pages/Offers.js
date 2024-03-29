import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Modal,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import { toast } from "react-toastify";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import LinearProgress from "@mui/material/LinearProgress";
import useClipboard from "react-use-clipboard";
import copy from "clipboard-copy";
import * as XLSX from "xlsx";
import {
  getResFromLocalStorage,
  getUserFromLocalStorage,
} from "../service/localStorage";
import axios from "axios";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import PauseIcon from "@mui/icons-material/Pause";
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // Import the Expired icon
import { useTheme } from "@mui/material/styles";
import "./Offers.css";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const Offers = () => {
  const URL = process.env.REACT_APP_PROD_ADMIN_API;
  const URL2 = process.env.REACT_APP_PROD_API;
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();
  const res = getResFromLocalStorage();
  const user = getUserFromLocalStorage();
  const [data, setData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [approveData, setApproveData] = useState([]);
  const [categoryFilteredData, setCategoryFilteredData] = useState([]);
  const [countryFilteredData, setCountryFilteredData] = useState([]);
  const [bothFilteredData, setBothFilteredData] = useState([]);

  const [buttonStates, setButtonStates] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [moreDetailsCamapgin, setMoreDetailsCamapgin] = useState({});
  const { copied, copyToClipboard } = useClipboard();

  const [status, setStatus] = useState("");
  const user2 = getUserFromLocalStorage();
  const accessToken = user2?.data.access_token;
  const url = `${URL}/approve/`;

  const affiliateId = res?.data?.affiliate_id;
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedIframCampaginId, setSelectedIframCampaginId] = useState("");
  const theme = useTheme();

  const handleIframeCode = (row) => {
    handleOpen();
    setSelectedIframCampaginId(row?._id);
  };

  const handleIframe = async () => {
    try {
      console.log("this is selectedOption", selectedOption);
      const url = `${URL2}/api/affiliates/set_on_iframe?iframe_id=${selectedOption}&campaign_id=${selectedIframCampaginId}`;
      const accessToken = user?.data?.access_token;
      console.log(accessToken);
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
      if (response.status === 200) {
        toast.success("Iframe set successfully!!");
        handleClose();
        setSelectedIframCampaginId("");
        setSelectedOption("");
      }
    } catch (error) {
      console.log("Error While setting iframe-->", error);
      toast.error("Error While setting iframe!!");
    }
  };

  const privateCheck = () => {
    const auth = localStorage.getItem("user");
    if (!auth) {
      navigate("/login");
    }
  };

  const [payoutVal, setPayoutVal] = useState();
  const [isPayoutVal, setIsPayoutVal] = useState(false);
  const [moreDetailsModal, setMoreDetailsModal] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    privateCheck();
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [status]);

  const fetchData = async () => {
    try {
      console.log("status-->", status);
      const result = await axios.get(
        `${URL}/campaign/?page=1&status=${status}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setData(result.data);
      setLoading(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const sendRequest = async (campaignId) => {
    try {
      // Replace with your actual access token
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const requestData = {
        affiliate_id: `${affiliateId}`,
        campaign_id: `${campaignId}`,
        request_sent: true,
        approval_status: "pending",
      };

      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCopyAff = (item) => {
    const link = `${URL}/${item?.code}?affiliate_id=${res?.data?.affiliate_id}`;

    try {
      copy(link);

      toast.success("Link copied to clipboard", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (error) {
      console.error("Error copying link to clipboard:", error);
      toast.error("Error copying link to clipboard", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleClick = async (row) => {
    try {
      if (row?.type === "Public" || row?.type === null) {
        await handleCopyAff(row);
      } else if (row?.type === "Private") {
        console.log("buttonStates[row._id]____", buttonStates[row._id]);
        if (buttonStates[row._id] === "Approved") {
          await handleCopyAff(row);
        } else {
          setButtonStates((prevStates) => ({
            ...prevStates,
            [row._id]: "Pending",
          }));
          await sendRequest(row?._id);
        }
        console.log("Button clicked and changed to pending for row:", row._id);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const exportData = () => {
    const fileName = "Offers.xlsx";
    const table = document.getElementById("offers-table");
    const rows = table.querySelectorAll("tr");
    const tabledata = [];
    const headers = [];
    rows[0].querySelectorAll("th").forEach((header) => {
      headers.push(header.innerText);
    });
    tabledata.push(headers);
    rows.forEach((row, index) => {
      if (index === 0) {
        return; // Skip the header row
      }

      const rowData = [];
      const cells = row.querySelectorAll("td");

      console.log(`INDEX:  ${index}`);
      console.log(`DATA[0]:  ${data[0]}`);
      cells.forEach((cell, cellIndex) => {
        // If this is the action column, add a link
        if (cellIndex === 6) {
          const actionLink = `${URL}/${data[index - 1]?.code}?affiliate_id=${
            res.data.affiliate_id
          }`;

          rowData.push(actionLink);
        } else {
          rowData.push(cell.innerText);
        }
      });

      tabledata.push(rowData);
    });

    const ws = XLSX.utils.aoa_to_sheet(tabledata);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, fileName);
  };

  const handlePayout = (row) => {
    setPayoutVal(row?.payouts);
    setIsPayoutVal(true);
  };

  const handleMoreDetails = async (row) => {
    setMoreDetailsModal(true);
    const campaign_id = row?._id;
    const url = `${URL}/campaign/${campaign_id}`;

    const res = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("More Details -->", res?.data);
    setMoreDetailsCamapgin(res?.data);
  };

  useEffect(() => {
    const startIndex = page * rowsPerPage;
    const dataForPage = data.slice(startIndex, startIndex + rowsPerPage);
    setPageData(dataForPage);
  }, [page, rowsPerPage, data]);
  const handleCategoryCountryChange = (selectedCategory, selectedCountry) => {
    const newFilteredData = data.filter(
      (row) =>
        row?.category === selectedCategory && row?.country === selectedCountry
    );
    console.log("selected category---->", selectedCategory);
    console.log("selected country---->", selectedCountry);
    console.log("data BOTH-->", newFilteredData);
    setBothFilteredData(newFilteredData);
  
  };

  const handleCategoryChange = (event) => {
    const newSelectedCategory = event.target.value;
    handleCategoryCountryChange(newSelectedCategory, selectedCountry);

    const newFilteredData = data.filter(
      (row) =>
        row?.category === newSelectedCategory || newSelectedCategory === ""
    );
    console.log("selected category", newSelectedCategory);
    console.log("data", newFilteredData);
    setCategoryFilteredData(newFilteredData);
    setSelectedCategory(newSelectedCategory);
  };

  const categories = [
    "Ecommerce",
    "BFSI",
    "Banking",
    "Casino",
    "CPL",
    "CPR",
    "CPD",
    "CPS",
    "Gambling",
    "Crypto",
    "Survey",
  ];
  const handleCountryChange = (event) => {
    const newSelectedCountry = event.target.value;
    handleCategoryCountryChange(selectedCategory, newSelectedCountry);

    const newFilteredData = data.filter(
      (row) => row?.country === newSelectedCountry || newSelectedCountry === ""
    );
    console.log("selected country", newSelectedCountry);
    console.log("data", newFilteredData);
    setSelectedCountry(newSelectedCountry);
    setCountryFilteredData(newFilteredData);
  };

  const handleClearFilter = () => {
    try {
      setCountryFilteredData([]);
      setCategoryFilteredData([]);
      setSelectedCountry("");
      setSelectedCategory("");
      
      fetchData();
    } catch (error) {
      console.log("Error while clear", error);
    }
  };

  const countries = [
    "India",
    "Australia",
    "Canada",
    "Brazil",
    "Vietnam",
    "Russia",
  ];

  const useStyles = makeStyles((theme) => ({
    table: {
      maxWidth: "100%",
      [theme.breakpoints.down("sm")]: {
        maxWidth: "100%",
      },
    },
    headerCell: {
      justifyContent: "space-evenly",
      textAlign: "center",
      [theme.breakpoints.down("xs")]: {
        fontSize: "14px",
      },
    },
  }));
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>Best Offers | Affworld</title>
      </Helmet>
      <Button
        variant="contained"
        color="primary"
        onClick={exportData}
        style={{ margin: "8px" }}
      >
        Export to Excel
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClearFilter}
        style={{ margin: "8px" }}
      >
        Clear Filter
      </Button>
      <FormControl sx={{ width: 200, margin: "8px" }}>
        <InputLabel id="demo-simple-select-label">All Offers</InputLabel>
        <Select
          defaultValue=""
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          onChange={handleStatusChange}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="paused">Paused</MenuItem>
          <MenuItem value="expired">Expired</MenuItem>
          <MenuItem value="active">Active</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ width: 200, margin: "8px" }}>
        <InputLabel id="demo-category-select-label">All Categories</InputLabel>
        <Select
          labelId="demo-category-select-label"
          id="demo-category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ width: 200, margin: "8px" }}>
        <InputLabel id="demo-category-select-label">Countries</InputLabel>
        <Select
          labelId="demo-category-select-label"
          id="demo-category-select"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          <MenuItem value="">All</MenuItem>
          {countries.map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div className="mt-3 mb-3">
        {categoryFilteredData?.length > 0 &&
        countryFilteredData?.length == 0 &&
        bothFilteredData?.length == 0 ? (
          <TableContainer component={Paper}>
            <Table
              id="offers-table"
              sx={{ minWidth: 650 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                <TableCell>No</TableCell>
                  <TableCell>Offers</TableCell>
                  <TableCell align="center">Tags</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Iframe</TableCell>
                  <TableCell align="center">Action</TableCell>
                  <TableCell align="center">Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categoryFilteredData?.map((row , index) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                      <TableCell component="td" scope="row">
                      {index + 1}
                    </TableCell>

                    <TableCell component="td" scope="row">
                      {row.name}
                    </TableCell>

                    <TableCell align="center">
                      <Select defaultValue="">
                        {row?.tags?.map((tag, index) => (
                          <option key={index} value={tag}>
                            {tag}
                          </option>
                        ))}
                      </Select>
                    </TableCell>

                    <TableCell align="center">
                      {row?.status === "active" ? (
                        <CloudDoneIcon style={{ color: "#32e620" }} />
                      ) : row?.status === "paused" ? (
                        <PauseIcon style={{ color: "#FF0000" }} />
                      ) : row?.status === "expired" ? (
                        <AccessTimeIcon style={{ color: "#FFA500" }} />
                      ) : null}
                      {"   "}
                      <span style={{ fontWeight: 700 }}>{row?.status} </span>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        onClick={() => handleIframeCode(row)}
                      >
                        Link Iframe
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        key={row._id}
                        onClick={() => handleClick(row)}
                        disabled={buttonStates[row._id] === "Pending"}
                        variant="contained"
                        style={{ fontWeight: 700, marginBottom: "10px" }}
                      >
                        {row?.type === "Private"
                          ? buttonStates[row._id] === "Approved"
                            ? copied
                              ? "Copied"
                              : "Copy Link"
                            : buttonStates[row._id] === "Disapproved"
                            ? "Rejected"
                            : buttonStates[row._id] === "Pending"
                            ? "Pending"
                            : "Get Approval"
                          : copied
                          ? "Copied"
                          : "Copy Link"}
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleMoreDetails(row)}
                      >
                        {" "}
                        Details <ReadMoreIcon sx={{ marginLeft: "5px" }} />{" "}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null}
      </div>

      <div className="mt-3 mb-3 ">
        {countryFilteredData?.length > 0 &&
        categoryFilteredData?.length == 0 &&
        bothFilteredData?.length == 0 ? (
          <TableContainer component={Paper}>
            <Table
              id="offers-table"
              sx={{ minWidth: 650 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Offers</TableCell>
                  <TableCell align="center">Tags</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Iframe</TableCell>
                  <TableCell align="center">Action</TableCell>
                  <TableCell align="center">Deatils</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {countryFilteredData?.map((row , index) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="td" scope="row">
                      {index + 1}
                    </TableCell>

                    <TableCell component="td" scope="row">
                      {row.name}
                    </TableCell>

                    <TableCell align="center">
                      <Select defaultValue="">
                        {row?.tags?.map((tag, index) => (
                          <option key={index} value={tag}>
                            {tag}
                          </option>
                        ))}
                      </Select>
                    </TableCell>

                    <TableCell align="center">
                      {row?.status === "active" ? (
                        <CloudDoneIcon style={{ color: "#32e620" }} />
                      ) : row?.status === "paused" ? (
                        <PauseIcon style={{ color: "#FF0000" }} />
                      ) : row?.status === "expired" ? (
                        <AccessTimeIcon style={{ color: "#FFA500" }} />
                      ) : null}
                      {"   "}
                      <span style={{ fontWeight: 700 }}>{row?.status} </span>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        onClick={() => handleIframeCode(row)}
                      >
                        Link Iframe
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        key={row._id}
                        onClick={() => handleClick(row)}
                        disabled={buttonStates[row._id] === "Pending"}
                        variant="contained"
                        style={{ fontWeight: 700, marginBottom: "10px" }}
                      >
                        {row?.type === "Private"
                          ? buttonStates[row._id] === "Approved"
                            ? copied
                              ? "Copied"
                              : "Copy Link"
                            : buttonStates[row._id] === "Disapproved"
                            ? "Rejected"
                            : buttonStates[row._id] === "Pending"
                            ? "Pending"
                            : "Get Approval"
                          : copied
                          ? "Copied"
                          : "Copy Link"}
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleMoreDetails(row)}
                      >
                        {" "}
                        Details <ReadMoreIcon sx={{ marginLeft: "5px" }} />{" "}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null}
      </div>

      <div className="mt-3 mb-3 ">
        {bothFilteredData?.length > 0 ? (
          <TableContainer component={Paper}>
            <Table
              id="offers-table"
              sx={{ minWidth: 650 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>No</TableCell>

                  <TableCell>Offers</TableCell>
                  <TableCell align="center">Tags</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Iframe</TableCell>
                  <TableCell align="center">Action</TableCell>
                  <TableCell align="center">Deatils</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bothFilteredData?.map((row, index) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="td" scope="row">
                      {index + 1}
                    </TableCell>

                    <TableCell component="td" scope="row">
                      {row.name}
                    </TableCell>

                    <TableCell align="center">
                      <Select defaultValue="">
                        {row?.tags?.map((tag, index) => (
                          <option key={index} value={tag}>
                            {tag}
                          </option>
                        ))}
                      </Select>
                    </TableCell>

                    <TableCell align="center">
                      {row?.status === "active" ? (
                        <CloudDoneIcon style={{ color: "#32e620" }} />
                      ) : row?.status === "paused" ? (
                        <PauseIcon style={{ color: "#FF0000" }} />
                      ) : row?.status === "expired" ? (
                        <AccessTimeIcon style={{ color: "#FFA500" }} />
                      ) : null}
                      {"   "}
                      <span style={{ fontWeight: 700 }}>{row?.status} </span>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        onClick={() => handleIframeCode(row)}
                      >
                        Link Iframe
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        key={row._id}
                        onClick={() => handleClick(row)}
                        disabled={buttonStates[row._id] === "Pending"}
                        variant="contained"
                        style={{ fontWeight: 700, marginBottom: "10px" }}
                      >
                        {row?.type === "Private"
                          ? buttonStates[row._id] === "Approved"
                            ? copied
                              ? "Copied"
                              : "Copy Link"
                            : buttonStates[row._id] === "Disapproved"
                            ? "Rejected"
                            : buttonStates[row._id] === "Pending"
                            ? "Pending"
                            : "Get Approval"
                          : copied
                          ? "Copied"
                          : "Copy Link"}
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleMoreDetails(row)}
                      >
                        {" "}
                        Details <ReadMoreIcon sx={{ marginLeft: "5px" }} />{" "}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null}
      </div>

      <div className="mt-3 mb-3 ">
        {categoryFilteredData?.length === 0 &&
        countryFilteredData?.length === 0 &&
        bothFilteredData?.length === 0 ? (
          <>
            <TableContainer component={Paper}>
              <Table
                id="offers-table"
                sx={{ minWidth: 650 }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>Offers</TableCell>
                    <TableCell align="center">Tags</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Iframe</TableCell>
                    <TableCell align="center">Action</TableCell>
                    <TableCell align="center">Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    pageData?.length > 0 ? (
                      pageData.map((row, index) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="td" scope="row">
                            {index + 1}
                          </TableCell>

                          <TableCell component="td" scope="row">
                            {row.name}
                          </TableCell>

                          <TableCell align="center">
                            <Select defaultValue="">
                              {row?.tags?.map((tag, index) => (
                                <option key={index} value={tag}>
                                  {tag}
                                </option>
                              ))}
                            </Select>
                          </TableCell>

                          <TableCell align="center">
                            {row?.status === "active" ? (
                              <CloudDoneIcon style={{ color: "#32e620" }} />
                            ) : row?.status === "paused" ? (
                              <PauseIcon style={{ color: "#FF0000" }} />
                            ) : row?.status === "expired" ? (
                              <AccessTimeIcon style={{ color: "#FFA500" }} />
                            ) : null}
                            {"   "}
                            <span style={{ fontWeight: 700 }}>
                              {row?.status}{" "}
                            </span>
                          </TableCell>

                          <TableCell align="center">
                            <Button
                              variant="contained"
                              onClick={() => handleIframeCode(row)}
                            >
                              Link Iframe
                            </Button>
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              key={row._id}
                              onClick={() => handleClick(row)}
                              disabled={buttonStates[row._id] === "Pending"}
                              variant="contained"
                              style={{ fontWeight: 700, marginBottom: "10px" }}
                            >
                              {row?.type === "Private"
                                ? buttonStates[row._id] === "Approved"
                                  ? copied
                                    ? "Copied"
                                    : "Copy Link"
                                  : buttonStates[row._id] === "Disapproved"
                                  ? "Rejected"
                                  : buttonStates[row._id] === "Pending"
                                  ? "Pending"
                                  : "Get Approval"
                                : copied
                                ? "Copied"
                                : "Copy Link"}
                            </Button>
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() => handleMoreDetails(row)}
                            >
                              {" "}
                              Details{" "}
                              <ReadMoreIcon sx={{ marginLeft: "5px" }} />{" "}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : null
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        <LinearProgress />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </>
        ) : null}
      </div>

      <Modal onClose={() => setIsPayoutVal(false)} open={isPayoutVal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            boxShadow: 24,
            p: 2,
            borderRadius: "8px",
            width: "90%",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="text-center">Reg</TableCell>
                <TableCell className="text-center">Ftd</TableCell>
                <TableCell className="text-center">deposite</TableCell>
                <TableCell className="text-center">Deposite</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow style={{ backgroundColor: "#f2f2f2" }}>
                <TableCell className="text-center">
                  {payoutVal?.reg ? payoutVal?.reg : "N/A"}
                </TableCell>
                <TableCell className="text-center">
                  {payoutVal?.ftd ? payoutVal?.ftd : "N/A"}
                </TableCell>
                <TableCell className="text-center">
                  {payoutVal?.deposit ? payoutVal?.deposit : "N/A"}
                </TableCell>
                <TableCell className="text-center">
                  {payoutVal?.Deposit ? payoutVal?.Deposit : "N/A"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Modal>

      <Modal onClose={() => setMoreDetailsModal(false)} open={moreDetailsModal}>
        {/* <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            boxShadow: 24,
            p: 2,
            borderRadius: "8px",
            width: "90%",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="text-center">CampaignPhoto</TableCell>
                <TableCell className="text-center">Name</TableCell>
                <TableCell className="text-center">Status</TableCell>
                <TableCell className="text-center">Country</TableCell>
                <TableCell className="text-center">Url</TableCell>
                <TableCell className="text-center">horizontal_image_url</TableCell>
                <TableCell className="text-center">vertical_image_url</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow style={{ backgroundColor: "#f2f2f2" }}>
                <TableCell className="text-center">
                  <img style={{ width: "100px" }} src={moreDetailsCamapgin?.CampaignPhoto} alt="campagin-photo" />

                </TableCell>
                <TableCell className="text-center">
                  {moreDetailsCamapgin?.name ? moreDetailsCamapgin?.name : "N/A"}
                </TableCell>
                <TableCell className="text-center">
                  {moreDetailsCamapgin?.status ? moreDetailsCamapgin?.status : "N/A"}
                </TableCell>
                <TableCell className="text-center">
                  {moreDetailsCamapgin?.country ? moreDetailsCamapgin?.country : "N/A"}
                </TableCell>
                <TableCell className="text-center">
                  <Link to={moreDetailsCamapgin?.url ? moreDetailsCamapgin?.url : "N/A"} >URL</Link>

                </TableCell>
                <TableCell className="text-center">
                  <img src={moreDetailsCamapgin?.horizontal_image_url} alt="horizontal Image" />

                </TableCell>
                <TableCell className="text-center">
                  <img src={moreDetailsCamapgin?.vertical_image_url} alt="horizontal Image" />

                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

        </Box> */}

        <Box
          sx={{
            [theme.breakpoints.up("xs")]: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              boxShadow: 24,
              p: 1,
              borderRadius: "8px",
              width: "95%",
            },
            [theme.breakpoints.up("md")]: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              boxShadow: 24,
              p: 2,
              borderRadius: "8px",
              width: "50%",
            },
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="text-center">Campaign</TableCell>
                <TableCell className="text-center">horizontal</TableCell>
                <TableCell className="text-center">vertical</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ backgroundColor: "#f2f2f2" }}>
              <TableRow>
                <TableCell>
                  <img
                    src={moreDetailsCamapgin?.CampaignPhoto}
                    alt="Image 1"
                    className="d-block mx-auto rounded-2 offer-CampaignPhoto"
                  />
                </TableCell>
                <TableCell>
                  <img
                    src={moreDetailsCamapgin?.horizontal_image_url}
                    alt="Image 2"
                    className="d-block mx-auto rounded-2 offer-CampaignPhoto"
                  />
                </TableCell>
                <TableCell>
                  <img
                    src={moreDetailsCamapgin?.vertical_image_url}
                    alt="Image 3"
                    className="d-block mx-auto rounded-2 offer-CampaignPhoto"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.headerCell}>Name</TableCell>
                <TableCell className={classes.headerCell}>Status</TableCell>
                <TableCell className={classes.headerCell}>Country</TableCell>
                <TableCell className={classes.headerCell}>Url</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ backgroundColor: "#f2f2f2" }}>
              <TableRow>
                <TableCell className="text-center">
                  {moreDetailsCamapgin?.name
                    ? moreDetailsCamapgin?.name
                    : "N/A"}
                </TableCell>
                <TableCell className="text-center d-flex justify-content-center align-items-center flex-column">
                  {moreDetailsCamapgin?.status === "active" ? (
                    <CloudDoneIcon style={{ color: "#32e620" }} />
                  ) : moreDetailsCamapgin?.status === "paused" ? (
                    <PauseIcon style={{ color: "#FF0000" }} />
                  ) : moreDetailsCamapgin?.status === "expired" ? (
                    <AccessTimeIcon style={{ color: "#FFA500" }} />
                  ) : null}
                  {"   "}
                  <span style={{ fontWeight: 300 }}>
                    {moreDetailsCamapgin?.status}{" "}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  {moreDetailsCamapgin?.country
                    ? moreDetailsCamapgin?.country
                    : "N/A"}
                </TableCell>
                <TableCell className="text-center">
                  <Link
                    target="_blank"
                    to={
                      moreDetailsCamapgin?.url
                        ? moreDetailsCamapgin?.url
                        : "N/A"
                    }
                  >
                    URL
                  </Link>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Modal>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #4c545d",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box>
            <RadioGroup>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Radio
                        value="1"
                        onChange={(e) => setSelectedOption(e.target.value)}
                      />
                    }
                    label="Option 1"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Radio
                        value="2"
                        onChange={(e) => setSelectedOption(e.target.value)}
                      />
                    }
                    label="Option 2"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Radio
                        value="3"
                        onChange={(e) => setSelectedOption(e.target.value)}
                      />
                    }
                    label="Option 3"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Radio
                        value="4"
                        onChange={(e) => setSelectedOption(e.target.value)}
                      />
                    }
                    label="Option 4"
                  />
                </Grid>
                <Grid
                  item
                  md={12}
                  mt={1}
                  sx={{
                    [theme.breakpoints.up("xs")]: {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      width: "120px",
                    }}
                    onClick={handleIframe}
                  >
                    Submit
                  </Button>
                  <Button
                    sx={{ width: "120px", marginLeft: "10px" }}
                    variant="contained"
                    color="error"
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </Grid>
              </Grid>
            </RadioGroup>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Offers;
