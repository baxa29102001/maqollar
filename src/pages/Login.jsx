import React, { useState } from "react";
import LoginForm from "components/Auth/LoginForm";
import RegisterForm from "components/Auth/RegisterForm";

const Login = () => {
  const [login, setLogin] = useState(false);
  const toggleFormHandler = () => {
    setLogin(!login);
  };
  return (
    <section className="grid grid-cols-12">
      <div className="col-span-3"></div>
      {!login && <LoginForm onToggleHandler={toggleFormHandler} />}
      {login && <RegisterForm onToggleHandler={toggleFormHandler} />}
      <div className="col-span-3"></div>
    </section>
  );
};

export default Login;
