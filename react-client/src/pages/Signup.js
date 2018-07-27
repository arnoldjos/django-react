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
      form: {
        username: {
          value: '',
          type: 'text',
          placeholder: 'User Name',
          label: 'User Name',
          valid: false,
          touched: false
        },
        first_name: {
          value: '',
          type: 'text',
          placeholder: 'First Name',
          label: 'First Name',
          valid: false,
          touched: false
        },
        last_name: {
          value: '',
          type: 'text',
          placeholder: 'Last Name',
          label: 'Last Name',
          valid: false,
          touched: false
        },
        email: {
          value: '',
          type: 'email',
          placeholder: 'Email',
          label: 'Email',
          valid: false,
          touched: false
        },
        password: {
          value: '',
          type: 'password',
          placeholder: 'Password',
          label: 'Password',
          valid: false,
          touched: false
        },
        password2: {
          value: '',
          type: 'password',
          placeholder: 'Confirm Password',
          label: 'Confirm password',
          valid: false,
          touched: false
        }
      },
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
    const keys = Object.keys(this.state.form);

    // keys.map(key => {
    //   const updatedFormElement = {
    //     ...key,
    //     touched: false
    //   };

    //   const updatedForm = {
    //     ...this.state.form,
    //     key: updatedFormElement
    //   };

    //   this.setState({ ...this.state, updatedForm });
    // });

    const newUser = {
      username: this.state.form.username.value,
      first_name: this.state.form.first_name.value,
      last_name: this.state.form.last_name.value,
      email: this.state.form.email.value,
      password: this.state.form.password.value,
      password2: this.state.form.password2.value
    };

    this.props.registerUser(newUser);
  };

  onChange = e => {
    const updatedFormElement = {
      ...this.state.form[e.target.name],
      value: e.target.value
    };

    const updatedForm = {
      ...this.state.form,
      [e.target.name]: updatedFormElement
    };

    this.setState({ ...this.state, form: updatedForm });
  };

  render() {
    const fields = Object.keys(this.state.form);
    let errors = {};

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
              {fields.map(field => {
                return (
                  <InputField
                    key={field}
                    className="Signup__input"
                    error={errors[field] ? errors[field] : null}
                    type={this.state.form[field].type}
                    id={field}
                    name={field}
                    placeholder={this.state.form[field].placeholder}
                    label={this.state.form[field].label}
                    onChange={this.onChange}
                    touched={this.state.form[field].touched}
                  />
                );
              })}

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
