import { memo } from 'react';
import styled from 'styled-components';
import formatDuration from '@/utils/formatDuration';

const Duration = styled.span.attrs(props => ({
  children: props.loading ? 'loading...' : formatDuration(props.duration),
}))`
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: -0.5px;
  font-variant-numeric: tabular-nums;
`;

export default memo(Duration);
