import React, { Component, createRef } from 'react';
import styled from 'styled-components';
// import { playerContext } from './AudioProvider';
import Player from '@/services/player';
import Duration from './Duration';
import SongProgress from './SongProgress';

const Control = styled.div`
  width: 100%;
  margin: auto;
  height: 40px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(34, 34, 34);
`;

const Audio = styled.audio.attrs(props => ({
  src: props.src,
}))`
  width: 0;
  height: 0;
  font-size: 0;
  appearance: none;
  visibility: hidden;
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

  setCurrentTime = (current) => {
    const { duration } = this.state;
    if (this.player) {
      this.player.audio.currentTime = current * duration;
      this.setState({
        currentTime: this.player.audio.currentTime,
      });
    }
  };

  render() {
    const { currentTime, duration } = this.state;

    return (
      <Control>
        <Duration duration={currentTime} />
        <SongProgress current={currentTime / duration} setCurrentTime={this.setCurrentTime} />
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
