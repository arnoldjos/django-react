import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import Layout from './components/Layout/Layout';
import { setCurrentUser, logoutUser } from './store/actions';
import setAuthToken from './utils/setAuthToken';
import configureStore from './store';

const store = configureStore();
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout User
    store.dispatch(logoutUser());
    // Clear current Profile
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
  }
}

export default App;
