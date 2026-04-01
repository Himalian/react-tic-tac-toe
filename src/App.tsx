import "./App.css";
import { useState } from "react";
import "react";

interface SquareProns {
	value: string | null;
	onSquareClick: () => void; // Must be a callable function that returns void
}
function Square({ value, onSquareClick }: SquareProns) {
	return (
		<button type="button" className="square" onClick={onSquareClick}>
			{value}
		</button>
	);
}

export default function Board() {
	// useState returns an Array contains two values:
	// - value for current state: All filled by null
	// - A function to set value: setSquares
	const [squares, setSquares] = useState<("X" | "O" | null)[]>(
		Array(9).fill(null),
	);
	// Firxt is "X"
	const [xIsNext, setXIsNext] = useState<true | false>(false);

	const winner = calculateWinner(squares);
	let status: string;
	if (winner) {
		status = `Winner: ${winner}`;
	} else {
		status = `Next player: ${xIsNext ? "O" : "X"}`;
	}

	function handleClick(i: number): void {
		// create new state of squares, other than modify
		const nextSquares = squares.slice();
		if (xIsNext) {
			if (nextSquares[i] !== null) {
				return;
			}
			nextSquares[i] = "O";
			setXIsNext(false);
		} else {
			if (nextSquares[i] !== null) {
				return;
			}
			nextSquares[i] = "X";
			setXIsNext(true);
		}
		setSquares(nextSquares);
	}

	// biome-ignore lint/suspicious/noExplicitAny: < >
	function calculateWinner(squares: any): string | null {
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
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (
				squares[a] &&
				squares[a] === squares[b] &&
				squares[a] === squares[c]
			) {
				return squares[a];
			}
		}
		return null;
	}

	return (
		<>
			<div className="status">{status}</div>
			<div className="board-row" data-purpose="Row 1">
				<Square value={squares[0]} onSquareClick={() => handleClick(0)} />
				<Square value={squares[1]} onSquareClick={() => handleClick(1)} />
				<Square value={squares[2]} onSquareClick={() => handleClick(2)} />
			</div>
			<div className="board-row">
				<Square value={squares[3]} onSquareClick={() => handleClick(3)} />
				<Square value={squares[4]} onSquareClick={() => handleClick(4)} />
				<Square value={squares[5]} onSquareClick={() => handleClick(5)} />
			</div>
			<div className="board-row">
				<Square value={squares[6]} onSquareClick={() => handleClick(6)} />
				<Square value={squares[7]} onSquareClick={() => handleClick(7)} />
				<Square value={squares[8]} onSquareClick={() => handleClick(8)} />
			</div>
			<button
				type="reset"
				onClick={() => {
					setSquares(Array(9).fill(null));
				}}
			>
				Reset
			</button>
		</>
	);
}
