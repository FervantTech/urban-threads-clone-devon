import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stopListening = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return stopListening;
  }, []);

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

        {user ? (
          <>
            <span>{user.email}</span>
            <button onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;