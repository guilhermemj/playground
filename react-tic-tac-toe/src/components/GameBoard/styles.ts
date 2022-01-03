import styled from 'styled-components';

export const BoardWrapper = styled.div`
  padding: 1rem;
`;

export const BoardRow = styled.div`
  &:after {
    clear: both;
    content: "";
    display: table;
  }
`;
