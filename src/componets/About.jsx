import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

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

  export default About;