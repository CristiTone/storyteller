import React from 'react';
import { connect } from 'react-redux';
import { useAsync } from 'react-async';
import { Grid, Typography, IconButton, TextField } from '@material-ui/core';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewListIcon from '@material-ui/icons/ViewList';
import PropTypes from 'prop-types';
import Player from '../../components/Player';
import { getLibrary } from '../../actions/profile';
import LoadingIndicator from '../../components/LoadingIndicator';

const YourLibrary = ({
  getLibrary,
  library,
  setStoryPlaying,
  isPlaying,
  playingStory,
}) => {
  const { isPending } = useAsync({
    promiseFn: getLibrary,
  });

  return (
    <>
      <Grid container justify='space-between' alignItems='center' spacing={4}>
        <Grid item>
          <Typography>Hear the stories you’ve liked:</Typography>
        </Grid>
        <Grid item>
          <Grid container alignItems='center'>
            <Grid item>
              <Typography style={{ padding: 12 }}>View</Typography>
            </Grid>
            <Grid item>
              <IconButton>
                <ViewModuleIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <ViewListIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <TextField label='Filter' variant='outlined' size='small' />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {isPending && <LoadingIndicator />}
      {!isPending && (
        <>
          <Grid container direction='column' spacing={2}>
            {library.map((story) => (
              <Grid item key={story._id}>
                <Player
                  story={story}
                  setStoryPlaying={setStoryPlaying}
                  isPlaying={isPlaying && story.playing_url === playingStory}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

YourLibrary.propTypes = {
  getLibrary: PropTypes.func,
  library: PropTypes.array,
  setStoryPlaying: PropTypes.func,
  isPlaying: PropTypes.bool,
  playingStory: PropTypes.string,
};

const mapStateToProps = (state) => {
  const { likedstories } = state.profile.library;

  if (!likedstories) return {};

  const { stories } = state.gallery;
  const library = stories.filter((story) =>
    likedstories.find((liked) => story._id === liked.story)
  );

  return { library };
};

export default connect(mapStateToProps, { getLibrary })(YourLibrary);
