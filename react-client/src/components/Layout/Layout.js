import React from 'react';
import { Switch, Route } from 'react-router-dom';
import universal from 'react-universal-component';

import Navbar from '../Navigation/Navbar/Navbar';
import Footer from '../Navigation/Footer/Footer';
import Auxil from '../../hoc/Auxil';
import routes from '../../pages/Routes';
import Loading from '../UI/Loading/Loading';

import './Layout.scss';

const UniversalComponent = universal(
  props => import(`../../pages/${props.page}`),
  {
    loading: Loading,
    minDelay: 500
  }
);

export default () => {
  return (
    <Auxil>
      <Navbar />
      <div className="content">
        <Switch>
          {routes.map(route => (
            <Route {...route} key={route.path}>
              <UniversalComponent page={route.page} />
            </Route>
          ))}
        </Switch>
      </div>
      <Footer />
    </Auxil>
  );
};
