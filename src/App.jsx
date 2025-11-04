import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import VersePortal from "./Energy/VersePortal";
import AdminPanel from "./components/AdminPanel";
import AdminLogin from "./components/AdminLogin";
import ProtectedAdminRoute from "./components/routes/ProtectedAdminRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public User Portal */}
        <Route path="/" element={<VersePortal />} />

        {/* Admin Login Page */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Protected Admin Panel */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminPanel />
            </ProtectedAdminRoute>
          }
        />

        {/* Unknown Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
