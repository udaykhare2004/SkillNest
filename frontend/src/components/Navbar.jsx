import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo-link">
          <span className="logo">SkillNest</span>
        </Link>
      </div>
      <nav className="navbar-right">
        <Link to="/courses">Courses</Link>
        {user && <Link to="/dashboard">My Dashboard</Link>}
        {user && user.isAdmin && <Link to="/admin/courses">Admin</Link>}
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn-primary">
              Sign up
            </Link>
          </>
        )}
        {user && (
          <button
           onClick={onLogout}
           className="btn-secondary"
           style={{
                  background: "transparent",
                  border: "1px solid rgba(148, 163, 184, 0.7)",
                  color: "#ffffff"
          }}
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

