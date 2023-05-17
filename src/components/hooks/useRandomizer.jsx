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
		randoms: randomsRef.current,
		generateRandomNumber,
		generateRandomGroupOfNumber,
		generateDirection,
		direction,
	};
};

export default useRandomizer;
