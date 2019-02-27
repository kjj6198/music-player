import React, { Fragment, Component, createRef } from 'react';
import styled from 'styled-components';
import { withAudioContext } from './AudioProvider';
import Player from '@/services/player';
import Duration from './Duration';
import SongProgress from './SongProgress';
import PlayerControl from './PlayerControls';

const Control = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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

class MusicPlayer extends Component {
  player = null;

  audioRef = createRef();

  progressRef = createRef();

  state = {
    currentTime: 0,
    duration: 0,
    isPaused: true,
  };

  componentDidMount = () => {
    this.player = Player.createPlayer({
      audio: this.audioRef.current,
      src: this.props.src,
      onError: this.props.onError,
      onLoaded: this.onLoaded,
    });

    this.props.setContext({
      audioRef: this.audioRef,
      audio: this.audioRef.current,
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

  handleControlClick = () => {
    if (this.player) {
      // [NOTE]: we need to setState first and trigger play(pause) to make UI state sync.
      if (this.player.paused) {
        this.setState({ isPaused: false }, () => this.player.play());
      } else {
        this.setState({ isPaused: true }, () => this.player.pause());
      }
    }
  };

  render() {
    const { currentTime, duration, isPaused } = this.state;

    return (
      <Fragment>
        <Control>
          <Duration duration={currentTime} />
          <SongProgress
            ref={this.progressRef}
            current={currentTime / duration}
            setCurrent={this.setCurrentTime}
          />
          <Audio
            ref={this.audioRef}
            onPlay={() => this.setState({ isPaused: false })}
            onPause={() => this.setState({ isPaused: true })}
            onEnded={this.props.onEnded}
            onTimeUpdate={() => this.setState({ currentTime: this.player.currentTime })}
          />
          <Duration duration={duration} />
        </Control>
        <PlayerControl
          isPaused={isPaused}
          onClick={this.handleControlClick}
          onNextClick={this.props.onNextClick}
          onPrevClick={this.props.onPrevClick}
        />
      </Fragment>
    );
  }
}

export default withAudioContext(MusicPlayer);
