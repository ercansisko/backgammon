import { useState, useEffect } from "react";
import "./App.css";
import Section from "./Section";
import DiceApp from "./DiceApp";
function App() {
	const [broken, setBroken] = useState({ black: 0, white: 0 });
	const [rollableDice, setRollableDice] = useState(true);
	const [clickedCircleId, setClickedCircleId] = useState();
	const [clickableSection, setClickableSection] = useState(false);
	const [clickableCircle, setClickableCircle] = useState(true);
	const [twoHands, setTwoHands] = useState(0);
	const [dices, setDices] = useState();
	const [turn, setTurn] = useState();
	const [clickedSectionId, setClickedSectionId] = useState();
	const [zorDurum, setZorDurum] = useState(false);
	const [collectWhiteMode, setCollectWhiteMode] = useState(false);
	const [collectBlackMode, setCollectBlackMode] = useState(false);
	const [collectedWhite, setCollectedWhite] = useState(0);
	const [collectedBlack, setCollectedBlack] = useState(0);
	const [noClickedSection, setNoClickedSection] = useState(false);

	const [black, setBlack] = useState([
		0, 0, 0, 0, 0, 5, 0, 3, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
	]);
	const [white, setWhite] = useState([
		2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 3, 0, 5, 0, 0, 0, 0, 0,
	]);
	const handleDices = (x, y) => {
		setDices([
			{ value: x, status: "unplayed" },
			{ value: y, status: "unplayed" },
		]);
		setZorDurum(false);
	};
	const checkCantMoveBlack = (
		blackArr,
		whiteArr,
		dice,
		collectMode,
		brokenList
	) => {
		let moves = 0;
		for (let i = 0; i < blackArr.length; i++) {
			if (
				blackArr[i] > 0 &&
				(!collectMode
					? (dice[0].status === "unplayed" &&
							whiteArr[i - dice[0].value] < 2) ||
					  (dice[1].status === "unplayed" && whiteArr[i - dice[1].value] < 2)
					: (dice[0].status === "unplayed" &&
							(whiteArr[i - dice[0].value] < 2 || i < dice[0].value)) ||
					  (dice[1].status === "unplayed" &&
							(whiteArr[i - dice[1].value] < 2 || i < dice[1].value)))
			)
				moves++;
		}
		return brokenList > 0 ? false : moves === 0 ? true : false;
	};
	const checkCantMoveWhite = (
		whiteArr,
		blackArr,
		dice,
		collectMode,
		brokenList
	) => {
		let moves = 0;
		for (let i = 0; i < whiteArr.length; i++) {
			if (
				whiteArr[i] > 0 &&
				(!collectMode
					? (dice[0].status === "unplayed" &&
							blackArr[i + dice[0].value] < 2) ||
					  (dice[1].status === "unplayed" && blackArr[i + dice[1].value] < 2)
					: (dice[0].status === "unplayed" &&
							(black[i + dice[0].value] < 2 || 23 - i < dice[0].value)) ||
					  (dice[1].status === "unplayed" &&
							(blackArr[i + dice[1].value] < 2 || 23 - i < dice[1].value)))
			)
				moves++;
		}
		return brokenList > 0 ? false : moves === 0 ? true : false;
	};

	const checkBlackUnderSix = (arr) => {
		let toplam = 0;
		for (let a = 6; a < arr.length; a++) {
			toplam += arr[a];
		}
		return toplam === 0 ? true : false;
	};
	const checkWhiteUnderSix = (arr) => {
		let toplam = 0;
		for (let a = 0; a <= 17; a++) {
			toplam += arr[a];
		}
		return toplam === 0 ? true : false;
	};
	useEffect(() => {
		setTwoHands(0);

		if (broken[turn] >= 1) {
			turn === "white"
				? setCollectWhiteMode(false)
				: setCollectBlackMode(false);
			if (
				turn === "white"
					? black[dices[0].value - 1] > 1 && black[dices[1].value - 1] > 1
					: white[24 - dices[0].value] > 1 && white[dices[1].value - 1] > 1
			) {
				console.log("1");
				setRollableDice(true);
				setZorDurum(false);
			} else {
				if (
					turn === "white"
						? black[dices[0].value - 1] <= 1 && black[dices[1].value - 1] <= 1
						: white[24 - dices[0].value] <= 1 && white[dices[1].value - 1] <= 1
				) {
					console.log("2");
					setZorDurum(false);
				} else if (broken[turn] > 1) {
					console.log("3");
					setZorDurum(true);
				}
				setClickableSection(true);
				setClickableCircle(false);
				setTwoHands((prev) => prev + 1);
			}
		}
	}, [turn]);

	useEffect(() => {
		if (
			turn === "white"
				? checkWhiteUnderSix(white) && broken.white === 0
				: checkBlackUnderSix(black) && broken.black === 0
		) {
			turn === "white" ? setCollectWhiteMode(true) : setCollectBlackMode(true);
		}
	}, [twoHands]);

	useEffect(() => {
		if (
			dices &&
			!(dices[0].status === "played" && dices[1].status === "played") &&
			(turn === "white"
				? checkCantMoveWhite(
						white,
						black,
						dices,
						collectWhiteMode,
						broken.white
				  )
				: checkCantMoveBlack(
						black,
						white,
						dices,
						collectBlackMode,
						broken.black
				  ))
		) {
			//
			console.log(
				turn === "white"
					? checkCantMoveWhite(white, black, dices, collectWhiteMode)
					: checkCantMoveBlack(black, white, dices, collectBlackMode)
			);
			setNoClickedSection(true);
			setRollableDice(true); /////////////////////
			setClickableCircle(true);
			setClickableSection(false);
		}
	}, [dices]);
	useEffect(() => {
		if (!clickableSection && !zorDurum && !noClickedSection) {
			if (clickedCircleId && turn === "black") {
				if (broken.black > 0) {
					setBlack((prev) => {
						let newArr = [...prev];
						newArr[clickedSectionId] = [...prev][clickedSectionId] + 1;
						return newArr;
					});
					setBroken((prev) => ({ ...prev, black: prev.black - 1 }));
				} else
					setBlack((prev) => {
						let newArr = [...prev];
						newArr[clickedSectionId] = [...prev][clickedSectionId] + 1;
						newArr[clickedCircleId[0]] = [...prev][clickedCircleId[0]] - 1;
						return newArr;
					});
			}
			if (clickedCircleId && turn === "white") {
				if (broken.white > 0) {
					setWhite((prev) => {
						let newArr = [...prev];
						newArr[clickedSectionId] = [...prev][clickedSectionId] + 1;
						return newArr;
					});
					setBroken((prev) => ({ ...prev, white: prev.white - 1 }));
				} else
					setWhite((prev) => {
						let newArr = [...prev];
						newArr[clickedSectionId] = [...prev][clickedSectionId] + 1;
						newArr[clickedCircleId[0]] = [...prev][clickedCircleId[0]] - 1;
						return newArr;
					});
			}
		}
	}, [clickableSection]);

	const handleClickedCircle = (x, y) => {
		if (
			y === turn &&
			(dices[0].value === dices[1].value ? twoHands < 4 : twoHands < 2) &&
			clickableCircle &&
			!rollableDice
		) {
			setNoClickedSection(false);
			if (
				y === "black" &&
				broken.black === 0 &&
				(!collectBlackMode
					? dices[0].status === "unplayed" && dices[1].status === "unplayed"
						? white[x - dices[0].value] < 2 || white[x - dices[1].value] < 2
						: dices[0].status === "unplayed"
						? white[x - dices[0].value] < 2
						: white[x - dices[1].value] < 2 ///////////
					: dices[0].status === "unplayed" && dices[1].status === "unplayed"
					? white[x - dices[0].value] < 2 ||
					  white[x - dices[1].value] < 2 ||
					  x < dices[0].value ||
					  x < dices[1].value
					: dices[0].status === "unplayed"
					? white[x - dices[0].value] < 2 || x < dices[0].value
					: white[x - dices[1].value] < 2 || x < dices[1].value)
			) {
				setClickedCircleId([x, y]);
				setClickableSection(true);
				setClickableCircle(false);
				setTwoHands((prev) => prev + 1);
			} else if (
				y === "white" &&
				broken.white === 0 &&
				(!collectWhiteMode
					? dices[0].status === "unplayed" && dices[1].status === "unplayed"
						? black[x + dices[0].value] < 2 || black[x + dices[1].value] < 2
						: dices[0].status === "unplayed"
						? black[x + dices[0].value] < 2
						: black[x + dices[1].value] < 2 ///////////
					: dices[0].status === "unplayed" && dices[1].status === "unplayed"
					? black[x + dices[0].value] < 2 ||
					  black[x + dices[1].value] < 2 ||
					  23 - x < dices[0].value ||
					  23 - x < dices[1].value
					: dices[0].status === "unplayed"
					? black[x + dices[0].value] < 2 || 23 - x < dices[0].value
					: black[x + dices[1].value] < 2 || 23 - x < dices[1].value)
			) {
				setClickedCircleId([x, y]);
				setClickableSection(true);
				setClickableCircle(false);
				setTwoHands((prev) => prev + 1);
			}
		}
	};

	const handleClickedSection = (x) => {
		if (
			black[x] < 2 &&
			clickableSection &&
			clickedCircleId[1] === "white" &&
			broken.white === 0 &&
			(dices[0].status === "unplayed" && dices[1].status === "unplayed"
				? x - clickedCircleId[0] === dices[0].value ||
				  x - clickedCircleId[0] === dices[1].value
				: dices[0].status === "unplayed"
				? x - clickedCircleId[0] === dices[0].value
				: x - clickedCircleId[0] === dices[1].value)
		) {
			if (dices[0].value === dices[1].value) {
				if (twoHands < 4)
					setDices((prev) => {
						let newArr = [...prev];
						newArr[0].status = "played";
						newArr[1].status = "unplayed";
						return newArr;
					});
				else setDices((prev) => prev.map((dice) => (dice.status = "played")));
			} else
				setDices((prev) =>
					prev.map((d) => {
						d.status === "played"
							? (d.status = "played")
							: d.value === x - clickedCircleId[0]
							? (d.status = "played")
							: (d.status = "unplayed");
						return d;
					})
				);
			setClickedSectionId(x);
			setClickableSection(false);
			setClickableCircle(true);
			if (black[x] === 1) {
				setBlack((prev) => {
					let newArr = [...prev];
					newArr[x] = 0;
					return newArr;
				});
				setBroken((prev) => ({ ...prev, black: prev.black + 1 }));
			}
			if (dices[0].value === dices[1].value ? twoHands === 4 : twoHands === 2) {
				setRollableDice(true);
			}
		} else if (
			black[x] < 2 &&
			clickableSection &&
			turn === "white" &&
			broken.white > 0 &&
			(dices[0].status === "unplayed" && dices[1].status === "unplayed"
				? x + 1 === dices[0].value || x + 1 === dices[1].value
				: dices[0].status === "unplayed"
				? x + 1 === dices[0].value
				: x + 1 === dices[1].value)
		) {
			if (dices[0].value === dices[1].value) {
				if (twoHands < 4)
					setDices((prev) => {
						let newArr = [...prev];
						newArr[0].status = "played";
						newArr[1].status = "unplayed";
						return newArr;
					});
				else setDices((prev) => prev.map((dice) => (dice.status = "played")));
			} else
				setDices((prev) =>
					prev.map((d) => {
						d.status === "played"
							? (d.status = "played")
							: d.value === x + 1
							? (d.status = "played")
							: (d.status = "unplayed");
						return d;
					})
				);
			setClickedSectionId(x);
			if (broken.white > 1) {
				setWhite((prev) => {
					let newArr = [...prev];
					newArr[x] = [...prev][x] + 1;
					return newArr;
				});
				setBroken((prev) => ({ ...prev, white: prev.white - 1 }));
				setTwoHands((prev) => prev + 1);
				if (zorDurum) {
					setRollableDice(true); /////////////////////
					setClickableCircle(true);
					setClickableSection(false);
				}
			} else if (broken.white <= 1) {
				setClickableSection(false);
				setClickableCircle(true);
			}
			if (black[x] === 1) {
				setBlack((prev) => {
					let newArr = [...prev];
					newArr[x] = 0;
					return newArr;
				});
				setBroken((prev) => ({ ...prev, black: prev.black + 1 }));
			}
			if (dices[0].value === dices[1].value ? twoHands === 4 : twoHands === 2) {
				setRollableDice(true);
			}
		} else if (
			white[x] < 2 &&
			clickableSection &&
			clickedCircleId[1] === "black" &&
			broken.black === 0 &&
			(dices[0].status === "unplayed" && dices[1].status === "unplayed"
				? clickedCircleId[0] - x === dices[0].value ||
				  clickedCircleId[0] - x === dices[1].value
				: dices[0].status === "unplayed"
				? clickedCircleId[0] - x === dices[0].value
				: clickedCircleId[0] - x === dices[1].value)
		) {
			if (dices[0].value === dices[1].value) {
				if (twoHands < 4)
					setDices((prev) => {
						let newArr = [...prev];
						newArr[0].status = "played";
						newArr[1].status = "unplayed";
						return newArr;
					});
				else setDices((prev) => prev.map((dice) => (dice.status = "played")));
			} else
				setDices((prev) =>
					prev.map((d) => {
						d.status === "played"
							? (d.status = "played")
							: d.value === clickedCircleId[0] - x
							? (d.status = "played")
							: (d.status = "unplayed");
						return d;
					})
				);
			setClickedSectionId(x);
			setClickableSection(false);
			setClickableCircle(true);
			if (white[x] === 1) {
				setWhite((prev) => {
					let newArr = [...prev];
					newArr[x] = 0;
					return newArr;
				});
				setBroken((prev) => ({ ...prev, white: prev.white + 1 }));
			}
			if (dices[0].value === dices[1].value ? twoHands === 4 : twoHands === 2) {
				setRollableDice(true);
			}
		} else if (
			white[x] < 2 &&
			clickableSection &&
			turn === "black" &&
			broken.black > 0 &&
			(dices[0].status === "unplayed" && dices[1].status === "unplayed"
				? 24 - x === dices[0].value || 24 - x === dices[1].value
				: dices[0].status === "unplayed"
				? 24 - x === dices[0].value
				: 24 - x === dices[1].value)
		) {
			if (dices[0].value === dices[1].value) {
				if (twoHands < 4)
					setDices((prev) => {
						let newArr = [...prev];
						newArr[0].status = "played";
						newArr[1].status = "unplayed";
						return newArr;
					});
				else setDices((prev) => prev.map((dice) => (dice.status = "played")));
			} else
				setDices((prev) =>
					prev.map((d) => {
						d.status === "played"
							? (d.status = "played")
							: d.value === 24 - x
							? (d.status = "played")
							: (d.status = "unplayed");
						return d;
					})
				);
			setClickedSectionId(x);
			if (broken.black > 1) {
				setBlack((prev) => {
					let newArr = [...prev];
					newArr[x] = [...prev][x] + 1;
					return newArr;
				});
				setBroken((prev) => ({ ...prev, black: prev.black - 1 }));
				setTwoHands((prev) => prev + 1);
				if (zorDurum) {
					setRollableDice(true);
					setClickableCircle(true);
					setClickableSection(false);
				}
			} else if (broken.black <= 1) {
				setClickableSection(false);
				setClickableCircle(true);
			}
			if (white[x] === 1) {
				setWhite((prev) => {
					let newArr = [...prev];
					newArr[x] = 0;
					return newArr;
				});
				setBroken((prev) => ({ ...prev, white: prev.white + 1 }));
			}
			if (dices[0].value === dices[1].value ? twoHands === 4 : twoHands === 2) {
				setRollableDice(true);
			}
		}
	};
	useEffect(() => {
		if (collectedBlack === 15) console.log("oyun bitti Siyahlar kazandı.");
	}, [collectedBlack]);
	useEffect(() => {
		if (collectedWhite === 15) console.log("oyun bitti Beyazlar kazandı.");
	}, [collectedWhite]);
	const blackCollect = () => {
		if (
			collectBlackMode &&
			turn === "black" &&
			clickableSection &&
			!clickableCircle &&
			(dices[0].status === "unplayed" && dices[1].status === "unplayed"
				? clickedCircleId[0] < dices[0].value ||
				  clickedCircleId[0] < dices[1].value
				: dices[0].status === "unplayed"
				? clickedCircleId[0] < dices[0].value
				: clickedCircleId[0] < dices[1].value)
		) {
			setNoClickedSection(true);
			setDices((prev) =>
				prev.map((d) => {
					d.status === "played"
						? (d.status = "played")
						: d.value > clickedCircleId[0]
						? (d.status = "played")
						: (d.status = "unplayed");
					return d;
				})
			);
			setCollectedBlack((prev) => prev + 1);
			setBlack((prev) => {
				let newArr = [...prev];
				newArr[clickedCircleId[0]] = [...prev][clickedCircleId[0]] - 1;
				return newArr;
			});
			setClickableCircle(true);
			setClickableSection(false);
			if (dices[0].value === dices[1].value ? twoHands === 4 : twoHands === 2) {
				setRollableDice(true);
			}
		}
	};

	const whiteCollect = () => {
		if (
			collectWhiteMode &&
			turn === "white" &&
			clickableSection &&
			!clickableCircle &&
			(dices[0].status === "unplayed" && dices[1].status === "unplayed"
				? 23 - clickedCircleId[0] < dices[0].value ||
				  23 - clickedCircleId[0] < dices[1].value
				: dices[0].status === "unplayed"
				? 23 - clickedCircleId[0] < dices[0].value
				: 23 - clickedCircleId[0] < dices[1].value)
		) {
			setNoClickedSection(true);
			setDices((prev) =>
				prev.map((d) => {
					d.status === "played"
						? (d.status = "played")
						: d.value > 23 - clickedCircleId[0]
						? (d.status = "played")
						: (d.status = "unplayed");
					return d;
				})
			);
			setCollectedWhite((prev) => prev + 1);
			setWhite((prev) => {
				let newArr = [...prev];
				newArr[clickedCircleId[0]] = [...prev][clickedCircleId[0]] - 1;
				return newArr;
			});
			setClickableCircle(true);
			setClickableSection(false);
			if (dices[0].value === dices[1].value ? twoHands === 4 : twoHands === 2) {
				setRollableDice(true);
			}
		}
	};
	return (
		<div className="bgammon">
			<div className="black-btn" onClick={blackCollect}>
				Siyah Topla {collectedBlack}{" "}
			</div>
			<div className="grid-container">
				{black.map((section, index) => (
					<Section
						handleClickedCircle={handleClickedCircle}
						handleClickedSection={handleClickedSection}
						setBlack={setBlack}
						setWhite={setWhite}
						black={black[index]}
						white={white[index]}
						index={index}
					/>
				))}
			</div>
			<div className="midline"></div>

			<div className="white-btn" onClick={whiteCollect}>
				Beyaz Topla {collectedWhite}{" "}
			</div>
			<DiceApp
				setRollableDice={setRollableDice}
				rollableDice={rollableDice}
				setTurn={setTurn}
				handleDices={handleDices}
			/>
		</div>
	);
}

export default App;
