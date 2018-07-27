import React, { Component } from 'react';

export default class InputField extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Signup__form-group">
        {this.props.errors ? (
          <p className="Signup__errors">{this.props.errors}</p>
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
    );
  }
}
