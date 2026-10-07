import { createSlice } from "@reduxjs/toolkit";

const initialWishlist = JSON.parse(localStorage.getItem("trendvogue_wishlist") || "[]");

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialWishlist,
  reducers: {
    toggleWishlist: (state, action) => {
      const id = action.payload;
      const index = state.indexOf(id);
      let updated;
      if (index >= 0) {
        updated = state.filter((item) => item !== id);
      } else {
        updated = [...state, id];
      }
      localStorage.setItem("trendvogue_wishlist", JSON.stringify(updated));
      return updated;
    },
  },
});

export const wishlistAction = wishlistSlice.actions;
export default wishlistSlice;
