import * as galleryClient from '../apiClients/galleryClient';
import { GET_STORIES, UPDATE_LIKES, STORY_ERROR } from './types';
import { setAlert } from './alert';

// Get posts
export const getStories = () => async (dispatch) => {
  try {
    const res = await galleryClient.getStories();

    dispatch({
      type: GET_STORIES,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: STORY_ERROR,
      payload: { msg: err.statusText, status: err.response.status },
    });
  }
};

// Add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await galleryClient.likeStory(id);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res },
    });
    dispatch(setAlert('Added to Your Library', 'success'));
  } catch (err) {
    dispatch({
      type: STORY_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

// Remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await galleryClient.unlikeStory(id);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res },
    });
    dispatch(setAlert('Removed from Your Library', 'success'));
  } catch (err) {
    dispatch({
      type: STORY_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};
