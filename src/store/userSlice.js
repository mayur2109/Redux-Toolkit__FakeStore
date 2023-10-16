import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import jwt from "jsonwebtoken";
// import "dotenv/config";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    isLoggedIn: false,
    jwtToken: "",
  },
  reducers: {
    setUsers(state, action) {
      state.data = action.payload;
    },
    setLogIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setToken(state, action) {
      state.jwtToken = action.payload;
    },
    setLogOut(state, action) {
      state.isLoggedIn = false;
      state.jwtToken = "";
    },
  },
});

export const { setUsers, setLogIn, setLogOut, setToken } = userSlice.actions;

export default userSlice.reducer;

// Thunk

export function fetchUsers() {
  return async function fetchUserThunk(dispatch, getState) {
    try {
      const response = await axios.get("https://fakestoreapi.com/users");
      dispatch(setUsers(response.data));
    } catch (err) {
      console.log(err);
    }
  };
}

export function login(uName, pass) {
  return async function loginThunk(dispatch, getState) {
    try {
      const response = await axios.get("https://fakestoreapi.com/users");
      const user = response.data.find(
        (user) => user.username === uName && user.password === pass
      );
      if (user) {
        dispatch(setLogIn(true));
        // let tokenData = {
        //   signIntime: Date.now(),
        //   username: uName,
        // };
        // const token = jwt.sign(tokenData, secret);
        // dispatch(setToken(token));
      } else {
        dispatch(setLogIn(false));
      }
    } catch (err) {
      console.log(err);
    }
  };
}
