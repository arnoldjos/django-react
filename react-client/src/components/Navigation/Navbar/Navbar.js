import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './Navbar.scss';

export default () => {
  return (
    <div className="nav">
      <div className="nav__container">
        <NavLink className="nav__main" to="/">
          Devconnector
        </NavLink>
        <input type="checkbox" className="nav__checkbox" id="navi-toggle" />
        <label htmlFor="navi-toggle" className="nav__button">
          <span className="nav__icon">&nbsp;</span>
        </label>

        <div className="nav__menu">
          <Link className="nav__menu-item" to="/about">
            Developers
          </Link>
          <Link className="nav__menu-item" to="/signup">
            Sign Up
          </Link>
          <Link className="nav__menu-item" to="/hello">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
