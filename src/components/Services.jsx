import React from 'react';
import { Gem, Handshake, Truck } from 'lucide-react';
import './Services.css';

const servicesData = [
  {
    id: 1,
    icon: Gem,
    title: "Premium Gold Collection",
    description: "Access our extensive collection of high-quality gold jewellery pieces designed for the modern retailer."
  },
  {
    id: 2,
    icon: Handshake,
    title: "Wholesale Partnerships",
    description: "Build long-term business relationships with competitive pricing and reliable supply chains."
  },
  {
    id: 3,
    icon: Truck,
    title: "Secure Delivery",
    description: "Benefit from our secure and insured delivery services to locations across India."
  }
];

export default function Services() {
  return (
    <section className="services-section">
      <div className="container">
        <div className="services-content-wrapper">
          <div className="services-header">
            <h2 className="services-title">Our <span className="gold-text">Services</span></h2>
            <p className="services-subtitle">Discover our comprehensive range of gold jewellery wholesale services.</p>
            <div className="divider-gold"></div>
          </div>

          <div className="services-grid">
            {servicesData.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-icon-wrapper">
                  <service.icon className="service-icon" size={32} />
                </div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
