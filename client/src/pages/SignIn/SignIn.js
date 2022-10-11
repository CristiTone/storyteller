import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
} from '@material-ui/core';

const SignIn = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  if (isAuthenticated) {
    return <Redirect to='/gallery' />;
  }

  return (
    <Container maxWidth='sm'>
      <Box mt={4} mb={4}>
        <Typography variant='h6' align='center'>
          Sign In
        </Typography>
      </Box>
      <Box mt={4} mb={4}>
        <Typography variant='subtitle1' align='center'>
          Sign Into Your Account
        </Typography>
      </Box>
      <form onSubmit={(e) => onSubmit(e)}>
        <Grid container spacing={2} alignItems='center' justify='center'>
          <Grid item xs={12} sm={3}>
            <Typography>Email</Typography>
          </Grid>

          <Grid item xs={12} sm={9}>
            <TextField
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <Typography>Password</Typography>
          </Grid>

          <Grid item xs={12} sm={9}>
            <TextField
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={(e) => onChange(e)}
              required
            />
          </Grid>
        </Grid>
        <Box mt={4} mb={4}>
          <Grid container alignItems='center' direction='column' spacing={2}>
            <Grid item xs={12}>
              <Button variant='contained' color='secondary' type='submit'>
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                Don't have an account? <Link to='/sign-up'>Sign Up</Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Container>
  );
};

SignIn.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(SignIn);
