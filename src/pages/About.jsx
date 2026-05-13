import { Award, ShieldCheck, Zap, CheckCircle, MessageCircle, Phone, Camera, User, Mail, Layers, Tag, Users, Truck, Briefcase } from 'lucide-react';
import './About.css';

// Team Images
import sagarbhaiImg from '../assets/Sagarbhai.avif';
import priyaImg from '../assets/Priya Sharma.avif';
import rajeshImg from '../assets/rajesh patel.avif';

export default function About() {
  const whyChoosePoints = [
    { 
      title: 'Extensive Collection', 
      desc: 'We offer a wide range of gold jewellery designs, from traditional to contemporary, catering to various market segments.',
      icon: <Layers size={24} />
    },
    { 
      title: 'Competitive Pricing', 
      desc: 'Our wholesale pricing is competitive, helping our retail partners maintain healthy profit margins while offering quality products.',
      icon: <Tag size={24} />
    },
    { 
      title: 'Quality Assurance', 
      desc: 'Every piece of jewellery undergoes rigorous quality checks to ensure it meets our high standards before reaching our clients.',
      icon: <ShieldCheck size={24} />
    },
    { 
      title: 'Personalized Service', 
      desc: 'We understand that each client has unique needs, and we strive to provide personalized service and solutions.',
      icon: <Users size={24} />
    },
    { 
      title: 'Timely Delivery', 
      desc: 'We respect your business timelines and ensure prompt and secure delivery of your orders.',
      icon: <Truck size={24} />
    },
    { 
      title: 'Industry Expertise', 
      desc: 'With decades of experience in the gold jewellery industry, we bring unparalleled skills and expertise to our partnerships.',
      icon: <Briefcase size={24} />
    }
  ];

  return (
    <div className="about-page">
      {/* ... Hero and other sections unchanged ... */}
      <section className="about-hero">
        <div className="about-container">
          <h1 className="animate-fade-down">About AARYA GOLD (CIYAZA) - MUMBAI</h1>
          <p className="animate-fade-up">Learn about our journey, values, and commitment to excellence in the gold jewellery industry.</p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="about-story">
        <div className="about-container">
          <div className="story-grid">
            <div className="story-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80" 
                alt="Exquisite Jewellery" 
                className="story-image"
              />
              <div className="story-experience-badge">
                <span className="years">30+</span>
                <span className="text">Years of Excellence</span>
              </div>
            </div>
            <div className="story-content">
              <span className="section-label">Our Story</span>
              <h2>A Legacy of Purity and Artistry</h2>
              <p>
                Founded with a vision to provide exceptional gold jewellery solutions across India, Aarya Gold has established itself as a trusted name in the wholesale jewellery market of Mumbai.
              </p>
              <p>
                Located in the historic Kalbadevi area, the heart of Mumbai's gold trade, we have built our reputation on the pillars of purity, trust, and craftsmanship. Our journey began with a simple mission: to create gold jewellery that combines traditional artistry with contemporary designs, meeting the diverse needs of our retail partners.
              </p>
              <p>
                Today, Aarya Gold stands as a symbol of excellence in the gold jewellery wholesale business, serving retail partners across the country with our extensive collection and personalized service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="about-values">
        <div className="about-container">
          <div className="values-header">
            <span className="section-label">Our Values</span>
            <h2 className="section-title">The Foundation of Our Business</h2>
            <p className="section-subtitle">
              At Aarya Gold, our values guide everything we do, from sourcing materials to crafting jewellery and building relationships with our clients.
            </p>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon"><Award size={32} /></div>
              <h3>Quality</h3>
              <p>We are committed to maintaining the highest standards of quality in every piece of jewellery we create, using only the finest materials and craftsmanship.</p>
            </div>
            <div className="value-card">
              <div className="value-icon"><ShieldCheck size={32} /></div>
              <h3>Trust</h3>
              <p>Building and maintaining trust with our clients is at the core of our business. We believe in transparency, integrity, and honest relationships.</p>
            </div>
            <div className="value-card">
              <div className="value-icon"><Zap size={32} /></div>
              <h3>Innovation</h3>
              <p>While respecting traditional craftsmanship, we continuously innovate to meet the evolving tastes and preferences of the modern market.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="why-choose">
        <div className="about-container">
          <div className="values-header">
            <span className="section-label">Why Us</span>
            <h2 className="section-title">Why Choose Aarya Gold</h2>
          </div>

          <div className="why-grid">
            {whyChoosePoints.map((item, idx) => (
              <div key={idx} className="why-item">
                <div className="why-icon-box">
                  {item.icon}
                </div>
                <div className="why-text">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="about-team">
        <div className="about-container">
          <div className="values-header">
            <span className="section-label">The Experts</span>
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">
              Meet the dedicated professionals behind Aarya Gold who work tirelessly to bring you the finest gold jewellery.
            </p>
          </div>

          <div className="team-grid">
            {[
              { 
                name: 'Sagarbhai', 
                role: 'Founder & CEO', 
                bio: 'With over 30 years of experience in the gold jewellery industry, Sagarbhai leads Aarya Gold with vision and expertise.',
                img: sagarbhaiImg 
              },
              { 
                name: 'Priya Sharma', 
                role: 'Design Director', 
                bio: 'Priya brings creativity and modern insight to our design process, ensuring our collections stay ahead of trends.',
                img: priyaImg 
              },
              { 
                name: 'Rajesh Patel', 
                role: 'Operations Manager', 
                bio: 'Rajesh ensures smooth operations and timely delivery, maintaining our reputation for reliability and efficiency.',
                img: rajeshImg 
              }
            ].map((member, idx) => (
              <div key={idx} className="team-card">
                <div className="team-image-box">
                  <img src={member.img} alt={member.name} />
                </div>
                <div className="team-info">
                  <h4>{member.name}</h4>
                  <span className="role">{member.role}</span>
                  <p className="bio">{member.bio}</p>
                  <div className="team-socials">
                    <a href="#" className="team-social-btn"><Camera size={16} /></a>
                    <a href="#" className="team-social-btn"><User size={16} /></a>
                    <a href="#" className="team-social-btn"><Mail size={16} /></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="about-container">
          <div className="cta-content">
            <h2>Join our network of satisfied retailers and discover the difference that quality gold jewellery can make for your business.</h2>
            <div className="cta-buttons">
              <button className="cta-btn cta-btn-primary">
                Contact Us Today
              </button>
              <button className="cta-btn cta-btn-outline">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                  <MessageCircle size={20} />
                  WhatsApp Now
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
