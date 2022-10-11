import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import gallery from './gallery';
import playing from './playing';

export default combineReducers({
  alert,
  auth,
  profile,
  gallery,
  playing,
});
