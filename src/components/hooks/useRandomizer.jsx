import { useEffect, useRef, useState } from "react";

const useRandomizer = () => {
	const [randomNumber, setRandomNumber] = useState(0);
	const [direction, setDirection] = useState(0);
	const randomsRef = useRef([]);

	const generateRandomNumber = () => {
		const newRandomNumber = Math.floor(Math.random() * 11);

		setRandomNumber(newRandomNumber);
		return newRandomNumber;
	};

	const getNumberAndDecimal = () => {
		const number = Math.random() * 4;
		const integerPart = Math.floor(number);
		const decimalPart = Math.abs(number % 1);

		const firstDecimal = Math.floor(decimalPart * 100);

		return {
			integerPart,
			firstDecimal,
		};
	};

	const generateRandomGroupOfNumber = () => {
		for (let i = 0; i < 3; i++) {
			const ran_num = generateRandomNumber();

			const notExists =
				randomsRef.current.findIndex((n) => n === ran_num) === -1;
			if (notExists) {
				randomsRef.current = [...randomsRef.current, ran_num];
			}
		}

		return randomsRef.current;
	};

	const generateDirection = () => {
		const newRandomNumber = 1 + Math.random();
		const direction = Math.round(newRandomNumber) === 1 ? "up" : "down";
		setDirection(direction);
		return direction;
	};

	useEffect(() => {
		generateDirection();
	}, []);

	return {
		randomNumber,
		direction,
		randoms: randomsRef.current,
		generateRandomNumber,
		generateRandomGroupOfNumber,
		generateDirection,
		getNumberAndDecimal,
	};
};

export default useRandomizer;
