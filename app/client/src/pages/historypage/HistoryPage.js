import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Message from '../../components/ui/message/Message';
import { dateFormat } from '../../helpers/dateFormat';
import './HistoryPage.css';

const HistoryPage = ({ purchase }) => {
  const renderPurchase = (purchase) => {
    if (purchase.length) {
      return (
        <ul className="history__list">
          {purchase.map((purch) => (
            <li key={purch._id} className="history__item">
              <div className="history__item-name">
                <span>Name: </span>
                {purch.name}
              </div>
              <div className="history__item-quantity">
                <span>Quantity: </span>
                {purch.quantity}
              </div>
              <div className="history__item-price">
                <span>Price: </span>
                {purch.price}
              </div>
              <div className="history__item-price">
                <span>Date of purchase: </span>
                {dateFormat(purch.dateOfPurchase)}
              </div>
            </li>
          ))}
        </ul>
      );
    }
    return <Message msg="You hane no purchase history!" classname="msg__warning history__msg" />;
  };
  return <section className="history">{renderPurchase(purchase)}</section>;
};

HistoryPage.propTypes = {
  purchase: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const { users, carts } = state;
  return {
    // purchase: state.carts.purchase,
    purchase: !carts.purchase.length ? users.user.history : carts.purchase,
  };
};

export default connect(mapStateToProps, null)(HistoryPage);
