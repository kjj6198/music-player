import React from 'react';
import styled from 'styled-components';
import Lazy from '@/components/LazyComponent';
import { Wrapper as AlbumWrapper } from '@/components/Album';
import logo from '@/assets/images/logo.png';

const Wrapper = styled.div`
  display: block;
  width: 75%;
  max-width: 1280px;
  margin: 0 auto;
`;

const Logo = styled.img.attrs(props => ({ src: props.src }))`
  height: 25px;
`;

const Header = styled.div`
  padding: 32px;
  display: block;
  text-align: center;
  font-size: 32px;
`;

const Headline = styled.h2`
  font-size: 24px;
  text-align: left;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(151, 151, 151, 0.3);
  color: #fff;
`;

const AlbumsContainer = styled.div`
  display: flex;
  justify-content: flex-start;

  ${AlbumWrapper} {
    margin-right: 14px;
  }
`;

const LazyAlbumProvider = Lazy({
  loader: () => import(/* webpackChunkName: "Album" */ '../containers/AlbumProvider'),
});

export default function HomePage() {
  return (
    <Wrapper>
      <Header>
        <Logo src={logo} />
      </Header>
      <Headline>熱門專輯</Headline>
      <AlbumsContainer>
        <LazyAlbumProvider />
      </AlbumsContainer>
    </Wrapper>
  );
}
