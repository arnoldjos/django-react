import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

import './InputField.scss';

class InputField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showErrors: true
    };
  }

  render() {
    let inputClasses = ['Group__input'];

    this.props.className ? inputClasses.push(this.props.className) : null;
    this.props.error ? inputClasses.push('Group__input-invalid') : null;

    return (
      <div className="Group">
        {this.props.error ? (
          <p className="Group__error">{this.props.error}</p>
        ) : null}
        <input
          className={inputClasses.join(' ')}
          type={this.props.type}
          placeholder={this.props.placeholder}
          name={this.props.name}
          id={this.props.id}
          onChange={this.props.onChange}
          onFocus={this.onFocus}
        />
        <label className="Group__label" htmlFor={this.props.id}>
          {this.props.label}
        </label>
      </div>
    );
  }
}

export default InputField;
