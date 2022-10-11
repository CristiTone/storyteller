import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import PrivateRoute from './PrivateRoute';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Gallery from '../pages/Gallery';
import Profile from '../pages/Profile';
import Alert from '../components/Alert';
import Story from '../pages/Story/Story';

const Routes = () => {
  return (
    <>
      <DocumentTitle title='Storyteller' />
      <Alert />
      <Switch>
        <Route path='/sign-up' component={SignUp} />
        <Route path='/sign-in' component={SignIn} />
        <PrivateRoute
          exact
          title='Gallery'
          path='/gallery'
          component={Gallery}
        />
        <PrivateRoute exact title='Search' path='/search' component={Gallery} />
        <PrivateRoute
          exact
          title='Your Library'
          path='/your-library'
          component={Gallery}
        />
        <PrivateRoute
          exact
          title='Profile'
          path='/profile'
          component={Profile}
        />
        <PrivateRoute
          exact
          title='Profile'
          path='/story/:name'
          component={Story}
        />
      </Switch>
    </>
  );
};

export default Routes;
