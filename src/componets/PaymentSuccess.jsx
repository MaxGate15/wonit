import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  export default PaymentSuccess;