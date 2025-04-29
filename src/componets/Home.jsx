
import axios from 'axios';
import React,{useState,useEffect} from 'react'
function Home() {
    const [bookingCode, setBookingCode] = useState('');
    const [todaysGames, setTodayGames] = useState([]);
    const [freeGames, setFreeGames] = useState([]);
    const [previousGames, setPreviousGames] = useState([]);
  
    useEffect(() => {
      const fetchBookingCode = async () => {
        try {
          const response = await axios.get('https://wonit-backend.onrender.com/codes/');
          setBookingCode(response.data.codes[0].code); // Assuming the first code is the default one
        } catch (error) {
          console.error('Error fetching booking code:', error);
        }
      };
  
      fetchBookingCode();
    }, []);// Empty dependency array to run only once on mount
    useEffect(() => {
      const fetchGames = async () => {
        try {
          const response = await axios.get(`https://wonit-backend.onrender.com/games/`);
          const allGames = response.data.data;
          const todayList = [];
          const freeList = [];
          const previousList = [];
  
          allGames.forEach(game => {
            // const  = game.prediction_time; 
            const gameDateObj = new Date(); // Convert to JS Date object
            const gameDate = gameDateObj.toISOString().split('T')[0]; // Extract only 'YYYY-MM-DD'// Assuming your backend sends date like '2025-04-28'
            console.log(game.prediction_day)
            if ("today" === game.prediction_day) {
              todayList.push(game);
  
              if (game.game_type === 'free') {
                freeList.push(game);
              }
            } else {
              previousList.push(game);
            }
          });
  
          setTodayGames(todayList);
          setFreeGames(freeList);
          setPreviousGames(previousList);
  
          
  
        } catch (error) {
          console.error('Error fetching games:', error);
        }
      };
  
      fetchGames();
    }, []);
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

export default Home;