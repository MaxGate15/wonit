import React, { useState } from 'react';

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

  export default GhanaPaymentModal;