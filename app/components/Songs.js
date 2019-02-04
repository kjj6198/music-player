import React from 'react';
import styled from 'styled-components';
import Duration from './MusicPlayer/Duration';
import SVG from './SVG';
import play from '@/assets/icons/play.svg';
import like from '@/assets/icons/like-stroke.svg';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  overflow-y: auto;
  salign-items: center;
  color: #fff;

  &:not(:last-child) {
    margin-bottom: 16px;
    border-bottom: 1px solid rgba(100, 100, 100, 0.23);
  }
`;

const SongTitle = styled.h4`
  display: inline-block;
  margin: 8px 0;
  margin-left: 8px;
  font-size: 16px;
  font-weight: 400;
`;

export default function Songs({ songs, onPlayClick }) {
  return songs.map(song => (
    <Wrapper key={song.name} onClick={() => onPlayClick(song)}>
      <div>
        <SVG src={play} />
        <SongTitle>{song.name.replace('.mp3', '')}</SongTitle>
      </div>
      <div>
        <SVG src={like} />
        <Duration duration={song.duration} />
      </div>
    </Wrapper>
  ));
}
