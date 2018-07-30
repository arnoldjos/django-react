import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUser, clearErrors } from '../store/actions';
import InputField from '../components/UI/InputField/InputField';
import Button from '../components/UI/Button/Button';
import '../styles/Login.scss';

class Login extends Component {
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
        password: {
          value: '',
          type: 'password',
          placeholder: 'Password',
          label: 'Password',
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const user = {
      username: this.state.form.username.value,
      password: this.state.form.password.value
    };

    this.props.loginUser(user, this.props.history);
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
        : this.state.errors.non_field_errors
          ? (errors.username = this.state.errors.non_field_errors[0])
          : null;
      this.state.errors.password
        ? (errors.password = this.state.errors.password[0])
        : this.state.errors.non_field_errors
          ? (errors.password = this.state.errors.non_field_errors[0])
          : null;
    }
    return (
      <div className="Login">
        <div className="Login__container">
          <div className="Login__heading">
            <h1>Login to Devcon</h1>
          </div>

          <form noValidate onSubmit={this.onSubmit}>
            <div className="Login__form-container">
              {fields.map(field => {
                return (
                  <InputField
                    key={field}
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
              <div className="Login__submit-button">
                <Button
                  type="submit"
                  className="Login__btn"
                  defaultValue="Login"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

const mapDispatchToProps = dispatch => ({
  loginUser: (user, history) => dispatch(loginUser(user, history)),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
