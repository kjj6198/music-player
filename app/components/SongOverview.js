import React, { Fragment, useReducer } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import AudioProvider from './MusicPlayer/AudioProvider';
import useStore from '@/hooks/useStore';
import MusicPlayer from './MusicPlayer';
import Songs from './Songs';
import { mobileCSS } from '@/utils/media';
import SongProgress from './MusicPlayer/SongProgress';

const BottomWrapper = styled.div`
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 156px;
  margin: auto;
  padding: 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  background-color: rgba(34, 34, 34);
  display: flex;
  

  ${mobileCSS`
    font-size: 10px;
    padding: 10px;
  `}
`;

const SongInfo = styled.div`
  & > h4,
  & > h5,
  & > h6 {
    margin: 0;
    margin-bottom: 6px;
  }

  & > h4 {
    font-size: 14px;
  }

  & > h5,
  & > h6 {
    color: #4b4b4b;
  }
`;

const Wrapper = styled.div`
  width: 95%;
  max-width: 1180px;
  margin: 0 auto;
  color: #fff;
`;

const SongListWrapper = styled.div`
  max-height: calc(100vh - 250px - 150px);
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const RectImage = styled.div`
  width: 150px;
  padding-bottom: 150px;
  margin: 0 auto;

  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center center;
`;

const InfoWrapper = styled.div`
  width: 100%;
  margin-bottom: 25px;
  text-align: center;
  color: #fff;
`;

const Title = styled.h3`
  margin: 8px 0;
`;

const AuthorTitle = styled.h4`
  font-size: 14px;
  opacity: 0.7;
  margin: 6px 0;
`;

function nextSong(songs, currentSong, selectNext = true) {
  let isLast = false;
  let isFirst = false;
  let next = null;
  let prev = null;

  songs.forEach((song, i) => {
    if (i === 0) {
      isFirst = true;
    }
    if (i === songs.length - 1) {
      isLast = true;
    }

    if (song.name === currentSong.name) {
      if (isLast) {
        [next] = songs;
      } else {
        next = songs[i + 1];
      }

      if (isFirst) {
        [prev] = songs;
      }

      if (i - 1 >= 0) {
        prev = songs[i - 1];
      }
    }
  });

  return selectNext ? next : prev;
}

function reducer(state, action) {
  switch (action.type) {
    case 'SELECT_SONG':
      return {
        currentSong: action.song,
      };
    case 'SELECT_NEXT_SONG':
      return {
        currentSong: nextSong(action.songs, state.currentSong),
      };
    case 'SELECT_PREV_SONG':
      return {
        currentSong: nextSong(action.songs, state.currentSong, false),
      };
    default:
      return state;
  }
}

export default function SongOverview({ match }) {
  const { id } = match.params;
  const { store } = useStore();
  if (!id || !store || !store.albums) {
    return <Redirect to="/" />;
  }
  const album = store.albums.filter(al => al.name === id)[0];
  const [{ currentSong }, dispatch] = useReducer(reducer, { currentSong: album.songs[0] });

  return (
    <Wrapper>
      <InfoWrapper>
        <h2>專輯</h2>
        <RectImage src={album.imageURL} />
        <Title>{album.name}</Title>
        <AuthorTitle>{album.author}</AuthorTitle>
      </InfoWrapper>

      <SongListWrapper>
        {album.songs && (
          <Songs
            songs={album.songs}
            onPlayClick={song => dispatch({
              type: 'SELECT_SONG',
              song,
            })
            }
          />
        )}
      </SongListWrapper>
      <BottomWrapper>
        {currentSong && (
          <Fragment>
            <SongInfo>
              <h6>現正播放</h6>
              <h4>{currentSong.name.replace('.mp3', '')}</h4>
              <h5>{album.author}</h5>
            </SongInfo>
            <AudioProvider>
              <div style={{ flex: 1 }}>
                <MusicPlayer
                  src={currentSong.url}
                  onNextClick={() => dispatch({ type: 'SELECT_NEXT_SONG', songs: album.songs })}
                  onPrevClick={() => dispatch({ type: 'SELECT_PREV_SONG', songs: album.songs })}
                  onLoaded={player => player.play()}
                  onEnded={() => dispatch({ type: 'SELECT_NEXT_SONG', songs: album.songs })}
                  onError={console.log}
                />
              </div>
              <SongProgress />
            </AudioProvider>

          </Fragment>
        )}
      </BottomWrapper>
    </Wrapper>
  );
}
