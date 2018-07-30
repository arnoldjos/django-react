import React from 'react';

import './Button.scss';

const Button = props => {
  let btnClasses = ['btn'];

  if (props.className) {
    btnClasses.push(props.className);
  }

  let button = <button className={btnClasses.join(' ')}>Submit</button>;

  if (props.type === 'submit') {
    return (
      <input
        className={btnClasses.join(' ')}
        type="Submit"
        defaultValue={props.defaultValue}
      />
    );
  }

  return button;
};

export default Button;
