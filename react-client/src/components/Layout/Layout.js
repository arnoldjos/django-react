import React from 'react';
import { Switch, Route } from 'react-router-dom';
import universal from 'react-universal-component';

import Navbar from '../Navigation/Navbar/Navbar';
import Footer from '../Navigation/Footer/Footer';
import Auxil from '../../hoc/Auxil';
import routes from '../../pages/Routes';
import NotFound from '../../pages/NotFound';
import Loading from '../UI/Loading/Loading';
import PrivateRoute from '../../hoc/PrivateRoute';
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
          {/* {routes.map(route => {
            let r = (
              <Route {...route} key={route.path}>
                <UniversalComponent page={route.page} />
              </Route>
            );
            !route.public
              ? (r = (
                  <PrivateRoute
                    path={route.path}
                    exact={route.exact}
                    component={<UniversalComponent page={route.page} />}
                  />
                ))
              : null;
            return r;
          })} */}
          <NotFound />
        </Switch>
      </div>
      <Footer />
    </Auxil>
  );
};
