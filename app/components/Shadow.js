import styled from 'styled-components';

const Shadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 4px;
  box-shadow: 0 3px 10px 1px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  opacity: 0.6;

  &:hover {
    transform: translateY(-3px);

    opacity: 1;
  }
`;
export default Shadow;
