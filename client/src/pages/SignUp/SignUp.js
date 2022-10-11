import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import {
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Container,
} from '@material-ui/core';

const Signup = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/gallery' />;
  }

  return (
    <Container maxWidth='sm'>
      <Box mt={4} mb={4}>
        <Typography variant='h6' align='center'>
          Sign Up
        </Typography>
      </Box>
      <Box mt={4} mb={4}>
        <Typography variant='subtitle1' align='center'>
          Create Your Account
        </Typography>
      </Box>

      <form onSubmit={(e) => onSubmit(e)}>
        <Grid container spacing={2} alignItems='center' justify='center'>
          <Grid item xs={12} sm={3}>
            <Typography>Name</Typography>
          </Grid>

          <Grid item xs={12} sm={9}>
            <TextField
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
          </Grid>

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

          <Grid item xs={12} sm={3}>
            <Typography>Confirm Password</Typography>
          </Grid>

          <Grid item xs={12} sm={9}>
            <TextField
              type='password'
              placeholder='Confirm Password'
              name='password2'
              value={password2}
              onChange={(e) => onChange(e)}
              required
            />
          </Grid>
        </Grid>
        <Box mt={4} mb={4}>
          <Grid container alignItems='center' direction='column' spacing={2}>
            <Grid item xs={12}>
              <Button variant='contained' color='secondary' type='submit'>
                Register
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                Already have an account? <Link to='/sign-in'>Sign In</Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Container>
  );
};

Signup.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Signup);
