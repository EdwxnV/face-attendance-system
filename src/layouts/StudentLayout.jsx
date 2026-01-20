import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/student.css";

export default function StudentLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut(auth);
    navigate("/login");
  }

  return (
    <div className="student-container">

      {/* NAVBAR ALWAYS VISIBLE */}
      <nav className="student-navbar">
        <div className="logo-wrapper">
          <div className="logo-short">F.A.C.E</div>
          <div className="logo-long">Facial Attendance Control Engine</div>
        </div>


        <ul className="student-nav-links">
          <li><NavLink to="/student/home">Home</NavLink></li>
          <li><NavLink to="/student/attendance">Attendance</NavLink></li>
          <li><NavLink to="/student/absence">Absence Details</NavLink></li>
          <li><NavLink to="/student/leave">Request Duty Leave</NavLink></li>
        </ul>

        <div className="profile-wrapper">
          <div className="profile-icon" onClick={() => setOpen(!open)}>
            👤
          </div>

          {open && (
            <div className="profile-menu">
              <p onClick={() => alert("Profile coming soon!")}>Profile</p>
              <p onClick={() => alert("Settings coming soon!")}>Settings</p>
              <p className="logout" onClick={handleLogout}>Logout</p>
            </div>
          )}
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <div className="student-page-content">
        <Outlet />
      </div>

    </div>
  );
}
