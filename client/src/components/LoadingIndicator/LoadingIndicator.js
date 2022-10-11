import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
}));

const LoadingIndicator = (props) => {
  const classes = useStyles();
  return (
    <div>
      <CircularProgress className={classes.loading} />
    </div>
  );
};

export default LoadingIndicator;
