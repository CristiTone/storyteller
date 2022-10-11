import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ButtonBase, Typography, Grid } from '@material-ui/core';
import PlayIcon from '@material-ui/icons/PlayCircleOutline';
import PauseIcon from '@material-ui/icons/PauseCircleOutline';
import { connect } from 'react-redux';
import { togglePlay, setStory } from '../../actions/playing';

const stories = [
  {
    name: 'The Call of Cthulhu',
    image_url:
      'data:image/jpeg;base64,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',
    playing_url:
      'https://firebasestorage.googleapis.com/v0/b/storyteller2-90000.appspot.com/o/H.%20P.%20%20Lovecraft%20(Motion%20Comic)%20The%20Call%20Of%20Cthulhu.mp3?alt=media&token=5c550c1a-6111-4a85-8033-301f17f90713'
  },
  {
    name: 'The Raven',
    image_url:
      'https://image.dhgate.com/0x0/f2/albu/g5/M00/C2/67/rBVaJFirpLeAME5KAAHnhvY4pe4583.jpg',
    playing_url:
      'https://firebasestorage.googleapis.com/v0/b/storyteller2-90000.appspot.com/o/The%20Raven%20(Christopher%20Lee).mp3?alt=media&token=35e7f88f-b449-4aca-a1f6-4249b2e8abb2'
  },
  {
    name: 'The Leshen',
    image_url:
      'https://vignette.wikia.nocookie.net/witcher/images/9/92/Tw3_early_Leshen.jpg/revision/latest/top-crop/width/320/height/320?cb=20160511132405',
    playing_url:
      'https://firebasestorage.googleapis.com/v0/b/storyteller2-90000.appspot.com/o/Witcher%20Stories%20-%20The%20Leshen.mp3?alt=media&token=3c31c974-e9a8-4f0d-b477-a5b1bdbfa9fb'
  },
  {
    name: 'Nyralathotep',
    image_url:
      'https://vignette.wikia.nocookie.net/lovecraft/images/e/e4/Nyarlathotep_by_erkanerturk-d4h5bgg.jpg/revision/latest/top-crop/width/240/height/240?cb=20151003113912',
    playing_url:
      'https://firebasestorage.googleapis.com/v0/b/storyteller2-90000.appspot.com/o/Lovecraft%20Stories%20-%20Nyarlathotep.mp3?alt=media&token=504b6a18-7ad7-47ad-8817-3bab96d2cb47'
  },
  {
    name: 'Dream Land',
    image_url:
      'http://images.dpchallenge.com/images_dpcprints/25000-29999/27133/500/981573.jpg',
    playing_url:
      'https://firebasestorage.googleapis.com/v0/b/storyteller2-90000.appspot.com/o/Dreamland%20-%20Edgar%20Allan%20Poe.mp3?alt=media&token=c5ffeca5-5eaa-47fb-8f5a-8b59c98e32b1'
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 300,
    width: '100%'
  },
  image: {
    position: 'relative',
    height: 200,
    width: 200,

    '&:hover': {
      zIndex: 1,
      '& $playIcon': {
        visibility: 'visible'
      }
    }
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%'
  },
  playIcon: {
    height: 100,
    width: 100,
    color: '#3F51B5',
    visibility: 'hidden',
    position: 'relative'
  },
  pauseIcon: {
    height: 100,
    width: 100,
    color: '#3F51B5',
    position: 'relative'
  }
}));

const Preview = ({
  playing: { playingStory, isPlaying },
  togglePlay,
  setStory
}) => {
  const classes = useStyles();

  const setStoryPlaying = url => {
    if (url !== playingStory) {
      setStory(url);
      togglePlay(true);
    } else togglePlay(!isPlaying);
  };

  return (
    <Grid container spacing={2} className={classes.root} justify='space-around'>
      {stories.map(story => (
        <Grid item key={story.playing_url}>
          <ButtonBase
            focusRipple
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            onClick={() => setStoryPlaying(story.playing_url)}
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${story.image_url})`
              }}
            />
            {isPlaying && story.playing_url === playingStory ? (
              <PauseIcon className={classes.pauseIcon} />
            ) : (
              <PlayIcon className={classes.playIcon} />
            )}
          </ButtonBase>
          <Typography align='center'>{story.name}</Typography>
        </Grid>
      ))}
    </Grid>
  );
};

const mapStateToProps = state => ({
  playing: state.playing
});

export default connect(mapStateToProps, { togglePlay, setStory })(Preview);
