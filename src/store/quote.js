import { createSlice } from "@reduxjs/toolkit";
import { sendQuoteRequest, getAllQuotes, getSingleQuote } from "apis/index";
const initialState = {
  quotesList: [],
  notifaction: {
    status: "",
    error: null,
  },
  loading: false,
  singleQuote: {
    loading: false,
    value: {},
    error: null,
  },
};

const quotes = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    resetNotifaction(state) {
      state.notifaction = {
        status: null,
        error: null,
      };
    },
    refillQuotesList(state, { payload }) {
      state.quotesList = payload.list;
    },
    limitQuoteJs(state, { payload }) {},
    showNotifaction(state, { payload }) {
      state.notifaction = {
        status: payload.status,
        error: payload.error,
      };
    },

    setLoading(state, { payload }) {
      state.loading = payload.loading;
    },

    setSingleQuote(state, { payload }) {
      state.singleQuote.loading = payload.loading;
      state.singleQuote.error = payload.error;
      state.singleQuote.value = payload.singleQuote;
    },
  },
});
export const quotesAction = quotes.actions;

export const sendQuoteThunk = (main_data) => {
  return async (dispatch) => {
    dispatch(
      quotesAction.showNotifaction({
        status: "pending",
        error: null,
      })
    );

    try {
      await sendQuoteRequest(main_data);
      dispatch(
        quotesAction.showNotifaction({
          status: "success",
          error: null,
        })
      );
    } catch (error) {
      dispatch(
        quotesAction.showNotifaction({
          status: "error",
          error: error.message,
        })
      );
    }
  };
};

export const fillAllQuotes = (payloads) => {
  return async (dispatch) => {
    dispatch(
      quotesAction.setLoading({
        loading: true,
      })
    );

    try {
      const list = await getAllQuotes(payloads);
      dispatch(quotesAction.refillQuotesList({ list }));

      setTimeout(() => {
        dispatch(
          quotesAction.setLoading({
            loading: false,
          })
        );
      }, 1000);
    } catch (error) {
      dispatch(
        quotesAction.setLoading({
          loading: false,
        })
      );
    }
  };
};

export const fillSingleQuote = (id) => {
  return async (dispatch) => {
    dispatch(
      quotesAction.setSingleQuote({
        singleQuote: {},
        loading: true,
        error: null,
      })
    );

    try {
      const singleQuote = await getSingleQuote(id);
      dispatch(
        quotesAction.setSingleQuote({
          singleQuote,
          loading: false,
          error: null,
        })
      );
    } catch (error) {
      dispatch(
        quotesAction.setSingleQuote({
          singleQuote: {},
          loading: true,
          error: error,
        })
      );
    }
  };
};

export default quotes;
