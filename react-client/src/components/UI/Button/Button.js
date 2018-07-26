import React from 'react';

import './Button.scss';

const Button = props => {
  let button = <button className="btn btn-primary">Submit</button>;

  if (props.type === 'submit') {
    return <input type="Submit" defaultValue="submit" />;
  }

  return button;
};

export default Button;
