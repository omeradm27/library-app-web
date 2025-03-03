import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HistoryIcon from "@mui/icons-material/History";
import { fetchUserDetails, rateBook, returnBook } from "../api";
import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    CircularProgress,
    Box,
    Divider,
    Button,
    Rating,
    Alert,
    Snackbar,
} from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import ReplayIcon from "@mui/icons-material/Replay";

const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ratings, setRatings] = useState({});
    const [snackbarInfo, setSnackbarInfo] = useState({ open: false, message: "", severity: "success" });
    const navigate = useNavigate();
    useEffect(() => {
        const getUser = async () => {
            try {
                const data = await fetchUserDetails(id);
                setUser(data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            } finally {
                setLoading(false);
            }
        };
        getUser();
    }, [id, loading]);

    const handleReturnBook = async (bookId) => {
        try {
            await returnBook(id, bookId);
            setSnackbarInfo({ open: true, message: "Book returned successfully", severity: "success" });
            setLoading(true);
        } catch (error) {
            console.error("Error returning book:", error);
            setSnackbarInfo({ open: true, message: "Error returning book", severity: "error" });
        }
    };

    const handleRateBook = async (bookId) => {
        const rating = ratings[bookId];
        if (!rating) {
            setSnackbarInfo({ open: true, message: "Please rate the book before submitting", severity: "warning" });
            return;
        }

        try {
            await rateBook(id, bookId, rating).then((res) => {
                if (res.success)
                    setSnackbarInfo({ open: true, message: "Rating submitted successfully", severity: "success" });
                else
                    setSnackbarInfo({ open: true, message: res.message, severity: "error" });

            });
            setLoading(true);
        } catch (error) {
            console.error("Error rating book:", error);
            setSnackbarInfo({ open: true, message: "Error rating book", severity: "error" });
        }
    };

    if (loading) {
        return (
            <Box className="flex justify-center items-center h-screen">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Card sx={{ maxWidth: "80%", mx: "auto", mt: 4, p: 3 }}>
            <CardContent>
                <Box sx={{ display: "flex", gap: 4, alignItems: "flex-start" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", boxShadow: 2, p: 3, borderRadius: "1rem" }}>
                        <img src="https://picsum.photos/200" alt="User" style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
                        <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2 }}>
                            {user.firstName} {user.lastName}
                        </Typography>
                        <Typography variant="h6" color="textSecondary">
                            {user.email}
                        </Typography>
                    </Box>

                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", display: "flex", alignItems: "center", mb: 2 }}>
                            <BookIcon sx={{ mr: 1 }} />
                            Currently Borrowed Books
                        </Typography>
                        {user.borrowedBooks.length > 0 ? (
                            <List>
                                {user.borrowedBooks.map((borrow) =>
                                    borrow.returnedAt === null && (
                                        <ListItem key={borrow.id} sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                <ListItemIcon onClick={() => navigate(`/books/${borrow.book.id}`)} style={{ cursor: "pointer" }}>
                                                    <BookIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={
                                                        <Typography
                                                            variant="body1"
                                                            color="primary"
                                                            sx={{ cursor: "pointer" }}
                                                            onClick={() => navigate(`/books/${borrow.book.id}`)}
                                                        >
                                                            {borrow.book.title}
                                                        </Typography>
                                                    }
                                                    secondary={
                                                        <Typography
                                                            variant="body2"
                                                            color="textSecondary"
                                                            sx={{ cursor: "pointer" }}
                                                            onClick={() => navigate(`/books/${borrow.book.id}`)}
                                                        >
                                                            Author: {borrow.book.author}
                                                        </Typography>
                                                    }
                                                />
                                            </Box>

                                            {/* Rating Component */}
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                                <Rating
                                                    name={`rate-${borrow.book.id}`}
                                                    value={ratings[borrow.book.id] || 0}
                                                    onChange={(event, newValue) => {
                                                        setRatings((prev) => ({
                                                            ...prev,
                                                            [borrow.book.id]: newValue,
                                                        }));
                                                    }}
                                                    precision={1}
                                                />
                                                <Button variant="contained" color="primary" size="small" onClick={() => handleRateBook(borrow.book.id)}>
                                                    Submit
                                                </Button>
                                            </Box>

                                            <Button
                                                variant="contained"
                                                color="error"
                                                size="small"
                                                startIcon={<ReplayIcon />}
                                                onClick={() => handleReturnBook(borrow.book.id)}
                                            >
                                                Return
                                            </Button>
                                        </ListItem>
                                    )
                                )}
                            </List>
                        ) : (
                            <Typography variant="body2" color="textSecondary">
                                No borrowed books.
                            </Typography>
                        )}
                    </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ mt: 3, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", display: "flex", alignItems: "center", mb: 1 }}>
                        <HistoryIcon sx={{ mr: 1 }} />
                        Reading History
                    </Typography>
                    {user.borrowedBooks.filter((b) => b.returnedAt !== null).length > 0 ? (
                        <List sx={{ width: "100%" }}>
                            {user.borrowedBooks
                                .filter((b) => b.returnedAt !== null)
                                .map((borrow) => (
                                    <ListItem key={borrow.id} sx={{ borderBottom: "1px solid #e0e0e0", width: "100%" }}>
                                        <ListItemIcon>
                                            <HistoryIcon color="success" />
                                        </ListItemIcon>
                                        <ListItemText primary={borrow.book.title} secondary={`Author: ${borrow.book.author}`} />
                                        <ListItemText
                                            primary={`Borrowed At: ${new Date(borrow.borrowedAt).toLocaleString()}`}
                                            secondary={`Returned At: ${new Date(borrow.returnedAt).toLocaleString()}`}
                                        />
                                    </ListItem>
                                ))}
                        </List>
                    ) : (
                        <Typography variant="body2" color="textSecondary">
                            No reading history available.
                        </Typography>
                    )}
                </Box>
            </CardContent>

            <Snackbar open={snackbarInfo.open} autoHideDuration={3000} onClose={() => setSnackbarInfo({ ...snackbarInfo, open: false })}>
                <Alert severity={snackbarInfo.severity} onClose={() => setSnackbarInfo({ ...snackbarInfo, open: false })}>
                    {snackbarInfo.message}
                </Alert>
            </Snackbar>
        </Card>
    );
};

export default UserDetail;
