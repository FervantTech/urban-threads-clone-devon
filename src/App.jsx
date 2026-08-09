import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Login from "./pages/Login/Login";
import Cart from "./pages/Cart/Cart";
import "./App.css";

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light",
  );

  // Apply the selected theme and remember it when the page refreshes.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Change between light and dark mode.
  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <BrowserRouter>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
