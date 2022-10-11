import { GET_STORIES, UPDATE_LIKES } from '../actions/types';

const initialState = {
  stories: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_STORIES:
      return {
        ...state,
        stories: payload,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        stories: state.stories.map((story) =>
          story._id === payload.id ? { ...story, likes: payload.likes } : story
        ),
      };
    default:
      return state;
  }
}
