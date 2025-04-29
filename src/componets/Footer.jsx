import React, { useState } from 'react';
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
  export default Footer;