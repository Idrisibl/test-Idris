import { configureStore } from "@reduxjs/toolkit";
import card from "./cardSlice";
import filter from "./filterSlice";

export const store = configureStore({
  reducer: {
    card,
    filter,
  },
});
