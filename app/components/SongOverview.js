import React, { useState } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import useStore from '@/hooks/useStore';
import MusicPlayer from './MusicPlayer';
import Songs from './Songs';

const Wrapper = styled.div`
  width: 95%;
  max-width: 1180px;
  margin: 0 auto;
`;

const SongListWrapper = styled.div`
  max-height: calc(70vh - 100px);
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const RectImage = styled.div`
  width: 200px;
  padding-bottom: 200px;
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
        <MusicPlayer
          src={currentSong.url}
          onLoaded={player => player.play()}
          onEnded={() => setCurrentSong(nextSong(album.songs, currentSong))}
          onError={console.log}
        />
      )}
    </Wrapper>
  );
}
