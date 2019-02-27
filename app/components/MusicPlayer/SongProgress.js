// [TODO] naming is not good.
import React, { Component, createRef, useLayoutEffect } from 'react';
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
import { mobileCSS } from '@/utils/media';

export const SongProgressWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 10px;
  height: 6px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.6);

  ${mobileCSS`
    max-width: 200px;
  `}
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
  pointer-events: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  background-color: #fff;
  left: 0;
  border-radius: 5px;
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
  curosr: pointer;
  transform: translate(-7.5px);
  transform-origin: center;
  background-color: #fff;
  transition: box-shadow 0.2s ease;
  &:focus {
    outline: none;
    box-shadow: 0 0 5px 5px rgba(200, 200, 200, 0.5);
  }
`;

export default class SongProgress extends Component {
  indicator = createRef();

  bar = createRef();

  componentDidMount() {
    const { offsetWidth: width } = this.bar.current;
    const { setCurrent } = this.props;
    this.slide$ = fromEvent(this.bar.current, 'mousedown')
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
          map(e => (initialX + e.pageX - x) / width),
          /* make button blur when mouse up */
          takeUntil(fromEvent(window, 'mouseup').pipe(tap(() => document.activeElement.blur()))),
          startWith(initialX / width),
        )),
        filter(progress => progress <= 1 || progress >= 0),
        observeOn(animationFrameScheduler),
      )
      .subscribe(setCurrent);
  }

  componentWillUnmount() {
    this.slide$.unsubscribe();
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
