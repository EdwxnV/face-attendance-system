import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import TeacherHome from "./pages/TeacherHome";
import StudentHome from "./pages/StudentHome";

// Layouts
import TeacherLayout from "./layouts/TeacherLayout";
import StudentLayout from "./layouts/StudentLayout";

// Teacher Pages
import TeacherStudents from "./pages/TeacherStudents";

// Temporary placeholder pages
function StudentAttendance() {
  return <h1 style={{ color: "white" }}>Student Attendance Page</h1>;
}
function StudentAbsence() {
  return <h1 style={{ color: "white" }}>Absence Details Page</h1>;
}
function StudentLeave() {
  return <h1 style={{ color: "white" }}>Request Duty Leave Page</h1>;
}

function TeacherAttendance() {
  return <h1 style={{ color: "white" }}>Teacher Attendance Page</h1>;
}
function TeacherManual() {
  return <h1 style={{ color: "white" }}>Manual Attendance Page</h1>;
}

export default function App() {
  return (
    <Router>
      <Routes>

        {/* SIGNUP + LOGIN */}
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* ---------------- TEACHER ROUTES WITH LAYOUT ---------------- */}
        <Route path="/teacher" element={<TeacherLayout />}>

          {/* Nested pages */}
          <Route path="home" element={<TeacherHome />} />
          <Route path="attendance" element={<TeacherAttendance />} />
          <Route path="students" element={<TeacherStudents />} />
          <Route path="manual" element={<TeacherManual />} />

        </Route>

        {/* ---------------- STUDENT ROUTES WITH LAYOUT ---------------- */}
        <Route path="/student" element={<StudentLayout />}>

          {/* Nested pages */}
          <Route path="home" element={<StudentHome />} />
          <Route path="attendance" element={<StudentAttendance />} />
          <Route path="absence" element={<StudentAbsence />} />
          <Route path="leave" element={<StudentLeave />} />

        </Route>

      </Routes>
    </Router>
  );
}
