import { createSlice } from "@reduxjs/toolkit";

const initialBag = JSON.parse(localStorage.getItem("trendvogue_bag") || "[]");

const bagSlice = createSlice({
  name: "bag",
  initialState: initialBag,
  reducers: {
    addToBag: (state, action) => {
      if (!state.includes(action.payload)) {
        state.push(action.payload);
        localStorage.setItem("trendvogue_bag", JSON.stringify(state));
      }
    },
    removeFromBag: (state, action) => {
      const updated = state.filter((item) => item !== action.payload);
      localStorage.setItem("trendvogue_bag", JSON.stringify(updated));
      return updated;
    },
    clearBag: () => {
      localStorage.setItem("trendvogue_bag", JSON.stringify([]));
      return [];
    },
  },
});

export const bagAction = bagSlice.actions;
export default bagSlice;