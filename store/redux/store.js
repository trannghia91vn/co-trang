import { configureStore } from "@reduxjs/toolkit";
import qlhsSlice from "./quan-ly-hoc-sinh/qlhs-slice";
import qlgvSlice from "./quan-ly-giao-vien/qlgv-slice";
import qllnSlice from "./quan-ly-lop-nhom/qlln-slice";
import loadingSlice from "./loading/loading-slice";

const Store = configureStore({
  reducer: {
    qlhs: qlhsSlice,
    qlgv : qlgvSlice,
    qlln : qllnSlice,
    loading : loadingSlice,
  },
});

export default Store;
