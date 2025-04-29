import React, { useState, useContext, createContext,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate, Navigate, useLocation } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Home from './componets/Home';
import About from './componets/About';
import Login from './componets/Login';
import Signup from './componets/Signup';
import GhanaPaymentModal from './componets/GhPaymentMethod';
import PaymentSuccess from './componets/PaymentSuccess';
import VIP from './componets/Vip';
import Contact from './componets/Contact';
import Footer from './componets/Footer';
import Navbar from './componets/NavBar';
import Profile from './componets/Profile';
// import { saveTodayGames } from './data/Games'; // Import the function to save games

// const todaysGames = [
//   { league: 'La Liga', teams: 'Espanyol vs Getafe', prediction: 'Home or Draw', result: 'Won', resultClass: 'success' },
//   { league: 'Ligue 1', teams: 'Rennes vs FC Nantes', prediction: 'Home or Draw', result: 'Won', resultClass: 'success' },
//   { league: 'Liga Portugal', teams: 'Rio Ave FC vs Santa Clara Azores', prediction: 'Home or Away', result: 'Lost', resultClass: 'danger' },
//   { league: 'Liga Portugal', teams: 'Porto vs FC Famalicao', prediction: 'Over 1.5 Goals', result: 'Won', resultClass: 'success' },
//   { league: 'Turkey Super Lig', teams: 'Galatasaray vs BB Bodrumspor', prediction: 'Over 1.5 Goals', result: 'Won', resultClass: 'success' },
//   { league: 'England Championship', teams: 'Blackburn Rovers vs Millwall FC', prediction: 'Home or Draw', result: 'Won', resultClass: 'success' },
//   { league: 'Serie A', teams: 'Fiorentina vs Empoli', prediction: 'Draw No Bet - Home Win', result: 'Pending', resultClass: 'secondary' },
//   { league: 'Bundesliga', teams: 'Bochum vs Union Berlin', prediction: 'Over 1.5 Goals', result: 'Pending', resultClass: 'secondary' },
// ];
// export const saveTodayGames = (games) => {
//   localStorage.setItem('todayGames', JSON.stringify(games));
// };

// function TodayGames() {
//   const { date } = useParams();
  

//   return null; // No UI, just side effect
// }


// const todaysGames = saveTodayGames ? [saveTodayGames] : [
//   { league: 'La Liga', teams: 'Espanyol vs Getafe', prediction: 'Home or Draw', result: 'Won', resultClass: 'success' },
//   { league: 'Ligue 1', teams: 'Rennes vs FC Nantes', prediction: 'Home or Draw', result: 'Won', resultClass: 'success' },
//   { league: 'Liga Portugal', teams: 'Rio Ave FC vs Santa Clara Azores', prediction: 'Home or Away', result: 'Lost', resultClass: 'danger' },
//   { league: 'Liga Portugal', teams: 'Porto vs FC Famalicao', prediction: 'Over 1.5 Goals', result: 'Won', resultClass: 'success' },
//   { league: 'Turkey Super Lig', teams: 'Galatasaray vs BB Bodrumspor', prediction: 'Over 1.5 Goals', result: 'Won', resultClass: 'success' },
//   { league: 'England Championship', teams: 'Blackburn Rovers vs Millwall FC', prediction: 'Home or Draw', result: 'Won', resultClass: 'success' },
//   { league: 'Serie A', teams: 'Fiorentina vs Empoli', prediction: 'Draw No Bet - Home Win', result: 'Pending', resultClass: 'secondary' },
//   { league: 'Bundesliga', teams: 'Bochum vs Union Berlin', prediction: 'Over 1.5 Goals', result: 'Pending', resultClass: 'secondary' },
//   ];
// console.log('todaysGames', todaysGames);

// const previousGames = [
//   { league: 'La Liga', teams: 'Espanyol vs Getafe', prediction: 'Home or Draw', result: 'Won', resultClass: 'success' },
//   { league: 'Ligue 1', teams: 'Rennes vs FC Nantes', prediction: 'Home or Draw', result: 'Won', resultClass: 'success' },
//   { league: 'Liga Portugal', teams: 'Rio Ave FC vs Santa Clara Azores', prediction: 'Home or Away', result: 'Lost', resultClass: 'danger' },
//   { league: 'Liga Portugal', teams: 'Porto vs FC Famalicao', prediction: 'Over 1.5 Goals', result: 'Won', resultClass: 'success' },
//   { league: 'Turkey Super Lig', teams: 'Galatasaray vs BB Bodrumspor', prediction: 'Over 1.5 Goals', result: 'Won', resultClass: 'success' },
//   { league: 'England Championship', teams: 'Blackburn Rovers vs Millwall FC', prediction: 'Home or Draw', result: 'Won', resultClass: 'success' },
// ];

// const freeGames = [
//   { league: 'Premier League', teams: 'Liverpool vs Chelsea', prediction: 'Over 2.5 Goals' },
//   { league: 'La Liga', teams: 'Real Madrid vs Valencia', prediction: 'Home Win' },
//   { league: 'Serie A', teams: 'Juventus vs Inter', prediction: 'Both Teams to Score' },
// ];
// const bookingCode = 'APUH6K';

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
export { AuthProvider, useAuth, ProtectedRoute };
