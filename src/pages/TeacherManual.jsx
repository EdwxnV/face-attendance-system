import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";
import "../styles/teacherManual.css";

export default function TeacherManual() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [mode, setMode] = useState("withHour"); // default

  const teacherId = auth.currentUser?.uid;

  // ------------------------------
  // LOAD STUDENTS
  // ------------------------------
  useEffect(() => {
    async function loadStudents() {
      const q = query(collection(db, "users"), where("role", "==", "student"));
      const snap = await getDocs(q);

      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setStudents(list);
    }

    loadStudents();
  }, []);

  // ------------------------------
  // LOAD SUBJECTS (only this teacher)
  // ------------------------------
  useEffect(() => {
    if (!teacherId) return;

    async function loadSubjects() {
      const q = query(
        collection(db, "subjects"),
        where("teacherId", "==", teacherId)
      );

      const snap = await getDocs(q);
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

      setSubjects(list);
    }

    loadSubjects();
  }, [teacherId]);

  // ------------------------------
  // SUBMIT MANUAL ATTENDANCE
  // ------------------------------
  async function handleSubmit(e) {
    e.preventDefault();

    if (!selectedStudent || !selectedSubject) {
      alert("Please select a student and subject.");
      return;
    }

    const subject = subjects.find((s) => s.id === selectedSubject);

    const docRef = doc(
      db,
      "attendance",
      selectedStudent,
      "subjects",
      selectedSubject
    );
    const existing = await getDoc(docRef);

    let totalHours = 0;
    let presentHours = 0;

    if (existing.exists()) {
      const data = existing.data();
      totalHours = data.totalHours;
      presentHours = data.presentHours;
    }

    // ------------------------------
    // MODE LOGIC
    // ------------------------------
    if (mode === "withHour") {
      // Add to both total & present
      totalHours += 1;
      presentHours += 1;
    }

    if (mode === "withoutHour") {
      // Add only present
      presentHours += 1;
    }

    if (mode === "hourOnly") {
      // Add only total hour
      totalHours += 1;
    }

    // ------------------------------
    // SAVE UPDATED ATTENDANCE
    // ------------------------------
    await setDoc(docRef, {
      subjectName: subject.subjectName,
      subjectCode: subject.subjectCode,
      teacherId,
      totalHours,
      presentHours,
      lastUpdated: new Date(),
    });

    alert("Attendance updated successfully!");

    setSelectedStudent("");
    setSelectedSubject("");
  }

  return (
    <div className="manual-container">
      <h1 className="manual-title">Manual Attendance</h1>

      <form className="manual-box" onSubmit={handleSubmit}>

        {/* Student Dropdown */}
        <label>Student</label>
        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
        >
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.firstName} {s.lastName}
            </option>
          ))}
        </select>

        {/* Subject Dropdown */}
        <label>Subject</label>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">Select Subject</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.subjectName} ({s.subjectCode})
            </option>
          ))}
        </select>

        {/* RADIO BUTTONS */}
        <label>Mode</label>

        <div className="radio-group">

          <label>
            <input
              type="radio"
              checked={mode === "withHour"}
              value="withHour"
              onChange={() => setMode("withHour")}
            />
            Add Attendance + Add Hour
          </label>

          <label>
            <input
              type="radio"
              checked={mode === "withoutHour"}
              value="withoutHour"
              onChange={() => setMode("withoutHour")}
            />
            Add Attendance Only
          </label>

          <label>
            <input
              type="radio"
              checked={mode === "hourOnly"}
              value="hourOnly"
              onChange={() => setMode("hourOnly")}
            />
            Add Total Hour Only
          </label>
        </div>

        <button className="manual-submit" type="submit">
          Submit Attendance
        </button>
      </form>
    </div>
  );
}
