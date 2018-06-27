import React from 'react';

const repeatElems = (action, times = 0) => {
	const arr = [];

	for (let n = 0; n < times; n++) {
		arr.push(action(n));
	}

	return arr;
}

const Square = (props) => (
	<button className="square" onClick={props.onClick}>
		{props.value}
	</button>
);

class Board extends React.Component {
	constructor(props) {
		super(props);

		this.width = Math.sqrt(props.squares.length);
	}

	render() {
		return (
			<div>
				{repeatElems((rowIndex) => (
					<div className="board-row" key={rowIndex}>
						{repeatElems((columnIndex) => {
							const squareIndex = (this.width * rowIndex) + columnIndex;

							return (
								<Square
									key={squareIndex}
									value={this.props.squares[squareIndex]}
									onClick={() => this.props.onClick(squareIndex)}
								/>
							);
						}, this.width)}
					</div>
				), this.width)}
			</div>
		);
	}
}

export default Board;
