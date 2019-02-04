import React, { useState } from 'react';
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
  appearance: none;
  background-color: transparent;
  outline: none;
  border: 0;
`;

export default function PlayerControl({ isPaused, onClick }) {
  return (
    <Button onClick={onClick}>
      <SVG src={isPaused ? play : pause} />
    </Button>
  );
}
