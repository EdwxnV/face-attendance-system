import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import "../styles/teacherAttendance.css";

export default function TeacherAttendance() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  // ------------------ LOAD STUDENTS ------------------
  useEffect(() => {
    async function loadStudents() {
      const snap = await getDocs(collection(db, "users"));
      const list = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((u) => u.role === "student");
      setStudents(list);
    }

    loadStudents();
  }, []);

  // ------------------ LOAD SUBJECTS ------------------
  useEffect(() => {
    async function loadSubjects() {
      const snap = await getDocs(collection(db, "subjects"));
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setSubjects(list);
    }

    loadSubjects();
  }, []);

  // ------------------ LOAD ATTENDANCE FOR SELECTED STUDENT ------------------
  useEffect(() => {
    if (!selectedStudent) {
      setAttendanceData([]);
      return;
    }

    async function loadAttendance() {
      const results = [];

      for (const subject of subjects) {
        const ref = doc(
          db,
          "attendance",
          selectedStudent,
          "subjects",
          subject.id
        );

        const snap = await getDoc(ref);

        if (snap.exists()) {
          const d = snap.data();
          results.push({
            subjectName: subject.subjectName,
            subjectCode: subject.subjectCode,
            teacherName: subject.teacherName,
            total: d.totalHours,
            present: d.presentHours,
          });
        } else {
          // NO ATTENDANCE YET → defaults to zero
          results.push({
            subjectName: subject.subjectName,
            subjectCode: subject.subjectCode,
            teacherName: subject.teacherName,
            total: 0,
            present: 0,
          });
        }
      }

      setAttendanceData(results);
    }

    loadAttendance();
  }, [selectedStudent, subjects]);

  return (
    <div className="attendance-page">
      <h1 className="attendance-title">Attendance Overview</h1>

      <div className="dropdown-box">
        <select
          className="student-dropdown"
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
      </div>

      {!selectedStudent ? (
        <p className="no-data">Select a student to view attendance.</p>
      ) : (
        <div className="attendance-table">
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Code</th>
                <th>Teacher</th>
                <th>Total Hours</th>
                <th>Present</th>
                <th>Attendance %</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((subj, i) => {
                const percent =
                  subj.total === 0
                    ? "0%"
                    : ((subj.present / subj.total) * 100).toFixed(1) + "%";

                return (
                  <tr key={i}>
                    <td>{subj.subjectName}</td>
                    <td>{subj.subjectCode}</td>
                    <td>{subj.teacherName}</td>
                    <td>{subj.total}</td>
                    <td>{subj.present}</td>
                    <td>{percent}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
