const BASE_URL =process.env.REACT_APP_API_URL

export const fetchUsers = async () => {
  const res = await fetch(`${BASE_URL}/users`);
  return res.json();
};

export const fetchBooks = async () => {
  const res = await fetch(`${BASE_URL}/books`);
  return res.json();
};

export const fetchUserDetails = async (id) => {
  const res = await fetch(`${BASE_URL}/users/${id}`);
  return res.json();
};

export const fetchBookDetails = async (id) => {
  const res = await fetch(`${BASE_URL}/books/${id}`);
  return res.json();
};
export const returnBook = async (userId,bookId) => {
  const res = await fetch(`${BASE_URL}/users/${userId}/return/${bookId}`, {
    method: "POST",
  });
  return res.json();
};
export const borrowBook = async (userId,bookId) => {
  const res = await fetch(`${BASE_URL}/users/${userId}/borrow/${bookId}`, {
    method: "POST",
  });
  return res.json();
};
export const rateBook = async (userId,bookId,rating) => {
  const res = await fetch(`${BASE_URL}/users/${userId}/rate/${bookId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rating }),
  });
  return res.json();
};
export const createUser = async (firstName,lastName,email) => {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstName,lastName,email }),
  });
  return res.json();
};
export const createBook = async (title,author,year,summary,quantity) => {
  const res = await fetch(`${BASE_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title,author,year,summary,quantity }),
  });
  return res.json();
};