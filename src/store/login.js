import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: !!localStorage.getItem("token"),
  token: localStorage.getItem("token") || null,
};

const loginReducer = createSlice({
  name: "login",
  initialState,
  reducers: {
    login(state, action) {
      const token = action.payload.token;
      state.isLogged = !!token;
      state.token = token;
      localStorage.setItem("token", token);
    },
    logout(state) {
      state.isLogged = false;
      state.token = null;

      localStorage.removeItem("token");
    },
  },
});

export const loginAction = loginReducer.actions;

export default loginReducer;
