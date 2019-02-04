import React, { useState } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import  from './MusicPlayer';
import useStore from '@/hooks/useStore';
import MusicPlayer from './MusicPlayer';
import Songs from './Songs';

const BottomWrapper = styled.div`
  width: 100%;
  margin: auto;
  padding: 20px 0;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  background-color: rgba(34, 34, 34);

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

const Control = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

function nextSong(songs, currentSong) {
  let isLast = false;
  let next = null;

  songs.forEach((song, i) => {
    if (i === songs.length - 1) {
      isLast = true;
    }

    if (song.name === currentSong.name) {
      if (isLast) {
        [next] = songs;
      }
      next = songs[i + 1];
    }
  });

  return next;
}

export default function SongOverview({ match }) {
  const { id } = match.params;
  const { store } = useStore();
  const [currentSong, setCurrentSong] = useState(null);
  if (!id || !store || !store.albums) {
    return <Redirect to="/" />;
  }
  const album = store.albums.filter(al => al.name === id)[0];

  return (
    <Wrapper>
      <InfoWrapper>
        <h2>專輯</h2>
        <RectImage src={album.imageURL} />
        <Title>{album.name}</Title>
        <AuthorTitle>{album.author}</AuthorTitle>
      </InfoWrapper>

      <SongListWrapper>
        {album.songs && <Songs songs={album.songs} onPlayClick={setCurrentSong} />}
      </SongListWrapper>
      {currentSong && (
        <BottomWrapper>
          <h6>現正播放</h6>
          <h4>{currentSong.name.replace('.mp3', '')}</h4>
          <h5>{album.author}</h5>
          <Control>
            <MusicPlayer
              src={currentSong.url}
              onLoaded={player => player.play()}
              onEnded={() => setCurrentSong(nextSong(album.songs, currentSong))}
              onError={console.log}
            />
          </Control>
        </BottomWrapper>
      )}
    </Wrapper>
  );
}
