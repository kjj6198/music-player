import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '@/components/SVGButton';
import Storage from '@/services/Storage';
import play from '@/assets/icons/play.svg';
import like from '@/assets/icons/like-stroke.svg';
import likeFill from '@/assets/icons/like-fill.svg';
import Duration from './MusicPlayer/Duration';

import SVG from './SVG';
import { mobileCSS } from '@/utils/media';

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

  ${mobileCSS`
    font-size: 12px;
  `}
`;

const PlayIcon = styled(SVG)`
  svg {
    width: 13px;
    height: 13px;
  }
`;

const LikeIcon = styled(SVG)`
  position: relative;
  margin-right: 8px;
  svg {
    width: 18px;
    height: 18px;
  }
`;

function handleLikeClick(song, setLiked) {
  const likes = Storage.get('likes') || {};
  if (likes[song.name]) {
    setLiked(false);
    likes[song.name] = false;
  } else {
    setLiked(true);
    likes[song.name] = true;
  }

  Storage.set('likes', likes);
}
// [NOTICE] just practice hooks usage
function Song({ song, onPlayClick }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const likes = Storage.get('likes') || {};
    if (likes[song.name]) {
      setLiked(true);
    }
  });

  return (
    <Wrapper>
      <div onClick={() => onPlayClick(song)}>
        <PlayIcon src={play} />
        <SongTitle>{song.name.replace('.mp3', '')}</SongTitle>
      </div>
      <div>
        <Button onClick={() => handleLikeClick(song, setLiked)}>
          <LikeIcon src={liked ? likeFill : like} />
        </Button>
        <Duration duration={song.duration} />
      </div>
    </Wrapper>
  );
}

export default function Songs({ songs, onPlayClick }) {
  return songs.map(song => <Song key={song.name} song={song} onPlayClick={onPlayClick} />);
}
