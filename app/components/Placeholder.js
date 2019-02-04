import styled, { keyframes } from 'styled-components';

const move = keyframes`
  0% {
    backgrond-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
`;

const Placeholder = styled.div`
  width: ${props => `${props.width}px` || '100%'};
  height: ${props => `${props.height}px` || '100%'};
  background-color: ${props => props.bgColor || '#cfcfcf'};
  background-image: linear-gradient(
    to right,
    ${props => props.bgColor} 8%,
    #bbb 35%,
    ${props => props.bgColor} 70%,
    ${props => props.bgColor} 100%
  );
  background-repeat: no-repeat;
  background-size: cover;
  background-position: -${props => props.size}px;
  animation: ${move} 1s linear infinite forwards;
`;

export default Placeholder;
