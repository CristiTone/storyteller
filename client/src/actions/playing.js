import { TOGGLE_PLAY, SET_PLAYING_STORY } from './types';

export const togglePlay = play => dispatch => {
  dispatch({
    type: TOGGLE_PLAY,
    payload: play
  });
};

export const setStory = url => dispatch => {
  // TODO: maybe check if old url equals the new one
  dispatch({
    type: SET_PLAYING_STORY,
    payload: url
  });
};
