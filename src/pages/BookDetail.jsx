import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReplayIcon from "@mui/icons-material/Replay";
import { fetchBookDetails, fetchUsers, borrowBook, returnBook } from "../api";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box,
  Divider,
  Rating,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import InventoryIcon from "@mui/icons-material/Inventory";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [snackbarInfo, setSnackbarInfo] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    const getBook = async () => {
      try {
        const data = await fetchBookDetails(id);
        setBook(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    const getUsers = async () => {
      try {
        const userData = await fetchUsers();
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getBook();
    getUsers();
  }, [id, loading]);
    const handleReturnBook = async (userId) => {
        try {
            await returnBook(userId, id).then((res) => {
              if(res.success)
                setSnackbarInfo({ open: true, message: "Book returned successfully", severity: "success" });
              else
                setSnackbarInfo({ open: true, message: res.message, severity: "error" });
            });
            setLoading(true);
        } catch (error) {
            console.error("Error returning book:", error);
            setSnackbarInfo({ open: true, message: "Error returning book", severity: "error" });
        }
    };
  const handleLendBook = async () => {
    if (!selectedUser) {
      setSnackbarInfo({ open: true, message: "Please select a user.", severity: "warning" });
      return;
    }

    try {
      await borrowBook(selectedUser, id).then((res) => {
        if (res.success)
          setSnackbarInfo({ open: true, message: "Book lent successfully", severity: "success" });
        else
          setSnackbarInfo({ open: true, message: res.message, severity: "error" });
      });

      const updatedBook = await fetchBookDetails(id);
      setBook(updatedBook);
    } catch (error) {
      console.error("Error lending book:", error);
      setSnackbarInfo({ open: true, message: "Error lending book", severity: "error" });
    }
  };
  const currentBorrowers = book?.borrowRecord.filter((record) => record.returnedAt === null).map((record) => record.user) || [];

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (!book) {
    return <Typography className="text-center text-lg text-red-500">Book not found.</Typography>;
  }

  return (
    <Box sx={{ display: "flex", justifySelf: "center", alignItems: "center", mt: 4, width: "80%" }}>
      <Card sx={{ shadow: "lg", p: 1, rounded: "lg", bg: "white", maxWidth: "4xl", pt: 4 }}>
        <CardContent>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ px: 1, width: "40%", placeItems: "center" }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
                <MenuBookIcon sx={{ mr: 1 }} />
                {book.title}
              </Typography>
              <Typography variant="body1" sx={{ fontStyle: "italic", color: "gray.700", mb: 1 }}>
                {book.author}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" sx={{ display: "flex", alignItems: "center", color: "gray.600" }}>
                <CalendarTodayIcon sx={{ mr: 1, fontSize: "1rem" }} />
                Published in {book.year}
              </Typography>

              {/* Rating & Quantity */}
              <Box sx={{ display: "flex", alignItems: "center", mt: 1, gap: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Rating value={book.rating} precision={0.1} readOnly />
                  <Typography variant="body2" sx={{ ml: 1, fontWeight: "bold" }}>
                    {book.rating} ({book.totalRate})
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <InventoryIcon color="primary" />
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Remain: {book.quantity}
                  </Typography>
                </Box>
              </Box>

              {/* Availability */}
              <Box sx={{ display: "flex", alignItems: "center", mt: 1, gap: 1 }}>
                {book.isAvaliable ? (
                  <>
                    <CheckCircleIcon color="success" />
                    <Typography color="green">Available</Typography>
                  </>
                ) : (
                  <>
                    <CancelIcon color="error" />
                    <Typography color="red">Not Available</Typography>
                  </>
                )}
              </Box>
            </Box>

            <Box sx={{ px: 5, width: "80%" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", display: "flex", alignItems: "center", mb: 1 }}>
                <DescriptionIcon sx={{ mr: 1 }} />
                Summary
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "justify" }}>
                {book.summary || "No summary available for this book."}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 2, display: "flex", alignItems: "center", justifyContent: "end", gap: 1 }}>
            <FormControl sx={{ minWidth: 180, height: "36px" }} size="small">
              <InputLabel>Select User</InputLabel>
              <Select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                label="Select User"
                sx={{ height: "36px" }}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.firstName} {user.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              startIcon={<PersonIcon />}
              sx={{ height: "36px", px: 2, textTransform: "none" }}
              onClick={handleLendBook}
              disabled={!book.isAvaliable || book.quantity === 0} 
            >
              Lend Book
            </Button>
          </Box>


          <Divider sx={{ my: 2 }} />

          {/* Borrow History and Current Borrower */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Borrow History */}
            <Box sx={{ width: "60%" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", display: "flex", alignItems: "center", mb: 1 }}>
                <HistoryIcon sx={{ mr: 1 }} />
                Borrow History
              </Typography>

              {book.borrowRecord.length > 0 ? (
                <List sx={{ width: "100%" }}>
                  {book.borrowRecord.map((record) => (
                    <ListItem key={record.id} sx={{ borderBottom: "1px solid #e0e0e0" }}>
                      <ListItemIcon>
                        <PersonIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={`User: ${record.user.firstName} ${record.user.lastName}`} />
                      <ListItemText
                        primary={`Borrowed At: ${new Date(record.borrowedAt).toLocaleString()}`}
                        secondary={`Returned At: ${record.returnedAt ? new Date(record.returnedAt).toLocaleString() : "Not Returned"}`}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No borrow history available.
                </Typography>
              )}
            </Box>

            {/* Lended Persons */}
            <Box sx={{ width: "35%" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", display: "flex", alignItems: "center", mb: 1 }}>
                <PersonIcon sx={{ mr: 1 }} />
                Lended Persons
              </Typography>

              {currentBorrowers.length > 0 ? (
                <List>
                  {currentBorrowers.map((user) => (
                    <ListItem key={user.id} sx={{ borderBottom: "1px solid #e0e0e0" }}>
                      <ListItemIcon>
                        <PersonIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={`${user.firstName} ${user.lastName}`} />
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<ReplayIcon />}
                        onClick={() => handleReturnBook(user.id)}
                      >
                        Return
                      </Button>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  Not currently borrowed
                </Typography>
              )}
            </Box>

          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button component={Link} to="/books" variant="contained" startIcon={<ArrowBackIcon />} sx={{ textTransform: "none", borderRadius: "8px" }}>
              Back to Books
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Snackbar open={snackbarInfo.open} autoHideDuration={3000} onClose={() => setSnackbarInfo({ ...snackbarInfo, open: false })}>
        <Alert severity={snackbarInfo.severity} onClose={() => setSnackbarInfo({ ...snackbarInfo, open: false })}>
          {snackbarInfo.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BookDetails;
