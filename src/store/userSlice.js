import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers } from "../api";

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  return await fetchUsers();
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(getUsers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default userSlice.reducer;
