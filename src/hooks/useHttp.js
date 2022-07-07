import { useReducer, useCallback, useMemo } from "react";

const httpReducer = (state, action) => {
  if (action.type === "Success") {
    return {
      data: action.data,
      error: null,
      status: "completed",
    };
  }

  if (action.type === "Error") {
    return {
      data: null,
      error: action.error,
      status: "completed",
    };
  }

  if (action.type === "Send") {
    return {
      data: null,
      error: null,
      status: "pending",
    };
  }

  return state;
};

const useHttp = (cb, startPending = false) => {
  const [http, dispatch] = useReducer(httpReducer, {
    data: null,
    status: startPending ? "pending" : null,
    error: null,
  });

  const sendRequest = useCallback(
    async (requestData, login = false) => {
      dispatch({ type: "Send" });

      try {
        const data = await cb(requestData, login);
        dispatch({ type: "Success", data });
      } catch (error) {
        dispatch({
          type: "Error",
          error: error.message || "Something went wrong!",
        });
      }
    },

    [cb]
  );

  return {
    ...http,
    sendRequest,
  };
};

export default useHttp;
