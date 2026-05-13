import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const mapsQuery = encodeURIComponent(
    '1ST FLOOR, 23/25, Room No.1, Indrapuja, Shaikh Memon Street, Champa Gully, M.J.Market, Kalbadevi, Mumbai - 400002'
  );

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-container">
          <span className="section-label">Connect With Us</span>
          <h1 className="animate-fade-down">Wholesale Inquiries</h1>
          <p className="animate-fade-up">
            Partner with Mumbai's premier gold jewellery wholesaler. Reach out to discuss bulk orders,
            view our exclusive collections, or explore dealership opportunities.
          </p>
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="contact-grid-section">
        <div className="contact-container">
          <div className="contact-grid">

            {/* Left: Contact Info */}
            <div className="contact-info-panel">
              <h3 className='text-black'>Visit Our Showroom in Kalbadevi</h3>

              <div className="info-item">
                <div className="info-icon-box">
                  <MapPin size={24} />
                </div>
                <div className="info-text">
                  <h4>Our Location</h4>
                  <p>
                    1ST FLOOR, 23/25, Room No.1, Indrapuja, <br />
                    Shaikh Memon Street, Champa Gully, M.J.Market, <br />
                    Kalbadevi, Mumbai, Maharashtra 400002
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                    target="_blank"
                    rel="noreferrer"
                    className="gold-text-link"
                    style={{ fontSize: '0.9rem', marginTop: '0.5rem', display: 'inline-block' }}
                  >
                    Get Directions
                  </a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-box">
                  <Phone size={24} />
                </div>
                <div className="info-text">
                  <h4>Call / WhatsApp</h4>
                  <p>+91 8866600953 <span className="sub-text">(Sagarbhai - Founder)</span></p>
                  <p>+91 7304421336 <span className="sub-text">(Support & Orders)</span></p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-box">
                  <Mail size={24} />
                </div>
                <div className="info-text">
                  <h4>Email Us</h4>
                  <p>aaryagoldmumbai@gmail.com</p>
                  <p className="sub-text">Inquiries are usually answered within 24 hours.</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-box">
                  <Clock size={24} />
                </div>
                <div className="info-text">
                  <h4>Business Hours</h4>
                  <p>Mon – Sat: 12:00 PM – 7:00 PM</p>
                  <p className="sub-text">Closed on Sundays and Public Holidays.</p>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="contact-form-panel">
              {submitted ? (
                <div className="success-state animate-fade-in">
                  <CheckCircle size={80} className="success-icon" />
                  <h3>Message Sent!</h3>
                  <p>Thank you for your interest. Sagarbhai or our team will get back to you shortly to discuss your inquiry.</p>
                  <button className="cta-btn cta-btn-outline" style={{ marginTop: '2.5rem' }} onClick={() => setSubmitted(false)}>
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="animate-fade-up">
                  <div className="form-row">
                    <div className="input-group">
                      <label>Full Name</label>
                      <input required type="text" placeholder="Your Name" />
                    </div>
                    <div className="input-group">
                      <label>Business Name</label>
                      <input type="text" placeholder="Company Name" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="input-group">
                      <label>Email Address</label>
                      <input required type="email" placeholder="email@example.com" />
                    </div>
                    <div className="input-group">
                      <label>Phone Number</label>
                      <input required type="tel" placeholder="+91 XXXX XXX XXX" />
                    </div>
                  </div>

                  <div className="input-group" style={{ marginBottom: '2.5rem' }}>
                    <label>How can we help you?</label>
                    <textarea required rows="5" placeholder="Tell us about your wholesale requirements..."></textarea>
                  </div>

                  <button type="submit" className="submit-btn">
                    <span>Submit Inquiry</span>
                    <Send size={18} />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-container">
        <iframe
          title="Aarya Gold Location"
          src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
          className="map-section"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen
        />
      </section>
    </div>
  );
}
