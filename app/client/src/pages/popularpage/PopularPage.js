import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './PopularPage.css';

class PopularPage extends Component {
  state = {
    image: '',
    name: '',
    description: '',
    sold: '',
  };

  static getDerivedStateFromProps(props, state) {
    const { location: { state: st } } = props;
    if (st) {
      return {
        image: st.image,
        name: st.name,
        description: st.description,
        sold: st.sold,
      };
    }
    return null;
  }

  render() {
    const { image, name, description, sold } = this.state;
    return (
      <section className="popular">
        <div className="popular__wrapper">
          <h2 className="popular__title title">{name}</h2>
          <img src={image} alt={name} className="popular__img" />
          <p className="popular__description ">{description}</p>
          <div className="popular__sold">
            Sold: <span>{sold}</span>
          </div>
        </div>
      </section>
    );
  }
}

PopularPage.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  sold: PropTypes.number,
};

export default PopularPage;
