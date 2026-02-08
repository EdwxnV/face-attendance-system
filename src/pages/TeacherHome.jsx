import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import "../styles/teacherHome.css";

export default function TeacherHome() {
  const [teachers, setTeachers] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");

  // Load teacher list
  useEffect(() => {
    async function loadTeachers() {
      const snap = await getDocs(collection(db, "users"));
      const list = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((u) => u.role === "teacher");

      setTeachers(list);
    }
    loadTeachers();
  }, []);

  // Add new subject to Firestore
  async function handleAddSubject(e) {
    e.preventDefault();

    if (!subjectName || !subjectCode || !selectedTeacher) {
      alert("Please fill all fields.");
      return;
    }

    const teacher = teachers.find((t) => t.id === selectedTeacher);

    await addDoc(collection(db, "subjects"), {
      subjectName,
      subjectCode,
      teacherId: teacher.id,
      teacherName: teacher.firstName + " " + teacher.lastName
    });

    alert("Subject added successfully!");

    setSubjectName("");
    setSubjectCode("");
    setSelectedTeacher("");
  }

  return (
    <div className="teacher-home">

      <h1 className="teacher-home-title">Welcome to FACE System</h1>

      {/* SUBJECT ADDING WIDGET */}
      <div className="subject-widget">
        <h2>Add New Subject</h2>

        <form onSubmit={handleAddSubject}>

          <input
            type="text"
            placeholder="Subject Name"
            className="subject-input"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Subject Code"
            className="subject-input"
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
            required
          />

          {/* Teacher dropdown */}
          <select
            className="subject-select"
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
            required
          >
            <option value="">Select Teacher</option>
            {teachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.firstName} {t.lastName}
              </option>
            ))}
          </select>

          <button className="subject-btn">Add Subject</button>
        </form>
      </div>

    </div>
  );
}
