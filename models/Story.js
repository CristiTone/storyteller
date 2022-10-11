const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  author: {
    type: String
  },
  name: {
    type: String
  },
  image_url: {
    type: String
  },
  playing_url: {
    type: String
  },
  genre: {
    type: String
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ]
});

module.exports = Story = mongoose.model('story', StorySchema);
