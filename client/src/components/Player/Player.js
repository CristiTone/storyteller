import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Button,
  Grid,
  Divider,
} from '@material-ui/core';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';
import PauseIcon from '@material-ui/icons/PauseCircleFilled';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { addLike, removeLike } from '../../actions/gallery';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 250,
    height: 200,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 45,
    width: 45,
  },
  divider: {
    margin: theme.spacing(2),
  },
  // TODO: move this to theme.js
  storyLink: {
    color: '#000',
    textDecoration: 'none'
  }
}));

const Player = ({
  story: { _id, author, name, image_url, playing_url, likes, genre },
  setStoryPlaying,
  isPlaying,
  userId,
  addLike,
  removeLike,
}) => {
  const classes = useStyles();
  let storyLiked = likes.some((like) => like.user === userId);

  const toggleLike = () => {
    if (!storyLiked) {
      addLike(_id);
    } else {
      removeLike(_id);
    }
  };

  return (
    <>
      <Card className={classes.root}>
        <CardMedia className={classes.cover} image={image_url} />
        <Grid container alignItems='center' justify='flex-start'>
          <Grid item xs={3}>
            <CardContent className={classes.content}>
              <Typography component='h5' variant='h5'>
                <Link className={classes.storyLink} to={`/story/${name}`}>{name}</Link>
              </Typography>
              <Typography variant='subtitle1' color='textSecondary'>
                {author}
              </Typography>
              <Typography variant='subtitle2' color='textSecondary'>
                Genre: {genre}
              </Typography>
            </CardContent>
            <div className={classes.controls}>
              <Button
                onClick={toggleLike}
                variant='outlined'
                color='primary'
                endIcon={storyLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              >
                {likes.length}
              </Button>
              <IconButton
                color='primary'
                onClick={() => setStoryPlaying(playing_url)}
              >
                {isPlaying ? (
                  <PauseIcon className={classes.playIcon} />
                ) : (
                  <PlayIcon className={classes.playIcon} />
                )}
              </IconButton>
            </div>
          </Grid>
          <Divider
            orientation='vertical'
            flexItem
            className={classes.divider}
          />
          <Grid item xs={8}>
            <Typography variant='caption' align='center'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              sagittis tempor eros, et consequat urna placerat sit amet. Nullam
              maximus, eros et varius vehicula, turpis nunc porttitor quam, et
              luctus dolor ante a diam. Curabitur interdum sit amet arcu sit
              amet congue. Etiam quam dui, mattis sit amet mi quis, interdum
              lobortis tortor. Duis ultrices lacus iaculis placerat imperdiet.
              Aliquam erat volutpat. Nulla scelerisque ligula justo, posuere
              posuere urna gravida quis. Quisque malesuada dapibus tortor, ut
              pharetra ex suscipit et. Ut ante nunc, convallis eget vestibulum
              sit amet, bibendum vitae velit.
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

Player.propTypes = {
  story: PropTypes.object.isRequired,
  setStoryPlaying: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const user = state.auth.user;
  if (user) return { userId: user._id };
  return {};
};

export default connect(mapStateToProps, { addLike, removeLike })(Player);
