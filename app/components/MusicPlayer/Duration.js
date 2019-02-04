import styled from 'styled-components';
import formatDuration from '@/utils/formatDuration';

const Duration = styled.span.attrs(props => ({
  children: formatDuration(props.duration),
}))`
  color: #fff;
  font-size: 12px;
  font-weight: 800;
`;

export default Duration;
