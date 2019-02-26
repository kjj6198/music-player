import React, { memo, Fragment, useEffect, useContext } from 'react';
import styled from 'styled-components';
import play from '@/assets/icons/play-circle.svg';
import pause from '@/assets/icons/pause.svg';
import next from '@/assets/icons/next.svg';
import prev from '@/assets/icons/prev.svg';
import { playerContext } from './AudioProvider';
import SVG from '../SVG';


const Button = styled.button`
  width: 40px;
  height: 40px;
  appearance: none;
  background-color: transparent;
  outline: none;
  border: 0;
  cursor: pointer;
  padding: 0;
  transition: transform .1s linear;
  transform-origin: center center;

  &:active {
    opacity: .5;
    transform: scale(0.95);
  }
`;

function PlayerControl({
  isPaused,
  onClick,
  onNextClick,
  onPrevClick,
}) {
  const { audio } = useContext(playerContext);

  useEffect(() => {
    function handleKeyPress(e) {
      switch (e.keyCode) {
        case 32:
          onClick();
          break;
        case 78:
          onNextClick();
          break;
        case 80:
          onPrevClick();
          break;
        case 37:
          audio.currentTime -= 10;
          break;
        case 39:
          audio.currentTime += 10;
          break;
        default:
          break;
      }
    }

    document.addEventListener('keydown', handleKeyPress);

    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [audio, onPrevClick, onNextClick]);

  return (
    <Fragment>
      <Button onClick={onPrevClick}>
        <SVG src={prev} />
      </Button>
      <Button onClick={onClick}>
        <SVG src={isPaused ? play : pause} />
      </Button>
      <Button onClick={onNextClick}>
        <SVG src={next} />
      </Button>
    </Fragment>
  );
}

export default memo(PlayerControl);
