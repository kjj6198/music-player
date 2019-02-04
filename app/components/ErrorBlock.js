import React from 'react';
import styled from 'styled-components';
import useSelector from '@/hooks/useSelector';

const Block = styled.div`
  display: inline-block;
  padding: 8px 16px;
  position: fixed;
  left: 20px;
  top: 20px;
  color: #fff;
  background-color: rgba(125, 125, 125, 0.8);
  border-radius: 16px;
`;

export default function ErrorBlock() {
  const error = useSelector(store => store.error);

  if (error) {
    return <Block>{error.message}</Block>;
  }

  return null;
}
