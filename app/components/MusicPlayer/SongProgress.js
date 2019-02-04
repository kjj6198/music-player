import React, { Component, createRef } from 'react';
import { fromEvent, animationFrameScheduler } from 'rxjs';
import {
  throttleTime,
  merge,
  map,
  switchMap,
  takeUntil,
  startWith,
  observeOn,
  filter,
  tap,
} from 'rxjs/operators';
import styled from 'styled-components';

export const SongProgressWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 6px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Bar = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 14px;
  border-radius: 1px;
  cursor: pointer;
  z-index: 1;
`;

export const ProgressFill = styled.div.attrs(props => ({
  style: {
    width: `${(props.current || 0) * 100}%`,
  },
}))`
  pointer-event: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  background-color: #fff;
  left: 0;
`;

export const Indicator = styled.button.attrs(props => ({
  style: {
    left: `${props.current * 100}%`,
  },
}))`
  position: absolute;
  top: -4px;
  left: 0;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  appearance: none;
  transform: translate(-7.5px);
  transform-origin: center;
  background-color: #fff;
  &:focus {
    outline: none;
    box-shadow: 0 0 5px 3px rgba(125, 125, 125, 0.5);
  }
`;

export default class SongProgress extends Component {
  indicator = createRef();

  bar = createRef();

  componentDidMount() {
    const { offsetWidth: width } = this.bar.current;
    const { setCurrentTime } = this.props;
    fromEvent(this.bar.current, 'mousedown')
      .pipe(
        merge(
          fromEvent(this.indicator.current, 'mousedown').pipe(
            map(({ pageX }) => ({
              pageX,
              offsetX: this.props.current * width,
            })),
          ),
        ),
        throttleTime(100),
        switchMap(({ offsetX: initialX, pageX: x }) => fromEvent(window, 'mousemove').pipe(
          takeUntil(fromEvent(window, 'mouseup')),
          map(e => (initialX + e.pageX - x) / width),
          startWith(initialX / width),
        )),
        filter(volume => volume <= 1 || volume >= 0),
        observeOn(animationFrameScheduler),
      )
      .subscribe(setCurrentTime);
  }

  render() {
    return (
      <SongProgressWrapper>
        <Bar ref={this.bar}>
          <ProgressFill current={this.props.current} />
          <Indicator ref={this.indicator} current={this.props.current} />
        </Bar>
      </SongProgressWrapper>
    );
  }
}
