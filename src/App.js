import React, { useState, useContext, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate, Navigate, useLocation } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const todaysGames = [
  { league: 'La Liga', teams: 'Espanyol vs Getafe', prediction: 'Home or Draw', result: 'Won', resultClass: 'success' },
  { league: 'Ligue 1', teams: 'Rennes vs FC Nantes', prediction: 'Home or Draw', result: 'Won', resultClass: 'success' },
  { league: 'Liga Portugal', teams: 'Rio Ave FC vs Santa Clara Azores', prediction: 'Home or Away', result: 'Lost', resultClass: 'danger' },
  { league: 'Liga Portugal', teams: 'Porto vs FC Famalicao', prediction: 'Over 1.5 Goals', result: 'Won', resultClass: 'success' },
  { league: 'Turkey Super Lig', teams: 'Galatasaray vs BB Bodrumspor', prediction: 'Over 1.5 Goals', result: 'Won', resultClass: 'success' },
  { league: 'England Championship', teams: 'Blackburn Rovers vs Millwall FC', prediction: 'Home or Draw', result: 'Won', resultClass: 'success' },
  { league: 'Serie A', teams: 'Fiorentina vs Empoli', prediction: 'Draw No Bet - Home Win', result: 'Pending', resultClass: 'secondary' },
  { league: 'Bundesliga', teams: 'Bochum vs Union Berlin', prediction: 'Over 1.5 Goals', result: 'Pending', resultClass: 'secondary' },
];

const previousGames = [
  { league: 'La Liga', teams: 'Espanyol vs Getafe', prediction: 'Home or Draw', result: 'Won', resultClass: 'success' },
  { league: 'Ligue 1', teams: 'Rennes vs FC Nantes', prediction: 'Home or Draw', result: 'Won', resultClass: 'success' },
  { league: 'Liga Portugal', teams: 'Rio Ave FC vs Santa Clara Azores', prediction: 'Home or Away', result: 'Lost', resultClass: 'danger' },
  { league: 'Liga Portugal', teams: 'Porto vs FC Famalicao', prediction: 'Over 1.5 Goals', result: 'Won', resultClass: 'success' },
  { league: 'Turkey Super Lig', teams: 'Galatasaray vs BB Bodrumspor', prediction: 'Over 1.5 Goals', result: 'Won', resultClass: 'success' },
  { league: 'England Championship', teams: 'Blackburn Rovers vs Millwall FC', prediction: 'Home or Draw', result: 'Won', resultClass: 'success' },
];

const freeGames = [
  { league: 'Premier League', teams: 'Liverpool vs Chelsea', prediction: 'Over 2.5 Goals' },
  { league: 'La Liga', teams: 'Real Madrid vs Valencia', prediction: 'Home Win' },
  { league: 'Serie A', teams: 'Juventus vs Inter', prediction: 'Both Teams to Score' },
];
const bookingCode = 'APUH6K';

// Auth context for global login state
const AuthContext = createContext();
function useAuth() { return useContext(AuthContext); }

