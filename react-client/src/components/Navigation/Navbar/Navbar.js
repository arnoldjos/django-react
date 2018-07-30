import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Auxil from '../../../hoc/Auxil';
import { logoutUser } from '../../../store/actions';
import './Navbar.scss';

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <Auxil>
        <div className="nav__menu-item">
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <div className="nav__menu-item">
          <Link to="/about">Developers</Link>
        </div>
        <div className="nav__menu-item">
          <a href="" onClick={this.onLogoutClick}>
            <img
              style={{ width: '25px', marginRight: '5px', borderRadius: '50%' }}
              src={
                user.avatar
                  ? user.avatar
                  : 'http://advaion.com/wp-content/uploads/2017/11/placeholder.png'
              }
              alt={user.name}
              title="Users profile image"
            />
            Logout
          </a>
        </div>
      </Auxil>
    );

    const guestLinks = (
      <Auxil>
        <div className="nav__menu-item">
          <Link to="/about">Developers</Link>
        </div>
        <div className="nav__menu-item">
          <Link to="/signup">Sign Up</Link>
        </div>
        <div className="nav__menu-item">
          <Link to="/login">Login</Link>
        </div>
      </Auxil>
    );

    return (
      <div className="nav">
        <div className="nav__container">
          <div className="nav__main">
            <NavLink to="/">Devconnector</NavLink>
          </div>

          <input type="checkbox" className="nav__checkbox" id="navi-toggle" />
          <label htmlFor="navi-toggle" className="nav__button">
            <span className="nav__icon">&nbsp;</span>
          </label>

          <div className="nav__menu">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
