import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      Made with{' '}
      <span role="img" aria-label="heart emoji">
        ❤️
      </span>{' '}
      &{' '}
      <span role="img" aria-label="react emoji">
        ⚛️
      </span>{' '}
      by <a href="http://liam.nz">Liam</a>.
      <br />
      <Link to="/about">About this site</Link>
    </footer>
  );
};
export default Footer;
