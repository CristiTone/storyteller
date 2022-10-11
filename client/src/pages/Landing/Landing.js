import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Button, Box } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import Preview from '../../components/Preview';

// const useStyles = makeStyles(theme => ({}));

const Landing = ({ history }) => {
  // const classes = useStyles();

  return (
    <Grid container direction='column' wrap='nowrap'>
      <Grid item className='landing'>
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
          style={{ height: '100%' }}
          spacing={2}
        >
          <Grid item>
            <Typography color='primary' variant='h6'>
              Connect on Storyteller
            </Typography>
          </Grid>
          <Grid item>
            <Typography color='primary'>
              Discover old and new stories that you can listen to anywhere,
              anytime
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => history.push('/sign-up')}
            >
              Sign up for free
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Box mt={4}>
          <Typography variant='h6' align='center' gutterBottom>
            Hear what’s trending for free in the Storyteller community
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Box mx={4} mb={6}>
          <Preview />
        </Box>
      </Grid>
    </Grid>
  );
};

Landing.propTypes = {
  history: PropTypes.object.isRequired
};

export default Landing;
