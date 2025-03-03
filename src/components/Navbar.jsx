import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useMediaQuery } from "@mui/material";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#8BB8AF", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo */}
        <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: "bold", color: "white" }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Library System
          </Link>
        </Typography>

        {/* Desktop Navigation */}
        {!isMobile && (
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
        )}

        {/* Mobile Menu Icon */}
        {isMobile && (
          <IconButton onClick={toggleDrawer} sx={{ color: "white" }}>
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250, display: "flex", flexDirection: "column" }}>
          <IconButton onClick={toggleDrawer} sx={{ alignSelf: "flex-end", m: 1 }}>
            <CloseIcon />
          </IconButton>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/" onClick={toggleDrawer}>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/users" onClick={toggleDrawer}>
                <ListItemText primary="Users" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/books" onClick={toggleDrawer}>
                <ListItemText primary="Books" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
