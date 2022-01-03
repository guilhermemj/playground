import styled from 'styled-components';

export const Wrapper = styled.div`
  background: #fff;
  border: 1px solid rgba(0, 0, 0, .25);
  border-radius: 4px;
`;

export const Title = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 0;
  padding: 8px 12px;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #ddd;
`;

export const SortButton = styled.button`
  background: none;
  border: 1px solid #ddd;
  border-radius: 8px;

  width: 32px;
  height: 32px;
  margin-left: 8px;

  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, .05);
  }
`;
