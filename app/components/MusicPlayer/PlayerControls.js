import React, { Fragment } from 'react';
import styled from 'styled-components';
import SVG from '../SVG';
import play from '@/assets/icons/play-circle.svg';
import pause from '@/assets/icons/pause.svg';
import next from '@/assets/icons/next.svg';
import prev from '@/assets/icons/prev.svg';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

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

export default function PlayerControl({
  isPaused,
  onClick,
  onNextClick,
  onPrevClick,
}) {
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
