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
  padding: 10px 0;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(100, 100, 100, 0.23);
  }
`;

const SongTitle = styled.h4`
  display: inline-block;
  margin: 0;
  margin-left: 8px;
  font-size: 14px;
  font-weight: 400;
  vertical-align: middle;
`;

const PlayIcon = styled(SVG)`
  svg {
    width: 13px;
    height: 13px;
  }
`;

const LikeIcon = styled(SVG)`
  margin-right: 8px;
  svg {
    width: 18px;
    height: 18px;
  }
`;

export default function Songs({ songs, onPlayClick }) {
  return songs.map(song => (
    <Wrapper key={song.name} onClick={() => onPlayClick(song)}>
      <div>
        <PlayIcon src={play} />
        <SongTitle>{song.name.replace('.mp3', '')}</SongTitle>
      </div>
      <div>
        <LikeIcon src={like} />
        <Duration duration={song.duration} />
      </div>
    </Wrapper>
  ));
}
