// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import VersePortal from "./AgroVerse/AgroPortal";
import AdminPanel from "./components/AdminPanel";
import AdminLogin from "./components/AdminLogin";
import ProtectedAdminRoute from "./components/routes/ProtectedAdminRoute";
import FeatureDocsPage from "./components/FeatureDocsPage";
import FeatureDemoPage from "./pages/FeatureDemoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🌍 Public User Portal */}
        <Route path="/" element={<VersePortal />} />

        {/* ⚡ Full Feature Documentation Page */}
        <Route path="/docs" element={<FeatureDocsPage />} />

        {/* 🧪 Per-feature Demo UI */}
        <Route path="/features/:id" element={<FeatureDemoPage />} />

        {/* 🔐 Admin Login Page */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* 🧠 Protected Admin Panel */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminPanel />
            </ProtectedAdminRoute>
          }
        />

        {/* 🚫 Unknown Routes Redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
