import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc
} from "firebase/firestore";
import "../styles/studentAttendance.css";

export default function StudentAttendance() {
  const [subjects, setSubjects] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const studentId = auth.currentUser?.uid;

  // ------------------ LOAD ALL SUBJECTS ------------------
  useEffect(() => {
    async function loadSubjects() {
      const snap = await getDocs(collection(db, "subjects"));
      const list = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setSubjects(list);
    }

    loadSubjects();
  }, []);

  // ------------------ LOAD ATTENDANCE FOR STUDENT ------------------
  useEffect(() => {
    if (!studentId || subjects.length === 0) return;

    async function loadAttendance() {
      const results = [];

      for (const subject of subjects) {
        const ref = doc(
          db,
          "attendance",
          studentId,
          "subjects",
          subject.id
        );

        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          results.push({
            subjectName: subject.subjectName,
            subjectCode: subject.subjectCode,
            teacherName: subject.teacherName,
            present: data.presentHours || 0,
            total: data.totalHours || 0,
          });
        } else {
          // No attendance yet → default to zero
          results.push({
            subjectName: subject.subjectName,
            subjectCode: subject.subjectCode,
            teacherName: subject.teacherName,
            present: 0,
            total: 0,
          });
        }
      }

      setAttendance(results);
    }

    loadAttendance();
  }, [studentId, subjects]);

  return (
    <div className="student-attendance-container">
      <h1 className="student-attendance-title">
        My Attendance Overview
      </h1>

      {subjects.length === 0 ? (
        <p className="no-data">No subjects available yet.</p>
      ) : (
        <div className="student-attendance-table">
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Code</th>
                <th>Teacher</th>
                <th>Present</th>
                <th>Total</th>
                <th>Percentage</th>
              </tr>
            </thead>

            <tbody>
              {attendance.map((subj, i) => {
                const percent =
                  subj.total === 0
                    ? "0%"
                    : ((subj.present / subj.total) * 100).toFixed(1) + "%";

                return (
                  <tr key={i}>
                    <td>{subj.subjectName}</td>
                    <td>{subj.subjectCode}</td>
                    <td>{subj.teacherName}</td>
                    <td>{subj.present}</td>
                    <td>{subj.total}</td>
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
