import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

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

              {/* Social Connect */}
              <div className="social-connect-section">
                <h4>Connect With Us</h4>
                <div className="social-icon-grid">
                  <a href="https://instagram.com/aaryagold" target="_blank" rel="noreferrer" className="contact-social-btn" title="Instagram">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href="https://facebook.com/aaryagold" target="_blank" rel="noreferrer" className="contact-social-btn" title="Facebook">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a href="https://twitter.com/aaryagold" target="_blank" rel="noreferrer" className="contact-social-btn" title="Twitter / X">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </a>
                  <a href="https://wa.me/918866600953" target="_blank" rel="noreferrer" className="contact-social-btn" title="WhatsApp">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412 0 12.048c0 2.12.554 4.189 1.605 6.04L0 24l6.117-1.605a11.82 11.82 0 005.933 1.598h.005c6.637 0 12.048-5.414 12.052-12.05.002-3.218-1.252-6.243-3.528-8.518" />
                    </svg>
                  </a>
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

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="contact-container">
          <div className="section-header text-center">
            <span className="section-label">Common Questions</span>
            <h2 className="faq-title">Frequently Asked Questions</h2>
            <p className="faq-subtitle">Everything you need to know about partnering with Aarya Gold for your wholesale needs.</p>
          </div>

          <div className="faq-accordion">
            {[
              {
                q: "What is the minimum order quantity (MOQ)?",
                a: "As a wholesale-only establishment, we typically have a minimum order weight or quantity depending on the category. For new partners, we offer flexible starting orders to help you sample our collection."
              },
              {
                q: "Do you offer purity certification?",
                a: "Absolutely. All our gold jewellery comes with mandatory hallmarking and purity certifications as per industry standards. We maintain 100% transparency in our gold karats and weights."
              },
              {
                q: "How long does custom order manufacturing take?",
                a: "Custom designs and bulk orders usually take 10-21 business days depending on the complexity of the craftsmanship and current production queue."
              },
              {
                q: "Do you provide insured shipping nationwide?",
                a: "Yes, we partner with specialized logistics providers to ensure all wholesale shipments are fully insured and tracked until they reach your doorstep across India."
              },
              {
                q: "How can I view your latest full catalog?",
                a: "You can visit our showroom in Kalbadevi, Mumbai, or contact us via WhatsApp to receive digital brochures and real-time updates on our new arrivals."
              }
            ].map((faq, idx) => (
              <div key={idx} className={`faq-item ${activeFaq === idx ? 'active' : ''}`} onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                <div className="faq-question">
                  <span>{faq.q}</span>
                  <div className="faq-icon">
                    {activeFaq === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
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
