import React, { useState } from "react";
import { auth, db } from "../config/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import { Shield, LogIn } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");
    setBusy(true);

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;
      const snap = await getDoc(doc(db, "users", uid));
      const role = snap.exists() ? snap.data()?.role : undefined;

      if (role === "admin") {
        localStorage.setItem("role", "admin");
        navigate("/admin");
      } else {
        await signOut(auth);
        setErr("❌ You are not an admin.");
      }
    } catch (e) {
      setErr("⚠️ Invalid email or password");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-login-bg">
      <form onSubmit={handleLogin} className="admin-login-card">
        <div className="admin-login-header">
          <Shield size={34} color="#00ff9b" />
          <h2>Admin Portal</h2>
          <p>Secure access only</p>
        </div>

        <input
          className="admin-input"
          type="email"
          placeholder="Admin email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <input
          className="admin-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        {err && <div className="admin-error">{err}</div>}

        <button className="admin-btn" disabled={busy}>
          <LogIn size={18}/>
          {busy ? "Verifying..." : "Login"}
        </button>
      </form>
    </div>
  );
}
