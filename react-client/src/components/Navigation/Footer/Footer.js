import React from 'react';

import './Footer.scss';

export default () => {
  return (
    <footer>
      <div className="Footer">
        <p className="Footer__content">
          Copyright Arnoldjos &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};
