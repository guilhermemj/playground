import styled from "styled-components";

const SQUARE_SIZE = '40px';

export const Button = styled.button`
  width: ${SQUARE_SIZE};
  height: ${SQUARE_SIZE};

  margin-right: -1px;
  margin-top: -1px;
  padding: 0;

  background: #fff;
  border: 1px solid #999;
  float: left;

  font-size: 24px;
  font-weight: bold;
  line-height: ${SQUARE_SIZE};
  text-align: center;

  &:focus {
    outline: none;
  }

  .kbd-navigation &:focus {
    background: #ddd;
  }

  &.highlight {
    background-color: #333;
    color: #daa520;
  }
`;
