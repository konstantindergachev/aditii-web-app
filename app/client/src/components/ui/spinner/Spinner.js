import React from 'react';
import './Spinner.css';

const Spinner = () => {
  return (
    <span className="main__loader">
      <span className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </span>
    </span>
  );
};
export default Spinner;
