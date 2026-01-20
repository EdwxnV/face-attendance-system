import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/students.css";

export default function TeacherStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("role", "==", "student")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // FIX: Sort after fetching so missing fields don't break anything
      const sorted = list.sort((a, b) =>
        a.firstName.localeCompare(b.firstName)
      );

      setStudents(sorted);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="students-container">
      <h1 className="students-title">Students List</h1>

      <div className="students-table">
        <div className="students-header">
          <span>First Name</span>
          <span>Last Name</span>
          <span>Email</span>
        </div>

        {students.length === 0 ? (
          <p className="no-data">No students registered yet.</p>
        ) : (
          students.map((s) => (
            <div className="student-row" key={s.id}>
              <span>{s.firstName}</span>
              <span>{s.lastName}</span>
              <span>{s.email}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
