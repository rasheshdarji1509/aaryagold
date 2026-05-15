import React from 'react';
import { useTheme } from '../context/ThemeContext';
import logoLight from '../assets/aaya-logo.png';
import logoGolden from '../assets/golden logo.png';
import './Logo.css';

export default function Logo({ variant = 'full', className = '', forceGolden = false }) {
  const { theme } = useTheme();

  const logoSrc = (theme === 'dark' || forceGolden) ? logoGolden : logoLight;

  if (variant === 'text-only') {
    return (
      <div className={`brand-logo-text-only ${className}`}>
        <div className="brand-name-group">
          <span className="brand-name">AARYA</span>
          <span className="brand-slogan">AS GOOD AS GOLD</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`brand-logo-container ${className}`}>
      <div className="logo-icon-wrapper">
        <img src={logoSrc} alt="Aarya Gold" className="brand-icon" />
      </div>
      <div className="brand-name-group">
        <span className="brand-name">AARYA</span>
        <span className="brand-slogan">AS GOOD AS GOLD</span>
      </div>
    </div>
  );
}
