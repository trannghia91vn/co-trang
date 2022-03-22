import { createSlice } from "@reduxjs/toolkit";

const initLogin = {
  isLogin: null,
  token: "",
};

const loginSlice = createSlice({
  name: "Login Slice",
  initialState: initLogin,
  reducers: {
    login(state, action) {
      if (action.payload !== "" && action.payload !== undefined) {
        state.isLogin = true;
        state.token = action.payload;
        localStorage.setItem('token',action.payload)
      }
    },
    logout(state, action) {
      state.isLogin = null;
      state.token = "";
      localStorage.removeItem('token')
    },
  },
});

export const loginActions = loginSlice.actions;

//Tạo một thunk tiến hành login
export const fetchLogin = (dataLogin) => {
  return async (dispatchFn) => {
    try {
      const response = await fetch("/api/login-cong-ty-beo-nheo", {
        method: "POST",
        body: JSON.stringify(dataLogin),
        headers: { "Content-Type": "application/json" },
      });
      const dataGot = await response.json();
      dispatchFn(loginActions.login(dataGot.token));
    } catch (error) {
      console.log(error);
    }
  };
};

export default loginSlice.reducer;
