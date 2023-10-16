import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, login } from "../../store/userSlice";

import "./Login.scss";

const Login = () => {
  const dispatch = useDispatch();
  const { data, isLoggedin } = useSelector((state) => state.user);
  console.log(data);

  const loginHandler = () => {
    return (e) => {
      e.preventDefault();
      const uName = e.target.uname.value;
      const pass = e.target.pass.value;
      dispatch(login(uName, pass));
      console.log(isLoggedin);
    };
  };
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="login-form">
      <div className="title">LOGIN</div>
      <div className="form">
        <form onSubmit={loginHandler()}>
          <div className="input-container">
            <label>Username </label>
            <input
              type="text"
              name="uname"
              onChange={(e) => console.log(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label>Password </label>
            <input
              type="password"
              name="pass"
              onChange={(e) => console.log(e.target.value)}
              required
            />
          </div>
          <div className="button-container">
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
