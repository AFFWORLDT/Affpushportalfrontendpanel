import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      sx={{
        backgroundColor: "#E8E8E8",
        "&:hover": {
          backgroundColor: "rgba(67, 43, 255, 0.8)",
          color: "white",
        },
        width: "100%",
        display: "flex",
        alignItems: "center",
        color: "black",
        px: 3,
        py: 2,
        mb: 2,
        borderRadius: "lg",
      }}
    >
      <Avatar
        mr={2}
        sx={{ cursor: "pointer",width: 32, height: 32  }}
        alt={user.username}
        src={user.avatar}
      />
      <Box>
        <Typography>{user.username}</Typography>
        <Typography variant="body2">
          <b>Email : </b>
          {user.email}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserListItem;
