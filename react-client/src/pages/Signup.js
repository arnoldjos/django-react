import React from 'react';

import '../styles/Signup.scss';

export default () => {
  return (
    <div className="Signup">
      <form>
        <div className="Signup__form-group">
          <input
            type="text"
            placeholder="Firstname"
            name="firstname"
            id="firstname"
          />
          <label htmlFor="firstname" />
        </div>
      </form>
    </div>
  );
};
