import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Container,
  Grid,
  Avatar,
  Button,
  Divider,
  Typography,
  TextField,
  Box,
  Collapse,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import { deleteProfile } from '../../actions/profile';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  input: {
    display: 'none',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const Profile = ({ name, email, avatar, deleteProfile }) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Container maxWidth='sm'>
      <Grid
        container
        alignItems='center'
        justify='center'
        direction='column'
        spacing={4}
      >
        <Grid item>
          <Box mt={8} mb={2}>
            <Avatar alt={name} src={avatar} className={classes.avatar} />
            <div className={classes.avatarButton}>
              <input
                accept='image/*'
                className={classes.input}
                id='contained-button-file'
                multiple
                type='file'
              />
              <label htmlFor='contained-button-file'>
                <Button color='primary' component='span'>
                  Change your avatar
                </Button>
              </label>
            </div>
          </Box>
          <Divider />
        </Grid>
        <Grid item>
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
                disabled
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
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container justify='space-between'>
                <Grid item>
                  <Button
                    variant='outlined'
                    color='secondary'
                    onClick={deleteProfile}
                  >
                    Delete account
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    color='primary'
                    variant='contained'
                    onClick={handleExpandClick}
                    endIcon={
                      <ExpandMoreIcon
                        className={clsx(classes.expand, {
                          [classes.expandOpen]: expanded,
                        })}
                      />
                    }
                  >
                    Change your password
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Collapse in={expanded}>
                <form onSubmit={(e) => console.log('password updated')}>
                  <Grid
                    container
                    alignItems='center'
                    justify='center'
                    spacing={2}
                  >
                    <Grid item xs={12} sm={3}>
                      <Typography>New Password</Typography>
                    </Grid>

                    <Grid item xs={12} sm={9}>
                      <TextField
                        type='password'
                        placeholder='Password'
                        name='password'
                        // value={password}
                        // onChange={(e) => onChange(e)}
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
                        // value={password2}
                        // onChange={(e) => onChange(e)}
                        required
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant='contained'
                        color='secondary'
                        type='submit'
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Collapse>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

Profile.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  avatar: PropTypes.string,
  deleteProfile: PropTypes.func,
};

const mapStateToProps = (state) => {
  const { name, email } = state.auth.user;
  const { avatar } = state.profile.profile;
  return { name, email, avatar };
};

export default connect(mapStateToProps, { deleteProfile })(Profile);
