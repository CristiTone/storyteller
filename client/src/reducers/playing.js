import { TOGGLE_PLAY, SET_PLAYING_STORY } from '../actions/types';

const initialState = {
  isPlaying: false,
  playingStory: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_PLAY:
      return {
        ...state,
        isPlaying: payload,
      };
    case SET_PLAYING_STORY:
      return {
        ...state,
        playingStory: payload,
      };
    default:
      return state;
  }
}
