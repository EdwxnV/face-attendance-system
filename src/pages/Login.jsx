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
      const result = await signInWithEmailAndPassword(auth, email, password);
      const uid = result.user.uid;

      // Check both student and teacher collections
      let userDoc = await getDoc(doc(db, "teachers", uid));
      if (userDoc.exists()) {
        navigate("/teacher/home");
        return;
      }

      userDoc = await getDoc(doc(db, "students", uid));
      if (userDoc.exists()) {
        navigate("/student/home");
        return;
      }

      alert("User profile not found.");
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
