import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';



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
  export default VIP;