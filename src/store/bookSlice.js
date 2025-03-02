import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBooks } from "../api";

export const getBooks = createAsyncThunk("books/getBooks", async () => {
  return await fetchBooks();
});

const bookSlice = createSlice({
  name: "books",
  initialState: {
    list: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(getBooks.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default bookSlice.reducer;
