import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "src/service/localStorage";
import LinearProgress from "@mui/material/LinearProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Helmet } from "react-helmet-async";
import { Link, TableContainer } from "@mui/material";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import Button from "@mui/material/Button";

const PushHistory = () => {
  const URL = process.env.REACT_APP_PROD_API;
  const user = getUserFromLocalStorage();
  const accessToken = user?.data.access_token;
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const historyDetails = async () => {
    try {
      setLoading(true);
      const url = `${URL}/api/pns/get_pns_history`;
      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("this is response--->", res?.data);
      setHistory(res?.data);
      setLoading(false);
    } catch (error) {
      console.log("Error While Getting History Details--->", error);
      toast.error("Error While Getting History Details!!");
    }
  };

  useEffect(() => {
    historyDetails();
  }, []);
  const formatLocalDate = (timestamp) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(timestamp).toLocaleDateString("en-IN", options);
  };
  return (
    <>
      <h2 className="text-center mb-2">Push History here!!</h2>

      <Helmet>
        <title> Push History | Affworld </title>
      </Helmet>

      <TableContainer component={Paper}>
        <Table
          id="offers-table"
          sx={{ minWidth: 650 }}
          aria-label="simple table"
        >
          {loading ? (
            <LinearProgress />
          ) : (
            <>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Icon</TableCell>

                  <TableCell align="center">Body</TableCell>
                  <TableCell align="center">Title</TableCell>

                  <TableCell align="center">Click Action</TableCell>
                  <TableCell align="center">Success</TableCell>
                  <TableCell align="center">Web URL</TableCell>
                  <TableCell align="center">Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {history?.length === 0 ? (
                  <TableRow>
                    <TableCell align="center" colSpan={3}>
                      No Data Found
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {history?.map((rowData) => (
                      <TableRow key={rowData?.affiliate_id}>
                        <TableCell align="center" key={rowData?.icon}>
                          {" "}
                          <img
                            src={rowData?.icon}
                            alt="icon"
                            style={{ width: 100 }}
                          />{" "}
                        </TableCell>
                        <TableCell align="center">{rowData?.body}</TableCell>
                        <TableCell align="center">{rowData?.title}</TableCell>

                        <TableCell align="center">
                          {" "}
                          <Link
                            target="_blank"
                            rel="noopener"
                            href={rowData?.clickAction}
                            variant="body2"
                            style={{ textDecoration: "none" }}
                          >
                            Check Here!!
                          </Link>{" "}
                        </TableCell>
                        <TableCell align="center">
                          {rowData?.success === true ? (
                            <CloudDoneIcon color="success" />
                          ) : (
                            <CloseIcon color="error" />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {" "}
                          <Link
                            target="_blank"
                            rel="noopener"
                            href={rowData?.website_url}
                            style={{ textDecoration: "none" }}
                            variant="body2"
                          >
                            URL
                          </Link>{" "}
                        </TableCell>
                        <TableCell align="center">
                          {formatLocalDate(rowData?.timestamp)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody>
            </>
          )}
        </Table>
      </TableContainer>
    </>
  );
};

export default PushHistory;
