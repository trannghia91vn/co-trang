import { configureStore } from "@reduxjs/toolkit";
import qlhsSlice from "./quan-ly-hoc-sinh/qlhs-slice";

const Store = configureStore({
  reducer: {
    qlhs: qlhsSlice,
  },
});

export default Store;
