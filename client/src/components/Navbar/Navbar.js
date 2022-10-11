import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AppBar, Toolbar, Typography, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { getProfile } from '../../actions/profile';
import logo from './book.png';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    paddingLeft: theme.spacing(2),
  },
  navigation: {
    color: 'inherit',
    textDecoration: 'none',
  },
  logo: {
    height: 40,
    width: 40,
  },
}));

const Navbar = ({ history, auth: { isAuthenticated }, getProfile, logout }) => {
  const classes = useStyles();

  useEffect(() => {
    if (isAuthenticated) getProfile();
  }, [getProfile, isAuthenticated]);

  return (
    <AppBar position='sticky'>
      <Toolbar>
        <Grid container justify='space-between' alignItems='center'>
          <Grid item>
            <Button
              variant='text'
              color='inherit'
              className={classes.menuButton}
              onClick={() => history.push('/')}
            >
              <img src={logo} alt='' className={classes.logo} />
              <Typography variant='h6' className={classes.title}>
                Storyteller
              </Typography>
            </Button>
          </Grid>
          {isAuthenticated && (
            <Grid item>
              <Button
                variant='text'
                color='inherit'
                className={classes.menuButton}
                onClick={() => history.push('/gallery')}
              >
                Gallery
              </Button>
              <Button
                variant='text'
                color='inherit'
                className={classes.menuButton}
                onClick={() => history.push('/profile')}
              >
                Profile
              </Button>
              <Button
                variant='outlined'
                color='inherit'
                className={classes.menuButton}
                onClick={logout}
              >
                Logout
              </Button>
            </Grid>
          )}
          {!isAuthenticated && (
            <Grid item>
              <Button
                variant='outlined'
                color='inherit'
                className={classes.menuButton}
                onClick={() => history.push('/sign-in')}
              >
                Sign in
              </Button>
              <Button
                variant='contained'
                color='secondary'
                className={classes.menuButton}
                onClick={() => history.push('/sign-up')}
              >
                Create account
              </Button>
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default withRouter(
  connect(mapStateToProps, { logout, getProfile })(Navbar)
);
