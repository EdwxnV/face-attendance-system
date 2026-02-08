import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Sign in with Firebase Auth
      const result = await signInWithEmailAndPassword(auth, email, password);
      const uid = result.user.uid;

      // 2. Read the user profile from Firestore (NEW: unified "users" collection)
      const userDoc = await getDoc(doc(db, "users", uid));

      if (!userDoc.exists()) {
        alert("User profile not found in Firestore.");
        setLoading(false);
        return;
      }

      const data = userDoc.data();
      const role = data.role;

      // 3. Redirect based on role
      if (role === "teacher") {
        navigate("/teacher/home");
      } else {
        navigate("/student/home");
      }
    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Access your account</h2>

        <form onSubmit={handleLogin}>
          <input
            className="login-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="login-btn" disabled={loading}>
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        <p className="login-bottom">
          Don’t have an account? <a href="/">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
