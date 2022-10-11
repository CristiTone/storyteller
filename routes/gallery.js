const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Story = require('../models/Story');
const Profile = require('../models/Profile');

// @route    GET api/gallery
// @desc     Get all stories
// @access   Public
router.get('/', async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/gallery/like/:id
// @desc     Like a story
// @access   Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    const profile = await Profile.findOne({ user: req.user.id });

    // Check if the story has already been liked
    if (
      story.likes.filter(like => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Story already liked' });
    }

    story.likes.unshift({ user: req.user.id });
    profile.likedstories.unshift({ story: req.params.id });

    await story.save();
    profile.save(); //maybe await

    res.json(story.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/gallery/unlike/:id
// @desc     Unlike a story
// @access   Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    const profile = await Profile.findOne({ user: req.user.id });

    // Check if the story has already been liked
    if (
      story.likes.filter(like => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Story has not yet been liked' });
    }

    // Get remove index
    const removeLikeIndex = story.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    const removeStoryIndex = profile.likedstories
      .map(like => like.story.toString())
      .indexOf(req.params.id);

    story.likes.splice(removeLikeIndex, 1);
    profile.likedstories.splice(removeStoryIndex, 1);

    await story.save();
    profile.save(); //maybe await

    res.json(story.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
