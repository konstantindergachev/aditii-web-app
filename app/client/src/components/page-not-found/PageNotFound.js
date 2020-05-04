import React from 'react';
import { withRouter } from 'react-router-dom';
import './PageNotFound.css';

const PageNotFound = () => (
  <div className="page__not-found">
    <h1 className="error__text">404</h1>
    <h2 className="error__text">Page not found!</h2>
  </div>
);
export default withRouter(PageNotFound);
