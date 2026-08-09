import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignUp(event) {
    event.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: userCredential.user.email,
        createdAt: serverTimestamp(),
      });
      setMessage("Account created successfully!");
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleLogin(event) {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("You are logged in!");
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <main className="auth-page">
      <h1>Login or Sign Up</h1>

      <form className="auth-form">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength="6"
          required
        />

        <div>
          <button type="button" onClick={handleLogin}>
            Log In
          </button>

          <button type="button" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
      </form>

      {message && <p>{message}</p>}
    </main>
  );
}

export default Login;
