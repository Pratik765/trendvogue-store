import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "./itemSlice";
import fetchStatusSlice from "./fetchStatusSlice";
import bagSlice from "./bagSlice";
import wishlistSlice from "./wishlistSlice";
import filterSlice from "./filterSlice";

const store = configureStore({
  reducer: {
    item: itemSlice.reducer,
    fetchStatus: fetchStatusSlice.reducer,
    bag: bagSlice.reducer,
    wishlist: wishlistSlice.reducer,
    filter: filterSlice.reducer,
  },
});

export default store;