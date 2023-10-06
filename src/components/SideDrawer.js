import React, { useState } from "react";
import {
  Button,
  Input,
  Drawer,
  Paper,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import { KeyboardArrowDown, Notifications, Search } from "@mui/icons-material"; // Correct import for icons
import { useNavigate } from "react-router-dom";
import DialogContent from "@mui/material/DialogContent"; // Import DialogContent from @mui/material
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress from @mui/material
import { ToastContainer, toast } from "react-toastify";
import api from "../utils/axios";
import { useAppContext } from "../context/ChatProvider";
import { getSender } from "../config/chat";
import { removeUserFromLocalStorage } from "../utils/localStorage";
import "react-toastify/dist/ReactToastify.css";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";
import ProfileModal from "./ProfileModal";
import avatar from "../images/avatar.png";
import managerPhoto from "../images/manager.jpeg";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const navigate = useNavigate();

  const {
    onOpen,
    onClose,
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = useAppContext();

  const {
    isOpen,     // Correctly import isOpen
    setIsOpen,  // Correctly import setIsOpen
    // Add other context values here
  } = useAppContext();
  
  const logoutHandler = () => {
    removeUserFromLocalStorage("user");
    removeUserFromLocalStorage("res");
    navigate("/register");
  };

  const handleSearch = async () => {
    if (!search) {
      toast.error("Please Provide username");
      return;
    }

    try {
      setLoading(true);
      const { data } = await api.get(`/api/v1/auth/users?search=${search}`);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.error(error);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const { data } = await api.post(`/api/v1/chat`, {
        userId,
      });

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast.error(error);
    }
  };

  const handleClick = () => {
    navigate("/");
  };


  return (
    <>
      <Paper
        elevation={3}
        style={{
          padding: 16,
          borderRadius: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background:
            "linear-gradient(110.29deg, #2E5CFF 11.11%, #973DF0 60.96%)",
          textFillColor: "text",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: 700,
        }}
      >
        <IconButton onClick={() => setIsOpen(!isOpen)}>
        <KeyboardArrowDown /> {/* Correct icon for down-chevron */}
        </IconButton>
        <Typography
          onClick={handleClick}
          variant="h3"
          fontFamily="Poppins"
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          AffWorld
        </Typography>
        <div>
        <Menu>
            <IconButton>
              {notification.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    left: "12px",
                    fontWeight: "bold",
                    fontSize: "10px",
                    color: "white",
                    background: "red",
                    borderRadius: "50%",
                    padding: "2px 6px",
                  }}
                >
                  New Message
                </span>
              )}
              <Notifications fontSize="large" />
            </IconButton>
            <MenuList>
              {!notification.length && "No New Message"}
              {notification.map((noti) => (
                <MenuItem
                  key={noti._id}
                  onClick={() => {
                    setSelectedChat(noti.chat);
                    setNotification(notification.filter((n) => n !== noti));
                  }}
                >
                  {noti.chat.isGroupChat
                    ? `New Message in ${noti.chat.chatName}`
                    : `New Message from ${getSender(user, noti.chat.users)}`
                  }
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <IconButton>
              <Avatar
                size="small"
                cursor="pointer"
                name={user.name}
                src={avatar}
              />
            </IconButton>
            <MenuList>
              <MenuItem>My Profile</MenuItem>
              <ProfileModal user={user} />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Paper>
      <Drawer
        placement="left"
        onClose={() => setIsOpen(false)}
        open={isOpen}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "gray.200",
          }}
        >
          <Typography variant="h4" fontFamily="Poppins" height="max-content" margin="20px">
            Search Users
          </Typography>
          <DialogContent>
            <div
              style={{
                  display: "flex",
                  paddingBottom: "20px",
              }}
            >
              <Input
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </div>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult && searchResult.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && (
              <CircularProgress ml="auto" style={{ display: "flex" }} />
            )}
          </DialogContent>
        </div>
      </Drawer>
      <ToastContainer />
    </>
  );
};

export default SideDrawer;
