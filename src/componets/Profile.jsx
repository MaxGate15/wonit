import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Profile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    if (!user) return <Navigate to="/login" replace />;
    return (
      <div className="container mt-5">
        <div className="card shadow p-4 mb-4" style={{ maxWidth: 500, margin: '0 auto' }}>
          <h2 className="mb-3">User Profile</h2>
          <div className="mb-2"><b>Name:</b> {user.name}</div>
          <div className="mb-2"><b>Email:</b> {user.email}</div>
          <button className="btn btn-danger mt-3" onClick={() => { logout(); localStorage.removeItem('token'); localStorage.removeItem('user'); navigate('/login'); }}>Log Out</button>
        </div>
        <div className="card shadow p-4 mb-4" style={{ maxWidth: 500, margin: '0 auto' }}>
          <h3 className="mb-3">VIP Payment</h3>
          <NavLink to="/vip" className="btn btn-success">Go to VIP Page</NavLink>
        </div>
        <div className="card shadow p-4" style={{ maxWidth: 500, margin: '0 auto' }}>
          <h3 className="mb-3">Free Games</h3>
          <ul>
            {freeGames.map((game, idx) => (
              <li key={idx}><b>{game.league}:</b> {game.teams} - <span className="fw-bold">{game.prediction}</span></li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
export default Profile;