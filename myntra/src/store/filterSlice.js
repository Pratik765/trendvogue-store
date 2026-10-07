import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    category: "All",
    searchQuery: "",
    sortBy: "default",
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    resetFilters: (state) => {
      state.category = "All";
      state.searchQuery = "";
      state.sortBy = "default";
    },
  },
});

export const filterAction = filterSlice.actions;
export default filterSlice;
