import React, { useEffect, useMemo, useState } from "react";
import { auth, db } from "../config/firebase";
import { signOut } from "firebase/auth";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  orderBy,
  query,
} from "firebase/firestore";
import "./AdminPanel.css";

import {
  Users,
  Shield,
  BarChart3,
  LogOut,
  Search,
  Crown,
  UserMinus,
  UserPlus,
  Download,
} from "lucide-react";

const PAGE_SIZE = 7;

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [qText, setQText] = useState("");
  const [page, setPage] = useState(1);
  const [banner, setBanner] = useState("");
  const [loading, setLoading] = useState(false);

  // Live Firestore Stream
  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snap) => {
      setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, []);

  const filtered = useMemo(() => {
    const t = qText.toLowerCase();
    return users.filter(
      (u) =>
        u.email?.toLowerCase().includes(t) ||
        u.username?.toLowerCase().includes(t) ||
        u.phoneNumber?.toLowerCase().includes(t) ||
        (u.role || "user").toLowerCase().includes(t)
    );
  }, [users, qText]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const logoutAdmin = async () => {
    await signOut(auth);
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  const toggleAdmin = async (u) => {
    if (u.id === auth.currentUser?.uid) {
      setBanner("⚠️ You cannot change your own role.");
      return;
    }
    try {
      setLoading(true);
      await updateDoc(doc(db, "users", u.id), {
        role: u.role === "admin" ? "user" : "admin",
      });

      setBanner(`✅ ${u.email} is now ${u.role === "admin" ? "User" : "Admin"}`);
      setTimeout(() => setBanner(""), 3000);
    } catch (e) {
      setBanner("❌ Failed to update role");
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    const rows = [
      ["Username", "Email", "Phone", "Role", "Joined"],
      ...users.map((u) => [
        u.username || "N/A",
        u.email,
        u.phoneNumber || "-",
        u.role || "user",
        u.createdAt?.seconds
          ? new Date(u.createdAt.seconds * 1000).toLocaleString()
          : "-",
      ]),
    ]
      .map((r) => r.join(","))
      .join("\n");

    const blob = new Blob([rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "energyverse_users.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="admin-wrapper">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2 className="sidebar-title">
          <Shield size={20} /> Admin
        </h2>

        <ul className="sidebar-menu">
          <li className="active-menu">Dashboard</li>
        </ul>

        <button className="logout-btn" onClick={logoutAdmin}>
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main */}
      <main className="admin-main">
        <header className="admin-header">
          <h1>Admin Dashboard</h1>
          <button className="export-btn" onClick={exportCSV}>
            <Download size={18} /> Export CSV
          </button>
        </header>

        {banner && <div className="admin-banner">{banner}</div>}

        {/* Stats Cards */}
        <div className="stat-grid">
          <div className="stat-card">
            <Users size={28} />
            <p>Total Users</p>
            <h2>{users.length}</h2>
          </div>

          <div className="stat-card">
            <Shield size={28} />
            <p>Admins</p>
            <h2>{users.filter((u) => u.role === "admin").length}</h2>
          </div>

          <div className="stat-card">
            <BarChart3 size={28} />
            <p>Features</p>
            <h2>17</h2>
          </div>
        </div>

        {/* Search */}
        <div className="search-row">
          <Search size={18} />
          <input
            placeholder="Search name, email, phone, role…"
            value={qText}
            onChange={(e) => {
              setQText(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {/* Users Table */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {pageRows.map((u) => (
                <tr key={u.id}>
                  <td>{u.username || "N/A"}</td>
                  <td>{u.email}</td>
                  <td>{u.phoneNumber || "-"}</td>
                  <td>
                    <span className={`role-tag ${u.role}`}>
                      {u.role || "user"}
                    </span>
                  </td>
                  <td>
                    {u.createdAt?.seconds
                      ? new Date(u.createdAt.seconds * 1000).toLocaleString()
                      : "-"}
                  </td>
                  <td>
                    <button
                      className="role-btn"
                      disabled={loading}
                      onClick={() => toggleAdmin(u)}
                    >
                      {u.role === "admin" ? (
                        <>
                          <UserMinus size={16} /> Remove Admin
                        </>
                      ) : (
                        <>
                          <Crown size={16} /> Make Admin
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}

              {!pageRows.length && (
                <tr>
                  <td colSpan="6" className="empty">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination">
            <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
              Prev
            </button>
            <span>Page {page} / {pageCount}</span>
            <button
              disabled={page >= pageCount}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
