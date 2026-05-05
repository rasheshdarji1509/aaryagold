import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="contact-page" style={{ paddingTop: '5rem' }}>
      <section style={{ padding: '6rem 2rem' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <span className="section-label">Get In Touch</span>
            <h1 className="section-title" style={{ color: 'var(--text-heading)' }}>Wholesale <span className="gold-text">Inquiries</span></h1>
            <p style={{ color: 'var(--text-body)', marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}>
              We partner with retailers and boutiques across India. Reach out to discuss partnerships, 
              view our latest collection, or place bulk orders.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '5rem' }}>
            {/* Contact Info */}
            <div>
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', marginBottom: '2rem', color: 'var(--text-heading)' }}>Visit Our Showroom</h3>
                
                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div style={{ width: '48px', height: '48px', background: 'rgba(201, 168, 76, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={20} color="var(--gold-primary)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--gold-primary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Location</h4>
                    <p style={{ color: 'var(--text-body)', lineHeight: '1.6' }}>
                      1ST FLOOR, 23/25, Room No.1, Indrapuja, <br/>
                      Shaikh Memon Street, Champa Gully, M.J.Market, <br/>
                      Kalbadevi, Mumbai, Maharashtra, 400002
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div style={{ width: '48px', height: '48px', background: 'rgba(201, 168, 76, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={20} color="var(--gold-primary)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--gold-primary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Call / WhatsApp</h4>
                    <p style={{ color: 'var(--text-body)', fontWeight: '600' }}>+91 8866600953 (Sagarbhai)</p>
                    <p style={{ color: 'var(--text-muted)' }}>+91 7304421336 (Order Support)</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div style={{ width: '48px', height: '48px', background: 'rgba(201, 168, 76, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={20} color="var(--gold-primary)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--gold-primary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Email</h4>
                    <p style={{ color: 'var(--text-light)' }}>aaryagoldmumbai@gmail.com</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ width: '48px', height: '48px', background: 'rgba(201, 168, 76, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={20} color="var(--gold-primary)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--gold-primary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Business Hours</h4>
                    <p style={{ color: 'var(--text-light)' }}>Mon – Sat: 12:00 PM – 7:00 PM</p>
                    <p style={{ color: 'var(--text-muted)' }}>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div style={{ 
              background: 'var(--bg-card)', 
              padding: '4rem', 
              borderRadius: '4px', 
              border: '1px solid var(--border-subtle)' 
            }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{ color: '#4BB543', marginBottom: '1.5rem' }}>
                    <CheckCircle size={64} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1rem' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--text-muted)' }}>Thank you for reaching out. Sagarbhai or our team will contact you shortly.</p>
                  <button className="btn-outline" style={{ marginTop: '2rem' }} onClick={() => setSubmitted(false)}>
                    <span>Send Another Message</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div className="input-group">
                      <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Name</label>
                      <input required type="text" style={{ width: '100%', padding: '1rem', background: 'var(--bg-dark)', border: '1px solid var(--border-subtle)', borderRadius: '2px', color: 'white', outline: 'none' }} />
                    </div>
                    <div className="input-group">
                      <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Business Name</label>
                      <input type="text" style={{ width: '100%', padding: '1rem', background: 'var(--bg-dark)', border: '1px solid var(--border-subtle)', borderRadius: '2px', color: 'white', outline: 'none' }} />
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div className="input-group">
                      <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Email</label>
                      <input required type="email" style={{ width: '100%', padding: '1rem', background: 'var(--bg-dark)', border: '1px solid var(--border-subtle)', borderRadius: '2px', color: 'white', outline: 'none' }} />
                    </div>
                    <div className="input-group">
                      <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Phone Number</label>
                      <input required type="tel" style={{ width: '100%', padding: '1rem', background: 'var(--bg-dark)', border: '1px solid var(--border-subtle)', borderRadius: '2px', color: 'white', outline: 'none' }} />
                    </div>
                  </div>

                  <div className="input-group" style={{ marginBottom: '2.5rem' }}>
                    <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Message</label>
                    <textarea required rows="5" style={{ width: '100%', padding: '1rem', background: 'var(--bg-dark)', border: '1px solid var(--border-subtle)', borderRadius: '2px', color: 'white', outline: 'none', resize: 'none' }}></textarea>
                  </div>

                  <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                    <span>Send Message</span>
                    <Send size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section style={{ height: '500px', background: 'var(--bg-dark)', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
             <MapPin size={48} color="var(--gold-primary)" style={{ marginBottom: '1rem' }} />
             <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--text-heading)' }}>Kalbadevi, Mumbai</h3>
             <p style={{ color: 'var(--text-body)' }}>The heart of India's gold trade</p>
          </div>
        </div>
      </section>
    </div>
  );
}
