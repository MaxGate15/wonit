import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../App';



function Signup() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [form, setForm] = useState({
      fullName: '',
      mobile: '',
      email: '',
      password: '',
      repeatPassword: '',
      country: 'Ghana',
      city: '',
      terms: false,
    });
    const countries = ['Ghana', 'Nigeria', 'Kenya', 'South Africa', 'Other'];
    const handleChange = e => {
      const { name, value, type, checked } = e.target;
      setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    };
    const handleSubmit = async e => {
      e.preventDefault();
      try {
        const response = await axios.post('/api/auth/register', {
          name: form.fullName,
          email: form.email,
          password: form.password
        });
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        login(user.name, user.email);
        navigate('/about');
      } catch (err) {
        alert('Signup failed!');
      }
    };
    return (
      <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="card shadow p-4" style={{ maxWidth: 420, width: '100%' }}>
          <div className="text-center mb-4">
            <img src="https://img.icons8.com/fluency/48/000000/add-user-group-man-man.png" alt="Sign Up" />
            <h3 className="mt-2 mb-0">Sign up to Join Wonit</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-2 text-muted small">**All fields are required**</div>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input name="fullName" value={form.fullName} onChange={handleChange} type="text" className="form-control" placeholder="Full Name - eg. Lionel Messi" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Mobile Number</label>
              <input name="mobile" value={form.mobile} onChange={handleChange} type="tel" className="form-control" placeholder="Mobile No. - eg. 233000000000 (Without the zero)" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input name="email" value={form.email} onChange={handleChange} type="email" className="form-control" placeholder="E-mail - eg. youremail@email.com" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input name="password" value={form.password} onChange={handleChange} type="password" className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Repeat Password</label>
              <input name="repeatPassword" value={form.repeatPassword} onChange={handleChange} type="password" className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Country</label>
              <select name="country" value={form.country} onChange={handleChange} className="form-select" required>
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">City</label>
              <input name="city" value={form.city} onChange={handleChange} type="text" className="form-control" placeholder="City" required />
            </div>
            <div className="form-check mb-3">
              <input name="terms" checked={form.terms} onChange={handleChange} type="checkbox" className="form-check-input" id="termsCheck" required />
              <label className="form-check-label small" htmlFor="termsCheck">
                I am 18 years and above &amp; I agree to the Terms and Conditions.
              </label>
            </div>
            <button type="submit" className="btn btn-success w-100 mb-2">Submit</button>
          </form>
          <div className="text-center">
            <span>Already have an account? </span>
            <NavLink to="/login" className="text-primary fw-bold">Log in</NavLink>
          </div>
        </div>
      </div>
    );
  }

  export default Signup;