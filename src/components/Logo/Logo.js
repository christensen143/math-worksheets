import React from 'react';

import { Image } from 'react-bootstrap';

import './Logo.css';

import logo from '../../images/logo500x500.png';

const Logo = () => {
  return (
    <div className="Logo">
      <Image
        className="mx-auto d-block"
        src={logo}
        width="100px"
        height="100px"
      />
    </div>
  );
};

export default Logo;
