import React from 'react';
import './Contact.css';
// Import icons from react-icons library (need to install with: npm install react-icons)
import { FaPhone, FaEnvelope, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  const contactInfo = [
    {
      id: 1,
      type: 'Phone',
      value: '+82 10-8914-8469',
      icon: <FaPhone className="contact-icon" />,
      link: 'tel: 010-8914-8469'
    },
    {
      id: 2,
      type: 'Email',
      value: 'hyunini0408@gmail.com',
      icon: <FaEnvelope className="contact-icon" />,
      link: 'mailto:hyunini0408@gmail.com'
    },
    {
      id: 3,
      type: 'GitHub',
      value: 'https://github.com/hyuni0316',
      icon: <FaGithub className="contact-icon" />,
      link: 'https://github.com/hyuni0316'
    },
    {
      id: 4,
      type: 'LinkedIn',
      value: 'https://www.linkedin.com/in/hyun-lee-08523a283/',
      icon: <FaLinkedin className="contact-icon" />,
      link: 'https://www.linkedin.com/in/hyun-lee-08523a283/'
    },
    {
      id: 5,
      type: 'Instagram',
      value: '@hyun__ini',
      icon: <FaInstagram className="contact-icon" />,
      link: 'https://www.instagram.com/hyun__ini/'
    }
  ];

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <h2 className="section-title">Contact</h2>
        <p className="contact-intro">
          Feel free to reach out to me through any of the following channels:
        </p>
        <div className="contact-methods">
          {contactInfo.map(contact => (
            <a 
              key={contact.id} 
              href={contact.link} 
              className="contact-item"
              target={contact.type !== 'Phone' && contact.type !== 'Email' ? '_blank' : ''}
              rel={contact.type !== 'Phone' && contact.type !== 'Email' ? 'noopener noreferrer' : ''}
            >
              <div className="contact-icon-wrapper">
                {contact.icon}
              </div>
              <div className="contact-details">
                <h3 className="contact-type">{contact.type}</h3>
                <p className="contact-value">{contact.value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact; 