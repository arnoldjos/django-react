import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUser, clearErrors } from '../store/actions';
import Button from '../components/UI/Button/Button';
import '../styles/Signup.scss';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      errors: {}
    };
  }

  componentDidMount() {
    if (Object.keys(this.props.errors).length > 0) {
      this.props.clearErrors();
    }
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (props.errors !== state.errors) {
  //     state = {
  //       ...state,
  //       errors: state.errors
  //     };
  //     return state;
  //   }
  //   return state;
  // }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    let errors = {};

    console.log(Object.keys(this.state.errors).length);
    if (Object.keys(this.state.errors).length > 0) {
      this.state.errors.username
        ? (errors.username = this.state.errors.username[0])
        : null;
      this.state.errors.first_name
        ? (errors.first_name = this.state.errors.first_name[0])
        : null;
      this.state.errors.last_name
        ? (errors.last_name = this.state.errors.last_name[0])
        : null;
      this.state.errors.email
        ? (errors.email = this.state.errors.email[0])
        : null;
      this.state.errors.password
        ? (errors.password = this.state.errors.password[0])
        : this.state.errors.non_field_errors
          ? (errors.password = this.state.errors.non_field_errors[0])
          : null;
      this.state.errors.password2
        ? (errors.password2 = this.state.errors.password2[0])
        : null;
    }

    return (
      <div className="Signup">
        <div className="Signup__container">
          <h1 className="Signup__heading">Connect With Other Developers</h1>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="Signup__form-container">
              <div className="Signup__form-group">
                {errors.username ? (
                  <p className="Signup__errors">{errors.username}</p>
                ) : null}
                <input
                  className="Signup__input"
                  type="text"
                  placeholder="User Name"
                  name="username"
                  id="username"
                  onChange={this.onChange}
                />
                <label className="Signup__label" htmlFor="username">
                  User Name
                </label>
              </div>
              <div className="Signup__form-group">
                {errors.first_name ? (
                  <p className="Signup__errors">{errors.first_name}</p>
                ) : null}
                <input
                  className="Signup__input"
                  type="text"
                  placeholder="First Name"
                  name="first_name"
                  id="first_name"
                  onChange={this.onChange}
                />
                <label className="Signup__label" htmlFor="first_name">
                  First Name
                </label>
              </div>
              <div className="Signup__form-group">
                {errors.last_name ? (
                  <p className="Signup__errors">{errors.last_name}</p>
                ) : null}
                <input
                  className="Signup__input"
                  type="text"
                  placeholder="Last Name"
                  name="last_name"
                  id="last_name"
                  onChange={this.onChange}
                />
                <label className="Signup__label" htmlFor="last_name">
                  Last Name
                </label>
              </div>
              <div className="Signup__form-group">
                {errors.email ? (
                  <p className="Signup__errors">{errors.email}</p>
                ) : null}
                <input
                  className="Signup__input"
                  type="email"
                  placeholder="email@sample.com"
                  name="email"
                  id="email"
                  onChange={this.onChange}
                />
                <label className="Signup__label" htmlFor="email">
                  Email
                </label>
              </div>
              <div className="Signup__form-group">
                {errors.password ? (
                  <p className="Signup__errors">{errors.password}</p>
                ) : null}
                <input
                  className="Signup__input"
                  type="password"
                  placeholder="Password"
                  name="password"
                  id="password"
                  onChange={this.onChange}
                />
                <label className="Signup__label" htmlFor="password">
                  Password
                </label>
              </div>
              <div className="Signup__form-group">
                {errors.password2 ? (
                  <p className="Signup__errors">{errors.password2}</p>
                ) : null}
                <input
                  className="Signup__input"
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  id="password2"
                  onChange={this.onChange}
                />
                <label className="Signup__label" htmlFor="password2">
                  Confirm Password
                </label>
              </div>
              <div className="Signup__submit-button">
                <Button type="submit" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  registerUser: userData => dispatch(registerUser(userData)),
  clearErrors: () => dispatch(clearErrors())
});

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
