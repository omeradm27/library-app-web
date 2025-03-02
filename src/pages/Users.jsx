import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, } from "../store/userSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import {
    Typography,
    IconButton,
    Box,
    CircularProgress,
    Grid,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Snackbar,
    Alert,
} from "@mui/material";

import { Link } from "react-router-dom";
import { createUser } from "../api";

const Users = () => {
    const dispatch = useDispatch();
    const { list, status } = useSelector((state) => state.users);

    const [openDialog, setOpenDialog] = useState(false);
    const [newUser, setNewUser] = useState({ firstName: "", lastName: "", email: "" });
    const [snackbarInfo, setSnackbarInfo] = useState({ open: false, message: "", severity: "success" });

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setNewUser({ firstName: "", lastName: "", email: "" });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveUser = async () => {
        if (!newUser.firstName || !newUser.lastName || !newUser.email) {
            setSnackbarInfo({ open: true, message: "All fields are required!", severity: "warning" });
            return;
        }

        try {
            await createUser(newUser.firstName, newUser.lastName, newUser.email).then((res) => {
                if (!res.success) {
                    setSnackbarInfo({ open: true, message: res.message, severity: "error" });
                } else {
                    setSnackbarInfo({ open: true, message: "User added successfully!", severity: "success" });
                }
            });
            handleCloseDialog();
            dispatch(getUsers()); 
        } catch (error) {
            setSnackbarInfo({ open: true, message: "Error adding user!", severity: "error" });
        }
    };

    if (status === "loading") {
        return (
            <Box className="flex justify-center items-center h-screen">
                <CircularProgress />
            </Box>
        );
    }

    if (status === "failed") {
        return <Box className="text-center text-lg text-red-500">Error loading data.</Box>;
    }

    return (
        <Box sx={{ maxWidth: "90%", mx: "auto", mt: 4 }}>
            {/* Users Title + Add User Button */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    Users
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={ <AddIcon fontSize="large" />}
                    sx={{ height: "36px", px: 2, textTransform: "none" }}
                    onClick={handleOpenDialog}
                >
                    Add User
                </Button>
            </Box>
            <Grid container spacing={3}>
                {list.map((user) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
                        <Paper elevation={3} sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <PersonIcon fontSize="large" color="primary" />
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                {user.firstName} {user.lastName}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                                {user.email}
                            </Typography>
                            <IconButton component={Link} to={`/users/${user.id}`} color="primary">
                                <VisibilityIcon fontSize="large" />
                            </IconButton>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            {/* Add User Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                <DialogTitle>Add New User</DialogTitle>
                <DialogContent dividers>
                    <TextField
                        label="First Name"
                        name="firstName"
                        value={newUser.firstName}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        value={newUser.lastName}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={newUser.email}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveUser} color="primary" variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar Notification */}
            <Snackbar open={snackbarInfo.open} autoHideDuration={3000} onClose={() => setSnackbarInfo({ ...snackbarInfo, open: false })}>
                <Alert severity={snackbarInfo.severity} onClose={() => setSnackbarInfo({ ...snackbarInfo, open: false })}>
                    {snackbarInfo.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Users;
