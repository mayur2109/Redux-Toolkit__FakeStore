import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

import { useSelector } from "react-redux";

import Home from "./pages/Home";
import Cart from "./pages/Cart/Cart";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Login from "./components/Login/Login";

function App() {
  const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* {!isLoggedIn && <Route path="/" element={<Login />} />} */}
          {isLoggedIn ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route path="/" element={<Login />} />
          )}
          <Route path="cart" element={<Cart />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
