import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "store/login";

function MainHeader() {
  const isLoggedIn = useSelector((state) => state.login.isLogged);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(loginAction.logout());
  };

  return (
    <div className="bg-main_green">
      <div className="c_container">
        <div className="flex justify-between py-5  items-center">
          <div>
            <NavLink to="/quotes">
              <h1 className="text-white text-3xl font-bold">
                O'zbek quotalari
              </h1>
            </NavLink>
          </div>
          <ul className="flex items-center gap-4">
            <li>
              <NavLink
                to="/quotes"
                exact
                className="text-white text-xl opacity-70 "
                activeClassName="opacity-100"
              >
                Quotalar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/new-quote"
                className="text-white text-xl opacity-70"
                activeClassName="opacity-100"
              >
                Quota yaratish
              </NavLink>
            </li>
            <li>
              {isLoggedIn ? (
                <button
                  className="text-white text-xl opacity-70 hover:opacity-100"
                  onClick={logoutHandler}
                >
                  Chiqish
                </button>
              ) : (
                <NavLink
                  to="/login"
                  className="text-white text-xl opacity-70"
                  activeClassName="opacity-100"
                >
                  Kirish
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MainHeader;
