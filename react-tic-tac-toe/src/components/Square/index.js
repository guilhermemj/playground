export const Square = ({ value, isHighLight, onClick }) => (
  <button className={ 'square' + (isHighLight ? ' highlight' : '')} onClick={onClick}>
    {value}
  </button>
);

export default Square;
