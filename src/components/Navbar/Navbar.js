import React from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setLogOut } from "../../store/userSlice";
import "./Navbar.scss";

const Navbar = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart);
  const logoutHandler = () => {
    return () => {
      dispatch(setLogOut());
    };
  };
  return (
    <div className="nav">
      <span className="nav-logo">Logo</span>
      <div className="nav-info">
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="cart">
          Cart
        </Link>
        <span className="nav-counter">Cart items: {items.length}</span>
        <span>
          <button onClick={logoutHandler()}>Logout</button>
        </span>
      </div>
    </div>
  );
};

export default Navbar;
