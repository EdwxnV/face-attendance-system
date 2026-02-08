import { useState } from "react";
import "../styles/signup.css";

export default function RightPanel({ onSignup }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="right-panel">
      <div className="right-content">
        <h2>Sign Up Account</h2>
        <p className="subtitle">
          Enter your personal data to create your account
        </p>

        {/* SOCIAL BUTTONS */}
        <div className="social-buttons">
          <button type="button" className="social">Github</button>
          <button type="button" className="social">Google</button>
        </div>

        {/* DIVIDER */}
        <div className="divider">
          <span></span>
          <p>or</p>
          <span></span>
        </div>

        {/* FORM */}
        <form onSubmit={onSignup}>
          <div className="row">
            <input type="text" placeholder="First Name" required />
            <input type="text" placeholder="Last Name" required />
          </div>

          <input type="email" placeholder="Email" required />

          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <select className="role-select" required>
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>

          <button className="submit-btn">Sign Up</button>
        </form>

        <p className="login-text">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
