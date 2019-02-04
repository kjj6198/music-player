import React from 'react';
import styled from 'styled-components';
import useStore from '@/hooks/useStore';
import Album from '@/components/Album';
import Placeholder from '@/components/Placeholder';
import useAlbumAPI from '@/hooks/useAlbumAPI';

const PlaceWrapper = styled.div`
  ${Placeholder} {
    &:not(:first-child) {
      margin-top: 8px;
    }
  }
`;

const AlbumPlaceholder = () => (
  <PlaceWrapper>
    <Placeholder size={200} width={200} height={200} bgColor="#ddd" />
    <Placeholder size={200} height={20} bgColor="#ddd" />
    <Placeholder size={50} width={80} height={20} bgColor="#ddd" />
  </PlaceWrapper>
);

export default function AlbumProvider({ id }) {
  const { store } = useStore();
  useAlbumAPI(id);

  if (store.albums) {
    return store.albums.map(({ author, name, imageURL }) => (
      <Album key={name} author={author} name={name} imageURL={imageURL} />
    ));
  }
  return <AlbumPlaceholder />;
}
