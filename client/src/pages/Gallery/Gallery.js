import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useAsync } from 'react-async';
import { Grid, Box, Tabs, Tab } from '@material-ui/core';
import { getStories } from '../../actions/gallery';
import { togglePlay, setStory } from '../../actions/playing';
import Player from '../../components/Player';
import LoadingIndicator from '../../components/LoadingIndicator';
import Search from './Search';
import YourLibrary from './YourLibrary';

const Gallery = ({
  gallery: { stories },
  playing: { playingStory, isPlaying },
  togglePlay,
  setStory,
  getStories,
  history,
}) => {
  const { isPending } = useAsync({
    promiseFn: getStories,
  });

  const [tab, setTab] = useState(history.location.pathname);

  const setStoryPlaying = (url) => {
    if (url !== playingStory) {
      setStory(url);
      togglePlay(true);
    } else togglePlay(!isPlaying);
  };

  const handleChange = (e, newTab) => {
    setTab(newTab);
    history.push(newTab);
  };

  console.log(stories);
  return (
    <Box mt={2} mx={2}>
      <Grid container spacing={4}>
        <Grid item xs={2}>
          <Tabs
            value={tab}
            onChange={handleChange}
            orientation='vertical'
            style={{ position: 'sticky', top: 80 }}
          >
            <Tab value='/gallery' label='Gallery' />
            <Tab value='/search' label='Search' />
            <Tab value='/your-library' label='Your Library' />
          </Tabs>
        </Grid>
        <Grid item xs={10}>
          {isPending && <LoadingIndicator />}
          {!isPending && (
            <>
              {tab === '/gallery' && (
                <Grid container direction='column' spacing={2}>
                  {stories.map((story) => (
                    <Grid item key={story._id}>
                      <Player
                        story={story}
                        setStoryPlaying={setStoryPlaying}
                        isPlaying={
                          isPlaying && story.playing_url === playingStory
                        }
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
              {tab === '/search' && <Search />}
              {tab === '/your-library' && (
                <YourLibrary
                  setStoryPlaying={setStoryPlaying}
                  isPlaying={isPlaying}
                  playingStory={playingStory}
                />
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

Gallery.propTypes = {
  getStories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  gallery: state.gallery,
  playing: state.playing,
});

export default connect(mapStateToProps, { getStories, togglePlay, setStory })(
  Gallery
);
