import React, { useEffect } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import theme from './theme';
import Routes from './routes';
import store from './store';
import Landing from './pages/Landing/Landing';
import Navbar from './components/Navbar';
import ProgressBar from './components/ProgressBar/ProgressBar';
import { loadUser } from './actions/auth';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <>
            <Navbar />
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route component={Routes} />
            </Switch>
            <ProgressBar />
          </>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
