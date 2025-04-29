import React, { useState } from 'react';
import { useAuth } from '../App';
import { NavLink } from 'react-router-dom';
function Navbar() {
    const { user, logout } = useAuth();
    return (
      <nav className="navbar navbar-dark" style={{background: 'linear-gradient(90deg, #4f46e5 0%, #06b6d4 100%)', position: 'relative'}}>
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <NavLink className="navbar-brand fw-bold" to="/">Wonit</NavLink>
          <div className="d-flex align-items-center gap-3">
            <NavLink className="nav-link text-white px-2" to="/">Home</NavLink>
            <NavLink className="nav-link text-white px-2" to="/about">About Us</NavLink>
            <NavLink className="nav-link text-white px-2" to="/vip">VIP Page</NavLink>
            <NavLink className="nav-link text-white px-2" to="/contact">Contact Us</NavLink>
            {!user ? (
              <>
                <NavLink className="btn btn-outline-light ms-2" to="/login">Log In</NavLink>
                <NavLink className="btn btn-light text-primary fw-bold ms-2" to="/signup">Sign Up</NavLink>
              </>
            ) : (
              <>
                <span className="badge bg-success ms-3">{user.name}</span>
                <button className="btn btn-danger ms-2" onClick={logout}>Logout</button>
              </>
            )}
          </div>
        </div>
      </nav>
    );
  }
export default Navbar;