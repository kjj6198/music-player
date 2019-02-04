import React, { Component, createRef } from 'react';
import styled from 'styled-components';
// import { playerContext } from './AudioProvider';
import Player from '@/services/player';
import Duration from './Duration';

const Control = styled.div`
  width: 100%;
  max-width: 680px;
  margin: auto;
`;

const Audio = styled.audio.attrs(props => ({
  src: props.src,
}))`
  // width: 0;
  // height: 0;
  // font-size: 0;
  // appearance: none;
  // visibility: hidden;
`;

export default class MusicPlayer extends Component {
  player = null;

  audioRef = createRef();

  state = {
    currentTime: 0,
    duration: 0,
  };

  componentDidMount = () => {
    // debugger;
    this.player = Player.createPlayer({
      audio: this.audioRef.current,
      src: this.props.src,
      onError: this.props.onError,
      onLoaded: this.onLoaded,
    });
  };

  componentDidUpdate = (preProps) => {
    if (preProps.src !== this.props.src) {
      this.player.pause();
      this.player.destory();
      this.player = Player.createPlayer({
        audio: this.audioRef.current,
        src: this.props.src,
        onError: this.props.onError,
        onLoaded: this.onLoaded,
      });
    }
  };

  componentWillUnmount() {
    if (this.player) {
      this.player.destory();
    }
  }

  onLoaded = () => {
    const { currentTime, duration } = this.audioRef.current;
    this.setState({ currentTime, duration }, () => {
      this.props.onLoaded(this.player);
    });
  };

  render() {
    const { currentTime, duration } = this.state;

    return (
      <Control>
        <Duration duration={currentTime} />
        <Audio
          ref={this.audioRef}
          controls
          onEnded={this.props.onEnded}
          onTimeUpdate={() => this.setState({ currentTime: this.player.currentTime })}
        />
        <Duration duration={duration} />
      </Control>
    );
  }
}