function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // user = { name: 'Young', email: '...' }
  const login = (name, email) => setUser({ name, email });
  const logout = () => setUser(null);
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function Home() {
  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <div className="jumbotron bg-light p-5 rounded mb-4">
        <h1 className="display-4">Welcome to Winit Odds Hub!</h1>
        <p className="lead">Get your High and Low Risk slips from The No. 1 Sports Prediction Guru.</p>
        <div className="d-flex flex-wrap gap-2 mt-3">
          <a className="btn btn-primary btn-lg" href="/vip" role="button">Join VIP Page</a>
          <a className="btn btn-success btn-lg" href="https://t.me/" target="_blank" rel="noopener noreferrer">Join Telegram</a>
        </div>
      </div>
      {/* Booking Code Section */}
      <div className="row mb-4 justify-content-center">
        <div className="col-auto">
          <div className="card border-primary shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title mb-2">Booking Code</h5>
              <div className="display-6 fw-bold text-primary mb-2">{bookingCode}</div>
              <button className="btn btn-outline-primary btn-sm" onClick={() => navigator.clipboard.writeText(bookingCode)}>Copy Code</button>
            </div>
          </div>
        </div>
      </div>
      {/* Free Games Section */}
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="mb-3 text-center text-success">Free Games</h2>
          <div className="alert alert-warning text-center mb-3" role="alert">
            FREE PREDICTIONS (LIMITED). Log In or Sign Up to enjoy more free slips with higher returns.
          </div>
          <div className="table-responsive">
            <table className="table table-bordered align-middle bg-white">
              <thead className="table-success">
                <tr>
                  <th>League</th>
                  <th>Teams</th>
                  <th>Prediction</th>
                </tr>
              </thead>
              <tbody>
                {freeGames.map((game, idx) => (
                  <tr key={idx}>
                    <td>{game.league}</td>
                    <td>{game.teams}</td>
                    <td><span className="fw-bold">{game.prediction}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Today's Games Table Section */}
      <div className="row mb-5">
        <div className="col-12">
          <h2 className="mb-4 text-center">Today's Games</h2>
          <div className="table-responsive">
            <table className="table table-striped table-bordered align-middle bg-white">
              <thead className="table-primary">
                <tr>
                  <th>League</th>
                  <th>Teams</th>
                  <th>Prediction</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {todaysGames.map((game, idx) => (
                  <tr key={idx}>
                    <td>{game.league}</td>
                    <td>{game.teams}</td>
                    <td><span className="fw-bold">{game.prediction}</span></td>
                    <td><span className={`badge bg-${game.resultClass}`}>{game.result}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Previously Won Slips Table Section */}
      <div className="row mb-5">
        <div className="col-12">
          <h2 className="mb-4 text-center">Previously Won Slips</h2>
          <div className="table-responsive">
            <table className="table table-striped table-bordered align-middle bg-white">
              <thead className="table-secondary">
                <tr>
                  <th>League</th>
                  <th>Teams</th>
                  <th>Prediction</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {previousGames.map((game, idx) => (
                  <tr key={idx}>
                    <td>{game.league}</td>
                    <td>{game.teams}</td>
                    <td><span className="fw-bold">{game.prediction}</span></td>
                    <td><span className={`badge bg-${game.resultClass}`}>{game.result}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Stats / Social Proof Section */}
      <div className="row mb-5 justify-content-center">
        <div className="col-md-10">
          <div className="card bg-white shadow-sm p-4 text-center">
            <div className="row">
              <div className="col-md-4 mb-3 mb-md-0">
                <h3 className="text-primary mb-0">5,000+</h3>
                <div>Subscribed Clients</div>
              </div>
              <div className="col-md-4 mb-3 mb-md-0">
                <h3 className="text-success mb-0">4,000+</h3>
                <div>Predictions</div>
              </div>
              <div className="col-md-4">
                <h3 className="text-warning mb-0">16,000+</h3>
                <div>Satisfied Clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="container-fluid p-0">
      <div style={{ background: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80) center/cover', minHeight: 250 }} className="d-flex align-items-center">
        <div className="container py-5">
          <h1 className="display-3 text-white fw-bold">ABOUT US</h1>
          <div className="text-white-50">ABOUT US &gt; ABOUT</div>
        </div>
      </div>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card bg-dark text-white shadow-lg p-4 mb-4">
              <h2 className="mb-3">Introducing Our Worlds</h2>
              <p>The bigger the sports event, the more interest, excitement, and media attention on the action. And the more betting markets we have available here at Wonit to turn your opinions into winning bets. Bigger sports event coming up!</p>
            </div>
            <img src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80" alt="Sports" className="img-fluid rounded shadow" />
          </div>
        </div>
      </div>
    </div>
  );
}

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

function GhanaPaymentModal({ show, onClose, onConfirm }) {
  const [number, setNumber] = useState('');
  const [provider, setProvider] = useState('');
  const providers = ['MTN', 'Vodafone', 'AirtelTigo'];
  if (!show) return null;
  return (
    <div className="modal d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Pay GHS 50</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body text-center">
            <img src="https://img.icons8.com/color/48/000000/ghana-circular.png" alt="Ghana" className="mb-2" />
            <p>Enter your mobile money number and provider to start the payment</p>
            <input
              type="tel"
              className="form-control mb-3"
              placeholder="050 000 0000"
              value={number}
              onChange={e => setNumber(e.target.value)}
            />
            <select className="form-select mb-3" value={provider} onChange={e => setProvider(e.target.value)}>
              <option value="">Choose Provider</option>
              {providers.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <button
              className="btn btn-success w-100"
              disabled={!number || !provider}
              onClick={() => { onConfirm(); onClose(); }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const reference = params.get('reference');
    const token = localStorage.getItem('token');
    if (reference && token) {
      axios
        .get(`/api/payment/verify/${reference}`, {
          headers: { 'x-auth-token': token },
        })
        .then((res) => {
          alert('Payment successful! VIP status updated.');
          navigate('/vip');
        })
        .catch((err) => {
          alert('Payment verification failed.');
        });
    }
  }, [location, navigate]);
  return (
    <div className="container mt-5 text-center">
      <h2>Processing your payment...</h2>
    </div>
  );
}

function VIP() {
  const { user } = useAuth();
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('Ghana');
  const navigate = useNavigate();

  // Stats for the bottom section
  const stats = [
    { label: 'SUBSCRIBED CLIENTS', value: '154,154' },
    { label: 'PREDICTIONS', value: '40,560' },
    { label: 'SATISFIED CLIENTS', value: '103,550' },
  ];

  const allCountries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
    'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi',
    'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo (Congo-Brazzaville)', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czechia',
    'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
    'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia',
    'Fiji', 'Finland', 'France',
    'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
    'Haiti', 'Honduras', 'Hungary',
    'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
    'Jamaica', 'Japan', 'Jordan',
    'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan',
    'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
    'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar (Burma)',
    'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway',
    'Oman',
    'Pakistan', 'Palau', 'Palestine State', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
    'Qatar',
    'Romania', 'Russia', 'Rwanda',
    'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
    'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
    'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States of America', 'Uruguay', 'Uzbekistan',
    'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
    'Yemen',
    'Zambia', 'Zimbabwe'
  ];

  const handleGhanaPaystack = async () => {
    try {
      const token = localStorage.getItem('token');
      const userEmail = (user && user.email) || 'user@example.com';
      const amount = 50;
      const response = await axios.post(
        '/api/payment/initiate',
        { amount, email: userEmail },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        }
      );
      window.location.href = response.data.authorization_url;
    } catch (err) {
      let msg = 'Payment initiation failed!';
      if (err.response) {
        msg += '\nStatus: ' + err.response.status;
        msg += '\n' + JSON.stringify(err.response.data);
      } else {
        msg += '\n' + err.message;
      }
      alert(msg);
      console.error('Payment initiation error:', err);
    }
  };

  return (
    <div style={{ background: 'linear-gradient(180deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh' }}>
      {/* Banner image */}
      <div style={{ background: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80) center/cover', minHeight: 180 }} />
      {/* Centered VIP plan card with blue badge */}
      <div className="container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
        <div className="card shadow p-4 mt-5 mb-5" style={{ maxWidth: 350, width: '100%' }}>
          <div className="card-header text-center fw-bold">DAILY VIP PLAN</div>
          <div className="card-body text-center">
            <img src="https://i.imgur.com/6o5VbQp.png" alt="Daily Badge" className="mb-2" style={{ width: 60 }} />
            <div className="fs-2 fw-bold text-success mb-2">GHS 50</div>
            <div className="fw-bold mb-2">Daily VIP Package</div>
            <div>Premium Odds from the prediction Guru Wonit</div>
            <div>Become a premium VIP member for: <b>1 day(s)</b></div>
            <div>Recovery Tips Available</div>
            <div>All VIP subscription are valid until slips are won</div>
            <button className="btn btn-success w-100 mt-3" onClick={() => setShowPaymentOptions(true)}>
              BUY PLAN
            </button>
          </div>
        </div>
        {/* Payment selection modal/page */}
        {showPaymentOptions && (
          <div className="modal d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.7)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Select Payment Option</h5>
                  <button type="button" className="btn-close" onClick={() => setShowPaymentOptions(false)}></button>
                </div>
                <div className="modal-body text-center">
                  <div className="mb-3">
                    <b>Ghana Users</b>
                    <button className="btn btn-success w-100 mt-2" onClick={handleGhanaPaystack}>
                      Pay GHS 50 (Ghana Mobile Money)
                    </button>
                  </div>
                  <hr />
                  <div className="mb-2">
                    <b>Other Countries</b>
                    <select className="form-select mt-2 mb-2" value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)}>
                      {allCountries.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <button className="btn btn-primary w-100" onClick={() => alert('International payment coming soon!')}>
                      Pay USD 5 (Other Countries)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Stats section */}
      <div style={{ background: '#222', color: '#00bfae', padding: '32px 0', textAlign: 'center', fontWeight: 'bold', fontSize: 22 }}>
        <div className="container d-flex flex-row justify-content-center align-items-center gap-5">
          {stats.map((stat, idx) => (
            <div key={idx}>
              <div style={{ fontSize: 28 }}>{stat.value}</div>
              <div style={{ fontSize: 14, color: '#fff' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer with contact info and banner */}
      <div style={{ background: '#181818', color: '#fff', padding: '24px 0', textAlign: 'center' }}>
        <div className="container mb-3">
          <img src="https://betpawa.com/images/banners/boosted-odds.png" alt="Bet Now" style={{ maxWidth: 300, marginBottom: 16 }} />
        </div>
        <div className="container d-flex flex-row justify-content-center align-items-center gap-4 mb-2">
          <div><b>Email Us:</b> enokay69@gmail.com</div>
          <div><b>Get In Touch:</b> +233559854849</div>
        </div>
        <div style={{ fontSize: 12, color: '#aaa', marginTop: 8 }}>enokay69 © 2025. PRIVACY POLICY | Terms & Conditions | Powered by enokay69</div>
      </div>
    </div>
  );
}

function Contact() {
  return <div className="container mt-5"><h2>Contact Us</h2><p>Email: info@winit.com<br/>Phone: +233559854849</p></div>;
}

function Footer() {
  return (
    <footer className="mt-5">
      {/* Social Media Links */}
      <div className="bg-dark text-white text-center py-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-auto mx-2">
              <a href="#" className="text-white fs-4">
                <i className="bi bi-twitter"></i>
              </a>
            </div>
            <div className="col-auto mx-2">
              <a href="#" className="text-white fs-4">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
            <div className="col-auto mx-2">
              <a href="#" className="text-white fs-4">
                <i className="bi bi-snapchat"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Info */}
      <div className="bg-dark text-white py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4 text-center text-md-end mb-3 mb-md-0">
              <h5 className="text-danger">
                <i className="bi bi-envelope-fill me-2"></i>
                Email Us
              </h5>
              <p className="text-muted">info@wonit.com</p>
            </div>
            <div className="col-md-4 text-center text-md-start">
              <h5 className="text-danger">
                <i className="bi bi-telephone-fill me-2"></i>
                Get In Touch
              </h5>
              <p className="text-muted">+233559854849</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Payment Methods */}
      <div className="bg-dark py-3">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-auto px-2">
              <img src="https://via.placeholder.com/60x30?text=MTN" alt="MTN Mobile Money" className="img-fluid" style={{ height: '30px' }} />
            </div>
            <div className="col-auto px-2">
              <img src="https://via.placeholder.com/60x30?text=Vodafone" alt="Vodafone Cash" className="img-fluid" style={{ height: '30px' }} />
            </div>
            <div className="col-auto px-2">
              <img src="https://via.placeholder.com/60x30?text=Mastercard" alt="Mastercard" className="img-fluid" style={{ height: '30px' }} />
            </div>
            <div className="col-auto px-2">
              <img src="https://via.placeholder.com/60x30?text=Visa" alt="Visa" className="img-fluid" style={{ height: '30px' }} />
            </div>
            <div className="col-auto px-2">
              <img src="https://via.placeholder.com/60x30?text=BTC" alt="Bitcoin" className="img-fluid" style={{ height: '30px' }} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright & Policies */}
      <div className="bg-black text-white py-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4 mb-3 mb-md-0 text-center text-md-start">
              <span>Wonit © 2025. <a href="#" className="text-white text-decoration-none">PRIVACY POLICY</a></span>
            </div>
            <div className="col-md-4 text-center mb-3 mb-md-0">
              <a href="#" className="text-white text-decoration-none">Terms & Conditions</a>
            </div>
            <div className="col-md-4 text-center text-md-end">
              <span>Powered By Wonit</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/vip" element={<VIP />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
