import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

import './InputField.scss';

class InputField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showError: false
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.error) {
  //     this.setState({ showErrors: true });
  //   }
  // }

  static getDerivedStateFromProps(props, state) {
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.
    if (props.error !== null) {
      return {
        showError: true
      };
    } else {
      return {
        showError: false
      };
    }
    return null;
  }

  render() {
    let inputClasses = ['Group__input'];

    this.props.className ? inputClasses.push(this.props.className) : null;
    this.state.showError ? inputClasses.push('Group__input-invalid') : null;

    // if (this.props.touched && this.state.showError && !this.props.valid) {
    //   inputClasses.pop();
    // }

    return (
      <div className="Group">
        {this.props.error ? (
          <CSSTransition classNames="fade" timeout={1000}>
            <p className="Group__error">{this.props.error}</p>
          </CSSTransition>
        ) : null}
        <input
          className={inputClasses.join(' ')}
          type={this.props.type}
          placeholder={this.props.placeholder}
          name={this.props.name}
          id={this.props.id}
          onChange={this.props.onChange}
        />
        <label className="Group__label" htmlFor={this.props.id}>
          {this.props.label}
        </label>
      </div>
    );
  }
}

export default InputField;
