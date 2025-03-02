import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#8BB8AF", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Library Management System
          </Link>
        </Typography>
        <Box sx={{ display: "flex", gap: 3 }}>
          <Button component={Link} to="/" sx={{ color: "white", textTransform: "none", fontSize: "1rem" }}>
            Home
          </Button>
          <Button component={Link} to="/users" sx={{ color: "white", textTransform: "none", fontSize: "1rem" }}>
            Users
          </Button>
          <Button component={Link} to="/books" sx={{ color: "white", textTransform: "none", fontSize: "1rem" }}>
            Books
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
