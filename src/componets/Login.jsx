import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';


function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [showReset, setShowReset] = useState(false);
    const [resetSent, setResetSent] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async (e) => {
      e.preventDefault();
      // Frontend-only login: set user and token directly
      const fakeToken = 'testtoken';
      const fakeUser = { name: email.split('@')[0] || 'User', email };
      localStorage.setItem('token', fakeToken);
      localStorage.setItem('user', JSON.stringify(fakeUser));
      login(fakeUser.name, fakeUser.email);
      navigate('/profile');
    };
    return (
      <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="card shadow p-4" style={{ maxWidth: 400, width: '100%' }}>
          <div className="text-center mb-4">
            <img src="https://img.icons8.com/fluency/48/000000/user-shield.png" alt="Login" />
            <h3 className="mt-2 mb-0">Log in to your account</h3>
          </div>
          {!showReset ? (
            <>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" placeholder="Eg. john.doe@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" required value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-2">Log In</button>
              </form>
              <div className="text-start mb-2">
                <button className="btn btn-link p-0" style={{ color: '#0d6efd' }} onClick={() => setShowReset(true)}>
                  Forgot password?
                </button>
              </div>
              <div className="text-center">
                <span>Don't have an account? </span>
                <NavLink to="/signup" className="text-primary fw-bold">Register here</NavLink>
              </div>
            </>
          ) : !resetSent ? (
            <>
              <form onSubmit={e => { e.preventDefault(); setResetSent(true); }}>
                <div className="mb-3">
                  <label className="form-label">Enter your email to reset password</label>
                  <input type="email" className="form-control" value={resetEmail} onChange={e => setResetEmail(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-2">Send Reset Link</button>
              </form>
              <div className="text-center">
                <button className="btn btn-link p-0" style={{ color: '#0d6efd' }} onClick={() => setShowReset(false)}>
                  Back to Login
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="alert alert-success text-center">A password reset link has been sent to your email.</div>
              <div className="text-center">
                <button className="btn btn-link p-0" style={{ color: '#0d6efd' }} onClick={() => { setShowReset(false); setResetSent(false); }}>
                  Back to Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }


  export default Login;