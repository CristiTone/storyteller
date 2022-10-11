import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Alert = ({ alert }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(true);
  }, [alert]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  if (!alert) return null;

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert
          elevation={6}
          variant='filled'
          onClose={handleClose}
          severity={alert.alertType}
        >
          {alert.msg}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};
Alert.propTypes = {
  alert: PropTypes.object,
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateToProps)(Alert);
