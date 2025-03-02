import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../store/bookSlice";
import { createBook } from "../api";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MenuBookIcon from "@mui/icons-material/MenuBook";
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
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import { Link } from "react-router-dom";

const Books = () => {
    const dispatch = useDispatch();
    const { list, status } = useSelector((state) => state.books);
    const [openDialog, setOpenDialog] = useState(false);
    const [newBook, setNewBook] = useState({
        title: "",
        author: "",
        year: "",
        summary: "",
        quantity: 1,
        isAvailable: true,
    });
    const [snackbarInfo, setSnackbarInfo] = useState({ open: false, message: "", severity: "success" });

    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setNewBook({ title: "", author: "", year: "", quantity: 1, isAvailable: true });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        setNewBook((prev) => ({ ...prev, isAvailable: e.target.checked }));
    };

    const handleSaveBook = async () => {
        if (!newBook.title || !newBook.author || !newBook.year || newBook.quantity <= 0) {
            setSnackbarInfo({ open: true, message: "All fields are required, and quantity must be greater than 0!", severity: "warning" });
            return;
        }

        try {
            await createBook(newBook.title, newBook.author, newBook.year, newBook.summary, newBook.quantity).then((res) => {
                if (!res.success) {
                    setSnackbarInfo({ open: true, message: res.message, severity: "error" });
                } else {
                    setSnackbarInfo({ open: true, message: "Book added successfully!", severity: "success" });
                    handleCloseDialog();
                    dispatch(getBooks()); 
                }
            });
        } catch (error) {
            setSnackbarInfo({ open: true, message: "Error adding book!", severity: "error" });
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
            {/* Books Title + Add Book Button */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    Books
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon fontSize="large" />}
                    sx={{ height: "36px", px: 2, textTransform: "none" }}
                    onClick={handleOpenDialog}
                >
                    Add Book
                </Button>
            </Box>

            {/* Books List */}
            <Grid container spacing={3}>
                {list.map((book) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 3,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                maxHeight: "220px",
                                minHeight: "220px",
                                overflow: "hidden",
                                textAlign: "center",
                            }}
                        >
                            <MenuBookIcon fontSize="large" color="primary" sx={{ mb: 1 }} />
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 2, 
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: "100%",
                                }}
                            >
                                {book.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "text.secondary",
                                    mb: 2,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: "100%",
                                }}
                            >
                                {book.author}
                            </Typography>

                            <IconButton component={Link} to={`/books/${book.id}`} color="primary">
                                <VisibilityIcon fontSize="large" />
                            </IconButton>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                <DialogTitle>Add New Book</DialogTitle>
                <DialogContent dividers>
                    <TextField
                        label="Title"
                        name="title"
                        value={newBook.title}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Author"
                        name="author"
                        value={newBook.author}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Summary"
                        name="summary"
                        multiline
                        rows={4}
                        value={newBook.summary}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Published Year"
                        name="year"
                        type="number"
                        value={newBook.year}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Quantity"
                        name="quantity"
                        type="number"
                        value={newBook.quantity}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={newBook.isAvailable} onChange={handleCheckboxChange} />}
                        label="Is Available?"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button onKeyDown={(e) => e.key === "Enter" && handleSaveBook()} onClick={handleSaveBook} color="primary" variant="contained">
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

export default Books;
