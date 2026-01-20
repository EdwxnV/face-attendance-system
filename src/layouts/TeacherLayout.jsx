import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/teacher.css";

export default function TeacherLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut(auth);
    navigate("/login");
  }

  return (
    <div className="teacher-container">

      {/* NAVBAR ALWAYS VISIBLE */}
      <nav className="teacher-navbar">
        <div className="logo-wrapper">
          <div className="logo-short">F.A.C.E</div>
          <div className="logo-long">Facial Attendance Control Engine</div>
        </div>


        <ul className="teacher-nav-links">
          <li><NavLink to="/teacher/home">Home</NavLink></li>
          <li><NavLink to="/teacher/attendance">Attendance</NavLink></li>
          <li><NavLink to="/teacher/students">Students List</NavLink></li>
          <li><NavLink to="/teacher/manual">Manual Attendance</NavLink></li>
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
      <div className="teacher-page-content">
        <Outlet />
      </div>

    </div>
  );
}
