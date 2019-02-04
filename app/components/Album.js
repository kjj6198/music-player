import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled(Link).attrs(props => ({
  title: props.title,
  to: `/albums/${props.name}`,
}))`
  text-decoration: none;
  position: relative;
  color: #fff;
  border-radius: 4px;
  transition: all 0.3s ease;
  opacity: 0.8;
  cursor: pointer;
  &:hover {
    transform: translateY(-2px);
    opacity: 1;
  }
`;

const RectImage = styled.div`
  width: ${props => props.size || 200}px;
  padding-bottom: ${props => props.size || 200}px;
  background-image: url(${props => props.imageURL});
  background-size: cover;
  background-repeat: no-repeat;
`;

const Title = styled.h4`
  margin-top: 6px;
  margin-bottom: 4px;
  max-width: ${props => props.size}px;
  text-overflow: ellipsis;
  word-break: break-word;
  font-weight: 700;
`;

const Author = styled.span`
  color: #d5d5d5;
  opacity: 0.75;
  font-size: 14px;
`;

const Album = ({ name, imageURL, author }) => (
  <Wrapper name={name}>
    <RectImage imageURL={imageURL} size={200} />
    <Title>{name}</Title>
    <Author>{author}</Author>
  </Wrapper>
);

export default Album;
