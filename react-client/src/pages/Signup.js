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
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      errors: ''
    };
  }

  componentDidMount() {
    if (Object.keys(this.props.errors).length > 0) {
      this.props.clearErrors();
    }
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (props.errors !== state.errors && props.errors) {
  //     this.setState({ errors: 'asd' });
  //   }
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
      firstname: this.state.firstname,
      lastname: this.state.lastname,
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
    console.log(this.state.errors);

    return (
      <div className="Signup">
        <div className="Signup__container">
          <h1 className="Signup__heading">Connect With Other Developers</h1>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="Signup__form-container">
              <div className="Signup__form-group">
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
                <input
                  className="Signup__input"
                  type="text"
                  placeholder="First Name"
                  name="firstname"
                  id="firstname"
                  onChange={this.onChange}
                />
                <label className="Signup__label" htmlFor="firstname">
                  First Name
                </label>
              </div>
              <div className="Signup__form-group">
                <input
                  className="Signup__input"
                  type="text"
                  placeholder="Last Name"
                  name="lastname"
                  id="lastname"
                  onChange={this.onChange}
                />
                <label className="Signup__label" htmlFor="lastname">
                  Last Name
                </label>
              </div>
              <div className="Signup__form-group">
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
