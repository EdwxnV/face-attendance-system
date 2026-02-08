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
import TeacherAttendance from "./pages/TeacherAttendance";
import TeacherStudents from "./pages/TeacherStudents";
import TeacherManual from "./pages/TeacherManual";

// Student temporary pages
function StudentAttendance() {
  return <h1 style={{ color: "white" }}>Student Attendance Page</h1>;
}
function StudentAbsence() {
  return <h1 style={{ color: "white" }}>Absence Details Page</h1>;
}
function StudentLeave() {
  return <h1 style={{ color: "white" }}>Request Duty Leave Page</h1>;
}

export default function App() {
  return (
    <Router>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* ---------------- TEACHER ROUTES ---------------- */}
        <Route path="/teacher" element={<TeacherLayout />}>

          {/* RELATIVE PATHS ONLY */}
          <Route index element={<TeacherHome />} />
          <Route path="home" element={<TeacherHome />} />
          <Route path="attendance" element={<TeacherAttendance />} />
          <Route path="students" element={<TeacherStudents />} />
          <Route path="manual" element={<TeacherManual />} />

        </Route>

        {/* ---------------- STUDENT ROUTES ---------------- */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentHome />} />
          <Route path="home" element={<StudentHome />} />
          <Route path="attendance" element={<StudentAttendance />} />
          <Route path="absence" element={<StudentAbsence />} />
          <Route path="leave" element={<StudentLeave />} />
        </Route>

      </Routes>
    </Router>
  );
}
