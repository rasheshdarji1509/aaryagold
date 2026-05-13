import React, { useEffect, useState } from 'react';
import logoGolden from '../assets/golden logo.png';
import './Loader.css';

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Faster start, slower finish for natural feel
        const step = prev < 80 ? Math.random() * 8 : Math.random() * 2;
        return prev + step;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader-overlay">
      <div className="loader-backdrop-glow"></div>
      
      <div className="loader-content">
        {/* Ornate circular elements */}
        <div className="loader-visual">
          <div className="loader-rings-container">
            <div className="ring ring-outer"></div>
            <div className="ring ring-middle"></div>
            <div className="ring ring-inner"></div>
            <div className="ring ring-accent"></div>
          </div>
          
          <div className="loader-logo-container">
            <img src={logoGolden} alt="Aarya Gold" className="loader-brand-logo" />
            <div className="logo-shimmer"></div>
          </div>
        </div>

        <div className="loader-info">
          <div className="loader-brand-name">AARYA GOLD</div>
          <div className="loader-progress-section">
            <div className="loader-progress-track">
              <div 
                className="loader-progress-fill" 
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                <div className="loader-progress-glow"></div>
              </div>
            </div>
            <div className="loader-progress-stats">
              <span className="loader-status">AUTHENTICATING LUXURY</span>
              <span className="loader-percentage">{Math.min(Math.round(progress), 100)}%</span>
            </div>
          </div>
          <div className="loader-motto">EST. 1995 • KALBADEVI • MUMBAI</div>
        </div>
      </div>

      {/* Background particles for depth */}
      <div className="loader-particles">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`particle p-${i + 1}`}></div>
        ))}
      </div>
    </div>
  );
}
