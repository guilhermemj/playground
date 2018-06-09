import React    from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const repeat = (action, times = 0) => {
	const arr = [];

	for (let n = 0; n < times; n++) {
		arr.push(action(n));
	}

	return arr;
}

const calculateWinner = (squares) => {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let [a, b, c] of lines) {
		if (
			squares[a] &&
			squares[a] === squares[b] &&
			squares[a] === squares[c]
		) {
			return squares[a];
		}
	}

	return null;
};

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

	renderSquare(squareIndex) {
		return (
			<Square
				key={squareIndex}
				value={this.props.squares[squareIndex]}
				onClick={() => this.props.onClick(squareIndex)}
			/>
		);
	}

	renderColumn(rowIndex) {
		const calcSquareIndex = (columnIndex) => (this.width * rowIndex) + columnIndex;

		return (
			<div className="board-row" key={rowIndex}>
				{repeat(
					(columnIndex) => this.renderSquare(calcSquareIndex(columnIndex)),
					this.width
				)}
			</div>
		);
	}

	render() {
		return (
			<div>
				{repeat(this.renderColumn.bind(this), this.width)}
			</div>
		);
	}
}

class Game extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			stepNumber: 0,
			xIsNext: true,
		};
	}

	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();

		if (squares[i] || calculateWinner(squares)) {
			return;
		}

		squares[i] = this.state.xIsNext ? 'X' : 'O';

		this.setState({
			history: history.concat([{
				squares,
			}]),

			stepNumber: history.length,
			xIsNext: !this.state.xIsNext,
		});
	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0,
		});
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner  = calculateWinner(current.squares);
		const status  = (winner ?
			`Winner: ${winner}` :
			`Next player: ${this.state.xIsNext ? 'X' : 'O'}`
		);

		const moves = history.map((step, move) => {
			const desc = (move ?
				`Go to move #${move}` :
				'Go to game start'
			);

			return (
				<li key={move}>
					<button onClick={() => this.jumpTo(move)}>
						{desc}
					</button>
				</li>
			);
		});

		return (
			<div className="game">
				<div className="game-board">
					<Board
						squares={current.squares}
						onClick={(i) => this.handleClick(i)}
					/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<ol>{moves}</ol>
				</div>
			</div>
		);
	}
}

// ========================================

ReactDOM.render(
	<Game />,
	document.getElementById('root')
);
