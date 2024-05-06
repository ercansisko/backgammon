import { useEffect, useState } from "react";
import "./DiceApp.css";
import Dice from "./Dice";
function DiceApp({ handleDices, setTurn, rollableDice, setRollableDice }) {
	const [randomNumber1, setRandomNumber1] = useState(1);
	const [randomNumber2, setRandomNumber2] = useState(2);
	const [randomCompleted, setRandomCompleted] = useState(false);
	const roll = () => {
		if (rollableDice) {
			var x = 5;
			var myInterval = setInterval(() => {
				setRollableDice(false);
				x--;
				setRandomCompleted(false);

				setRandomNumber1(Math.floor(Math.random() * 6 + 1));
				setRandomNumber2(Math.floor(Math.random() * 6 + 1));
				if (x < 0) {
					clearInterval(myInterval);
					setRandomCompleted(true);
				}
			}, 100);
		}
	};
	useEffect(() => {
		if (randomCompleted) handleDices(randomNumber1, randomNumber2);
		setTurn((prev) =>
			randomCompleted ? (prev === "black" ? "white" : "black") : prev
		);
	}, [randomCompleted]);
	return (
		<div className="App">
			<div className="dices">
				<Dice randomNumber={randomNumber1} />
				<Dice randomNumber={randomNumber2} />
			</div>
			<button onClick={roll}>Zar At</button>
		</div>
	);
}

export default DiceApp;
