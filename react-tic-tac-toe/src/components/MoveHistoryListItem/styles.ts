import styled from 'styled-components';

export const ListItem = styled.li`
  &.highlight {
    background-color: rgba(0, 0, 0, .1);
    font-weight: bold;
  }
`;

export const Button = styled.button`
  background: none;
  border: none;
  width: 100%;

  padding: 8px 12px;
  font-family: inherit;
  font-weight: inherit;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, .05);
  }
`;
