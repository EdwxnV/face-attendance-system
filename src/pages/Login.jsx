import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      // 1. Authenticate user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Fetch Firestore role
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        alert("User profile not found in database.");
        return;
      }

      const { role } = userSnap.data();

      // 3. Redirect by role
      if (role === "teacher") {
        navigate("/teacher/home");
      } else {
        navigate("/student/home");
      }

    } catch (error) {
      if (error.code === "auth/wrong-password") {
        alert("Incorrect password");
      } else if (error.code === "auth/user-not-found") {
        alert("No account found with this email");
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Log In</h2>
        <p className="subtitle">Access your account</p>

        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleLogin} disabled={loading}>
          {loading ? "Logging In..." : "Log In"}
        </button>

        <p className="login-bottom">
          Don’t have an account? <Link to="/">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
