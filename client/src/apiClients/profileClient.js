import client from './client';

function getLibrary() {
  return client('profile/library');
}

function getProfile() {
  return client('profile');
}

function deleteProfile() {
  return client('profile', { method: 'DELETE' });
}

export { getLibrary, getProfile, deleteProfile };
