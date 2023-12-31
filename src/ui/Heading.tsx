import { css, styled } from 'styled-components';

const headingType = {
  h1: css`
    font-size: 3rem;
    font-weight: 600;
  `,
  h2: css`
    font-size: 2rem;
    font-weight: 600;
  `,
  h3: css`
    font-size: 2rem;
    font-weight: 500;
  `,
  h4: css`
    font-size: 3rem;
    font-weight: 600;
    text-align: center;
  `
};

const Heading = styled.h1`
  line-height: 1.4;

  ${(props) => props.as === 'h1' && headingType['h1']};
  ${(props) => props.as === 'h2' && headingType['h2']};
  ${(props) => props.as === 'h3' && headingType['h3']};
  ${(props) => props.as === 'h4' && headingType['h4']};
`;

export default Heading;
