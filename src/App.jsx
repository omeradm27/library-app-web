import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Books from "./pages/Books";
import UserDetail from "./pages/UserDetail";
import BookDetail from "./pages/BookDetail";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
