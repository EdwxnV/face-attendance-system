import { useState } from "react";
import "../styles/signup.css";

export default function RightPanel({ onSignup }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="right-panel">
      <div className="right-card">

        <h2>Create Your Account</h2>
        <p className="subtitle">
          Enter your personal details to begin
        </p>

        {/* Social Buttons */}
        <div className="social-buttons">
          <button type="button" className="social">Github</button>
          <button type="button" className="social">Google</button>
        </div>

        <div className="divider">
          <span></span>
          <p>or</p>
          <span></span>
        </div>

        <form onSubmit={onSignup}>
          <div className="row">
            <input name="firstName" type="text" placeholder="First Name" required />
            <input name="lastName" type="text" placeholder="Last Name" required />
          </div>

          <input name="email" type="email" placeholder="Email Address" required />

          <div className="password-box">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <select name="role" className="role-select" required>
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
