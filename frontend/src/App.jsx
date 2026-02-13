
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import HomePage from "./pages/HomePage";
import MissionsPage from "./pages/MissionsPage";
import DronesPage from "./pages/DronesPage";
import ContactPage from "./pages/ContactPage";
import UserPage from "./pages/UserPage";
import PrivatePanelPage from "./pages/PrivatePanelPage"; // panel privado "normal"
import AdminPage from "./pages/AdminPage"; //panel administrador


import { isAuthenticated, isAdmin } from "./utils/auth";

//Ruta protegida general 
function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/contacto" replace />;
}

//Ruta protegida solo para admin
function AdminRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/usuario" replace />;
  }

  if (!isAdmin()) {
    // Si hay token pero no es admin, lo mandamos al área de usuario
    return <Navigate to="/usuario" replace />;
  }

  return children;
}

//AppShell para detectar la ruta actual (home o resto)
function AppShell() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div
      className={`bb-page ${isHome ? "bb-page--home" : ""}`}
      style={{ backgroundColor: "#E4E8D9" }}
    >
      <div className="bb-shell">
        <Navbar />

        <main className="bb-main">
          <Routes>
            {}
            <Route path="/" element={<HomePage />} />
            <Route path="/misiones" element={<MissionsPage />} />
            <Route path="/drones" element={<DronesPage />} />
            <Route path="/contacto" element={<ContactPage />} />

            {}
            <Route path="/usuario" element={<UserPage />} />

            {}
            <Route
              path="/panel-privado"
              element={
                <ProtectedRoute>
                  <PrivatePanelPage />
                </ProtectedRoute>
              }
            />

            {}

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminPage />
                </AdminRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;