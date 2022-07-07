import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./login";
import quoteReducer from "./quote";

const store = configureStore({
  reducer: {
    login: loginReducer.reducer,
    quote: quoteReducer.reducer,
  },
});

export default store;
