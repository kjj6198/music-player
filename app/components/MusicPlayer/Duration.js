import { memo } from 'react';
import styled from 'styled-components';
import formatDuration from '@/utils/formatDuration';
import { mobileCSS } from '@/utils/media';

const Duration = styled.span.attrs(props => ({
  children: props.loading ? 'loading...' : formatDuration(props.duration),
}))`
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: -0.5px;
  // prevent number causes jump.
  font-variant-numeric: tabular-nums;

  ${mobileCSS`
    font-size: 10px;
  `}
`;

export default memo(Duration);
