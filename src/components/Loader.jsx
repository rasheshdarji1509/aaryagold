import React, { useEffect, useState } from 'react';
import logoGolden from '../assets/golden logo.png';
import './Loader.css';

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return prev + Math.random() * 12;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader-overlay">
      <div className="loader-content">
        {/* Animated rings */}
        <div className="loader-rings">
          <div className="ring ring-1"></div>
          <div className="ring ring-2"></div>
          <div className="ring ring-3"></div>
        </div>

        {/* Logo */}
        <div className="loader-logo">
          <div className="loader-logo-icon">
            <img src={logoGolden} alt="Aarya Gold" className="loader-main-logo" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="loader-progress-bar">
          <div className="loader-progress-fill" style={{ width: `${Math.min(progress, 100)}%` }}></div>
        </div>
        <div className="loader-progress-text">{Math.min(Math.round(progress), 100)}%</div>
        <div className="loader-tagline">Crafting Elegance Since Kalbadevi</div>
      </div>
    </div>
  );
}
