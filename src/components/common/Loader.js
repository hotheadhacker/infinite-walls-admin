import React from 'react';

const Loader = () => (
  <div className="loader">
    <svg className="loader-inner" viewBox="25 25 50 50">
        <circle className="loader-inner-circle" cx="50" cy="50" r="15" fill="none" strokeWidth="2" strokeMiterlimit="10" />
    </svg>
  </div>
)

export default Loader;
