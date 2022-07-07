import React, { useState, useEffect } from "react";
import useHttp from "hooks/useHttp";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActionApi } from "apis";
import { loginAction } from "store/login";
const Login = (props) => {
  // Native hoooks
  const [form, setForm] = useState({
    password: "",
    email: "",
  });

  const [formError, setErrorForm] = useState({
    error_name: "",
  });
  const distpatch = useDispatch();
  const history = useHistory();

  // Custom Hooks
  const {
    sendRequest: sendLoginRequest,
    error,
    status,
    data,
  } = useHttp(authActionApi);

  // Methods

  useEffect(() => {
    setErrorForm({
      error_name: error,
    });
  }, [error]);

  useEffect(() => {
    if (data) {
      distpatch(loginAction.login({ token: data.idToken }));
      history.push("/quotes");
    }
  }, [data, history, distpatch]);

  const formHandler = (e) => {
    setErrorForm({
      error_name: "",
    });
    setForm((state) => {
      return {
        ...state,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { password, email } = form;

    if (!password || !email) {
      setErrorForm({
        error_name: "Parol, emaildan biri kirtilmagan. Iltimos kiriting!",
      });
      return;
    }

    if (password.length < 5) {
      setErrorForm({
        error_name: "Parol 5 ta belgidan kop yoki teng bo'lishi kerak",
      });
      return;
    }

    sendLoginRequest(
      {
        email,
        password,
        returnSecureToken: true,
      },
      true
    );
  };

  return (
    <div className="col-span-6 my-5 shadow-card bg-white p-3 rounded-xl ">
      <h2 className="text-center text-3xl font-medium italic">
        O'zbek quotlari saytiga kirish
      </h2>
      <form
        className="mt-8  space-y-6"
        autocomplete="off"
        onSubmit={submitHandler}
      >
        {formError.error_name && (
          <p className="bg-red-400 p-2 text-white rounded">
            {formError.error_name}
          </p>
        )}
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="false"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email pochtangiz"
              value={form.email}
              onChange={formHandler}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="false"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Maxfiy parolingiz"
              value={form.password}
              onChange={formHandler}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={status === "pending"}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-main_green hover:bg-main_green/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {status === "pending" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="animate-spin"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M12 2a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm0 15a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0v-3a1 1 0 0 1 1-1zm10-5a1 1 0 0 1-1 1h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 1 1zM7 12a1 1 0 0 1-1 1H3a1 1 0 0 1 0-2h3a1 1 0 0 1 1 1zm12.071 7.071a1 1 0 0 1-1.414 0l-2.121-2.121a1 1 0 0 1 1.414-1.414l2.121 2.12a1 1 0 0 1 0 1.415zM8.464 8.464a1 1 0 0 1-1.414 0L4.93 6.344a1 1 0 0 1 1.414-1.415L8.464 7.05a1 1 0 0 1 0 1.414zM4.93 19.071a1 1 0 0 1 0-1.414l2.121-2.121a1 1 0 1 1 1.414 1.414l-2.12 2.121a1 1 0 0 1-1.415 0zM15.536 8.464a1 1 0 0 1 0-1.414l2.12-2.121a1 1 0 0 1 1.415 1.414L16.95 8.464a1 1 0 0 1-1.414 0z"
                  fill="rgba(255,255,255,1)"
                />
              </svg>
            ) : (
              "Kirish"
            )}
          </button>
        </div>

        <div className="flex justify-center">
          <button
            className="b-none"
            type="button"
            onClick={props.onToggleHandler}
          >
            Ro'yxatdan o'tish
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
