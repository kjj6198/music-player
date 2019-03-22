import { css } from 'styled-components';

export const mobileCSS = (...args) => `
  @media screen and (max-width: 980px) {
    ${css(...args)}
  }
`;

export const desktopCSS = (...args) => css`
  @media screen and (min-width: 1200px) {
    ${css(...args)}
  }
`;
