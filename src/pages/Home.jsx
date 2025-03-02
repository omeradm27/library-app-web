import React from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const Home = () => {
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
                    gap: 2,
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
                        fontSize: "1rem",
                        px: 4,
                        py: 1.5,
                        backgroundColor: "#3b82f6",
                        color: "white",
                        borderRadius: "8px",
                        transition: "all 0.3s",
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
                        fontSize: "1rem",
                        px: 4,
                        py: 1.5,
                        borderRadius: "8px",
                        transition: "all 0.3s",
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
