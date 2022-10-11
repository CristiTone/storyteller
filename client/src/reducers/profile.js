import { GET_LIBRARY, GET_PROFILE, ACCOUNT_DELETED } from '../actions/types';

const initialState = {
  library: [],
  profile: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LIBRARY:
      return {
        ...state,
        library: payload,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
      };
    case ACCOUNT_DELETED:
      return {
        ...state,
        library: [],
        profile: null,
      };
    default:
      return state;
  }
}
