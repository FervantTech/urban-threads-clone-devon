import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

function Navbar({ theme, toggleTheme }) {
  const [user, setUser] = useState(null);

  // Keep the navbar updated whenever the user logs in or logs out.
  useEffect(() => {
    const stopListening = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return stopListening;
  }, []);

  // Sign the current user out of Firebase Authentication.
  async function handleLogout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <nav>
      <Link to="/">Urban Threads</Link>

      <div>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">Cart</Link>

        <button
          className="theme-button"
          aria-label={theme === "light" ? "Turn on dark mode" : "Turn on light mode"}
          title={theme === "light" ? "Dark mode" : "Light mode"}
          onClick={toggleTheme}
        >
          <span className="material-symbols-sharp">
            {theme === "light" ? "dark_mode" : "light_mode"}
          </span>
        </button>

        {user ? (
          <>
            <span>{user.email}</span>
            <button className="blue-hover" onClick={handleLogout}>
              Log Out
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
