import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input } from "@mui/material";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "src/service/localStorage";

const PushPortal = () => {
  const [webUrl, setWebUrl] = useState();
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [iconUrl, setIconUrl] = useState();
  const [action, setAction] = useState();
  const [verifiedWeb, setVerifiedWeb] = useState();
  const URL = process.env.REACT_APP_PROD_API;
  const user2 = getUserFromLocalStorage();
  const accessToken = user2?.data.access_token;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      website_url: webUrl,
      title: title,
      body: body,
      icon: iconUrl,
      clickAction: action,
    };

    console.log("payload", payload);

    // Convert payload object to JSON string
    const requestBody = JSON.stringify(payload);

    // Convert payload object to query parameters
    const queryParams = new URLSearchParams(payload).toString();

    try {
      const apiURL = `${URL}/api/pns/send_notification?${queryParams}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const res = await fetch(apiURL, {
        method: "POST",
        headers: headers,
        body: requestBody,
      });

      if (res.status === 200) {
        toast.success("Notification sent successfully!!");
      }
    } catch (error) {
      console.log("this is error While submitting the data--->", error);
      toast.error("Error While submitting the data!! See Console");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = `${URL}/api/pns/get_pns_site`;
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      logVerifiedWebsites(response.data);
    } catch (error) {
      console.log("Error While Fetching data click --->", error);
      toast.error("Session Expired Please Login Again");
    }
  };

  const logVerifiedWebsites = (data) => {
    const verifiedWebsites = data.filter((item) => item.verified === true);
    verifiedWebsites.forEach((item) => {
      setVerifiedWeb(item.website_url);
      setWebUrl(item.website_url);
    });
  };

  return (
    <div>
      <div>
        <form className="form">
    
          <div className="form-group">
            <label htmlFor="url">Website URL</label>
            <select
              id="urlDropdown"
            >
                <option value={verifiedWeb}>
                  {verifiedWeb}
                </option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <Input
              fullWidth
              name="title"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="body">Body</label>
            <Input
              fullWidth
              name="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Body"
            />
          </div>

          <div className="form-group">
            <label htmlFor="icon">Icon URL</label>
            <Input
              fullWidth
              name="icon"
              value={iconUrl}
              onChange={(e) => setIconUrl(e.target.value)}
              placeholder="Enter Icon URL"
            />
          </div>

          <div className="form-group">
            <label htmlFor="action">Click Action</label>
            <Input
              fullWidth
              name="action"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              placeholder="Enter Click Action URL"
            />
          </div>

          <div className="form-group submit d-flex justify-content-center  align-items-center">
            <Button
              type="submit"
              variant="contained"
              color="success"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PushPortal;