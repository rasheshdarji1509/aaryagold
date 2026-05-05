import React from 'react';
import { Award, ShieldCheck, Users, Zap } from 'lucide-react';

export default function About() {
  return (
    <div className="about-page" style={{ paddingTop: '5rem' }}>
      {/* Hero Section */}
      <section style={{ 
        height: '400px', 
        background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1400&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <div className="container">
          <span className="section-label" style={{ color: 'var(--gold-light)' }}>Since 2005</span>
          <h1 className="section-title" style={{ fontSize: '4rem' }}>Our <span className="gold-text">Legacy</span></h1>
        </div>
      </section>

      {/* Story Section */}
      <section style={{ padding: '8rem 2rem' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
          <div>
            <span className="section-label">Our Story</span>
            <h2 className="section-title" style={{ marginBottom: '2rem', color: 'var(--text-heading)' }}>Crafting Excellence in <br/><span className="gold-text">Kalbadevi</span></h2>
            <p style={{ color: 'var(--text-body)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              Founded with a vision to provide exceptional gold jewellery to retailers across India, Aarya Gold has established itself as a trusted name in the wholesale jewellery market of Mumbai.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
              Located in the historic Kalbadevi area, the heart of Mumbai's gold trade, we have built our reputation on the pillars of quality, trust, and craftsmanship. Our journey began with a simple mission: to create gold jewellery that combines traditional artistry with contemporary designs, meeting the diverse needs of our retail partners.
            </p>
          </div>
          <div style={{ position: 'relative' }}>
            <img 
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80" 
              alt="Workshop" 
              style={{ borderRadius: '4px', boxShadow: '20px 20px 0 var(--bg-card)' }}
            />
            <div style={{ 
              position: 'absolute', 
              bottom: '-2rem', 
              right: '-2rem', 
              background: 'var(--gold-primary)', 
              color: 'var(--bg-black)', 
              padding: '2rem', 
              borderRadius: '2px',
              fontFamily: 'var(--font-serif)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700' }}>20+</div>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Years of Expertise</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{ padding: '8rem 2rem', background: 'var(--bg-dark)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <span className="section-label">Core Values</span>
            <h2 className="section-title">The <span className="gold-text">Pillars</span> of Aarya Gold</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
            {[
              { icon: <Award size={32} />, title: 'Quality', text: 'We maintain the highest standards in every piece using only the finest materials.' },
              { icon: <ShieldCheck size={32} />, title: 'Trust', text: 'Building and maintaining trust with clients is at the core of our business.' },
              { icon: <Zap size={32} />, title: 'Innovation', text: 'Continuously innovating to meet the evolving tastes of the modern market.' },
              { icon: <Users size={32} />, title: 'Expertise', text: 'Decades of experience in the gold jewellery industry brings valuable insights.' },
            ].map((val, idx) => (
              <div key={idx} style={{ 
                background: 'var(--bg-card)', 
                padding: '3rem 2rem', 
                borderRadius: '4px', 
                border: '1px solid var(--border-subtle)',
                textAlign: 'center'
              }}>
                <div style={{ color: 'var(--gold-primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>{val.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-heading)' }}>{val.title}</h3>
                <p style={{ color: 'var(--text-body)', fontSize: '0.9rem', lineHeight: '1.6' }}>{val.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={{ padding: '8rem 2rem' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <span className="section-label">Our Leaders</span>
            <h2 className="section-title">The <span className="gold-text">Visionaries</span></h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            {[
              { name: 'Sagarbhai', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
              { name: 'Priya Sharma', role: 'Design Director', img: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80' },
              { name: 'Rajesh Patel', role: 'Operations Manager', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
            ].map((member, idx) => (
              <div key={idx} className="team-card" style={{ textAlign: 'center' }}>
                <div style={{ position: 'relative', marginBottom: '1.5rem', overflow: 'hidden', borderRadius: '4px' }}>
                  <img src={member.img} alt={member.name} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} />
                </div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '0.25rem', color: 'var(--text-heading)' }}>{member.name}</h4>
                <p style={{ color: 'var(--gold-primary)', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
