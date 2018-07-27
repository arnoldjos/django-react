import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUser, clearErrors } from '../store/actions';
import Button from '../components/UI/Button/Button';
import InputField from '../components/UI/InputField/InputField';
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
              <InputField
                className="Signup__input"
                error={errors.username ? errors.username : null}
                type="text"
                id="username"
                name="username"
                onChange={this.onChange}
                placeholder="User Name"
                label="User Name"
              />
              <InputField
                className="Signup__input"
                error={errors.first_name ? errors.first_name : null}
                type="text"
                id="first_name"
                name="first_name"
                onChange={this.onChange}
                placeholder="First Name"
                label="First Name"
              />
              <InputField
                className="Signup__input"
                error={errors.last_name ? errors.last_name : null}
                type="text"
                id="last_name"
                name="last_name"
                onChange={this.onChange}
                placeholder="Last Name"
                label="Last Name"
              />
              <InputField
                className="Signup__input"
                error={errors.email ? errors.email : null}
                type="email"
                id="email"
                name="email"
                onChange={this.onChange}
                placeholder="email@sample.com"
                label="Email"
              />
              <InputField
                className="Signup__input"
                error={errors.password ? errors.password : null}
                type="password"
                id="password"
                name="password"
                onChange={this.onChange}
                placeholder="Password"
                label="Password"
              />
              <InputField
                className="Signup__input"
                error={errors.password2 ? errors.password2 : null}
                type="password"
                id="password2"
                name="password2"
                onChange={this.onChange}
                placeholder="Confirm Password"
                label="Confirm Password"
              />
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
