import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import { auth, db } from "../firebase";

import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";

export default function Signup() {
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const firstName = e.target.firstName.value;
    const lastName  = e.target.lastName.value;
    const email     = e.target.email.value;
    const password  = e.target.password.value;
    const role      = e.target.role.value;

    try {
      // 1. Create the user in Firebase Auth
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      // 2. Create Firestore profile
      await setDoc(doc(db, "users", uid), {
        firstName,
        lastName,
        email,
        role,
        createdAt: serverTimestamp(),
      });

      alert("Account created successfully!");

      // 3. Redirect based on role
      if (role === "teacher") {
        navigate("/teacher/home");
      } else {
        navigate("/student/home");
      }

    } catch (error) {
      console.error("Signup error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <LeftPanel />
      <RightPanel onSignup={handleSignup} />
    </div>
  );
}
