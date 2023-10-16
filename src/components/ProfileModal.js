import React from "react";
import {
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { Visibility as ViewIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getResFromLocalStorage } from "../utils/localStorage";
import avatar from "../images/avatar.png";
import account from "src/_mock/account";

const ProfileModal = ({ user, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/paymentDetails");
  };

  const handleClickEdit = () => {
    navigate("/userDetails");
  };

  const handleFinance = () => {
    navigate("/finance");
  };
  const handleDynamicAds = () => {
    navigate("/dynamicAds");
  };

  const user1 = getResFromLocalStorage();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {children ? (
        <button
          onClick={handleOpen}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleOpen();
            }
          }}
          tabIndex={0}
        >
          {children}
        </button>
      ) : (
        <IconButton
          style={{ display: "flex" }}
          onClick={handleOpen}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleOpen();
            }
          }}
        >
          <ViewIcon />
        </IconButton>
      )}
      <Dialog onClose={handleClose} open={isOpen} fullWidth>
        <DialogTitle>

          Hi ! {account?.displayName}
        </DialogTitle>
        <DialogContent>
          <img
            src={account?.photoURL}
            alt={account?.displayName}
            style={{
              // borderRadius: "60%",
              margin: "10px",
              width: "150px",
              height: "150px",
            }}
          />
          <Typography variant="subtitle1" gutterBottom>
            Email: {user1?.data.email}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            here we areeeeeeeeeeeeeee
            <br />
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            Payment Details
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickEdit}
          >
            Overview
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFinance}
          >
            Finance
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDynamicAds}
          >
            DynamicAds
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfileModal;
