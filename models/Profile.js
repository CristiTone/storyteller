const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likedstories: [
    {
      story: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stories'
      }
    }
  ]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
