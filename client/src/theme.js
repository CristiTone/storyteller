import { createMuiTheme } from '@material-ui/core';

/*
background page: #B9BAC8
page: #FFF9E9
primary: #141DD6
secondary: #797DCA

 // [theme.breakpoints.down('xs')]: {
    //   width: '100% !important', // Overrides inline-style
    //   height: 100
    // },
*/

const theme = createMuiTheme({
  palette: {},
  props: {
    MuiTextField: {
      variant: 'outlined',
      fullWidth: true
    }
  },
  overrides: {}
});

export default theme;
