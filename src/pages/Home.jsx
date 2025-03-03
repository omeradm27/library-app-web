import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, useMediaQuery } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const Home = () => {
    const isMobile = useMediaQuery("(max-width:600px)");
    return (
        <Box className="relative w-full h-screen">
            {/* Banner Image */}
            <img
                src="/banner.png"
                alt="Library Banner"
                className="w-full h-auto"
                style={{
                    width: "100%",
                    height: "100vh",
                    objectFit: "cover",
                    display: "block",
                }}
            />

            {/* Buttons Overlay */}
            <Box
                sx={{
                    position: "absolute",
                    top: "75%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    gap: 2,
                    alignItems: "center",
                    width: isMobile ? "80%" : "auto",
                }}
            >
                <Button
                    component={Link}
                    to="/users"
                    variant="contained"
                    color="primary"
                    startIcon={<PeopleIcon />}
                    sx={{
                        textTransform: "none",
                        fontSize: isMobile ? "0.9rem" : "1rem",
                        px: isMobile ? 3 : 4,
                        py: isMobile ? 1 : 1.5,
                        backgroundColor: "#3b82f6",
                        color: "white",
                        borderRadius: "8px",
                        transition: "all 0.3s",
                        width: isMobile ? "100%" : "auto",
                        "&:hover": { backgroundColor: "#2563eb" },
                    }}
                >
                    Users
                </Button>
                <Button
                    component={Link}
                    to="/books"
                    variant="contained"
                    color="success"
                    startIcon={<MenuBookIcon />}
                    sx={{
                        textTransform: "none",
                        fontSize: isMobile ? "0.9rem" : "1rem",
                        px: isMobile ? 3 : 4,
                        py: isMobile ? 1 : 1.5,
                        borderRadius: "8px",
                        transition: "all 0.3s",
                        width: isMobile ? "100%" : "auto",
                        "&:hover": { backgroundColor: "#15803d" },
                    }}
                >
                    Books
                </Button>
            </Box>
        </Box>
    );
};

export default Home;
