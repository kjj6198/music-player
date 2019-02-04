// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader/root';
import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import Lazy from '@/components/LazyComponent';
import Provider from '@/containers/Provider';
import HomePage from '@/components/HomePage';
import ErrorBlock from '@/components/ErrorBlock';

// This is whole app entry, with hot module reload.
// react-hot-loader will automatically handle production.
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #171d1a;
`;

const Main = styled.div`
  flex-grow: 1;
`;

const SongOverview = Lazy({
  loader: () => import(/* webpackChunkName: "Song" */ '../components/SongOverview'),
});

const App = () => (
  <Provider>
    <Wrapper>
      <Main>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/albums/:id" component={SongOverview} />
        </Switch>
        <ErrorBlock />
      </Main>
    </Wrapper>
  </Provider>
);

export default hot(App);
