import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SocialButton from "./SocialButton";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function RightPanel() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!email || !password || !role) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        role,
        createdAt: new Date(),
      });

      if (role === "teacher") navigate("/teacher/home");
      else navigate("/student/home");

    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already registered. Please log in instead.");
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="right-panel">
      <div className="right-content">
        <h2>Sign Up Account</h2>
        <p className="subtitle">Enter your personal data to create your account</p>

        {/* UPDATED SOCIAL BUTTONS */}
        <div className="social-buttons">
          <SocialButton label="Github" />
          <SocialButton label="Google" />
        </div>

        <div className="divider">
          <span></span><p>or</p><span></span>
        </div>

        <div className="row">
          <input placeholder="eg. John" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input placeholder="eg. Francess" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>

        <input
          type="email"
          placeholder="eg.johnfran@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select className="role-select" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="" disabled>Select your role</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <div className="password-box">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={() => setShow(!show)}>👁</span>
        </div>

        <button className="submit-btn" onClick={handleSignup} disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="login-text">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}
