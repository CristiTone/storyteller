import client from './client';
let cache = null;

function getStories() {
  if (cache) return Promise.resolve(cache);

  const result = client('gallery');
  result.then((stories) => (cache = stories));

  return result;
}

function likeStory(storyId) {
  return client(`gallery/like/${storyId}`, { method: 'PUT' });
}

function unlikeStory(storyId) {
  return client(`gallery/unlike/${storyId}`, { method: 'PUT' });
}

export { getStories, likeStory, unlikeStory };
