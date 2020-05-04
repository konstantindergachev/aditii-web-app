import React from 'react';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <section className="contacts">
      <div className="contacts__left">
        <ul className="contacts__list">
          <li className="contacts__item">
            Address: <span>101-A Klochkivska St. Karkiv, Ukraine</span>
          </li>
          <li className="contacts__item">
            Mobile: <span>+38(066) 724-52-34</span>
          </li>
          <li className="contacts__item">
            Email: <span>dergachevkonstantin@gmail.com</span>
          </li>
        </ul>
      </div>
      <div className="contacts__right">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2564.3235823547307!2d36.21556551600417!3d50.00528997941642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4127a11ea299d857%3A0xcf6e3d540740a41a!2sKlochkivska%20St%2C%20101%2C%20Kharkiv%2C%20Kharkivs&#39;ka%20oblast%2C%2061000!5e0!3m2!1sen!2sua!4v1588409869757!5m2!1sen!2sua"
          className="contacts__map"
          title="map"
          frameBorder="0"
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
        />
      </div>
    </section>
  );
};

export default ContactPage;
