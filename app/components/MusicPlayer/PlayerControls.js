import React, {
  memo, Fragment, useEffect, useContext,
} from 'react';
import styled from 'styled-components';
import play from '@/assets/icons/play-circle.svg';
import pause from '@/assets/icons/pause.svg';
import next from '@/assets/icons/next.svg';
import prev from '@/assets/icons/prev.svg';
import { playerContext } from './AudioProvider';
import SVG from '../SVG';
import useShortcut from '@/hooks/useShortcut';


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

  useShortcut({
    32: onClick,
    78: onNextClick,
    80: onPrevClick,
    37: () => audio.currentTime -= 10,
    39: () => audio.currentTime += 10,
  });

  return (
    <Fragment>
      <Button
        onClick={onPrevClick}
        title="上一首"
      >
        <SVG src={prev} />
      </Button>
      <Button
        onClick={onClick}
        title={isPaused ? '播放' : '暫停'}
      >
        <SVG src={isPaused ? play : pause} />
      </Button>
      <Button onClick={onNextClick} title="下一首">
        <SVG src={next} />
      </Button>
    </Fragment>
  );
}

export default memo(PlayerControl);
