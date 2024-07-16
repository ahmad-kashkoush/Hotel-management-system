import styled, { css } from "styled-components";
const style = {
  h1: css`
  `,
  h2: css`
  `,
  h3: css`
  `,
  h4: css`
  `,
  h5: css`
  `,
};

const Heading = styled.h1`
  ${(props) => style[props.as]}
  /* color:; */
`;
export default Heading;
