/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useCountdown from "./useCountdown";

const useElevator = ({ floors, stopTime = 2, direction, delay }) => {
	const [currentFloor, setCurrentFloor] = useState(1);
	const [requestedFloors, setRequestedFloors] = useState([]);
	const [isDoorOpen, setIsDoorOpen] = useState(false);

	const moveCountdown = useCountdown(stopTime, requestedFloors);
	const enterLeaveCountdown = useCountdown(stopTime, requestedFloors);

	useEffect(() => {
		setRequestedFloors(
			direction === "up"
				? floors.sort((a, b) => a - b)
				: floors.sort((a, b) => b - a)
		);
	}, [direction, floors]);

	useEffect(() => {
		const countdown = enterLeaveCountdown.countdown;
		if (countdown === stopTime - 1) {
			setIsDoorOpen(true);
		} else if (countdown === 2) {
			setIsDoorOpen(false);
		}

		if (countdown === 0) {
			enterLeaveCountdown.stopTimer();
			moveCountdown.startTimer();
		}
	}, [stopTime, enterLeaveCountdown.countdown]);

	useEffect(() => {
		if (moveCountdown.countdown === 0) {
			moveCountdown.stopTimer();
			enterLeaveCountdown.startTimer();
		}
	}, [moveCountdown.countdown]);

	useEffect(() => {
		const countdown = moveCountdown.countdown;
		if (countdown === stopTime && !isDoorOpen) {
			handleNextFloor();
		}
	}, [requestedFloors, isDoorOpen]);

	useEffect(() => {
		if (requestedFloors.length > 0) {
			handleMoveCar();
		}
	}, [requestedFloors]);

	const handleNextFloor = () => {
		const current_floor = requestedFloors[0];
		const new_floors = requestedFloors?.shift();

		new_floors && setRequestedFloors(requestedFloors);
		current_floor && setCurrentFloor(current_floor);
	};

	const handleMoveCar = () => {
		moveCountdown.startTimer();
	};

	return {
		currentFloor,
		moveCar: handleMoveCar,
		isDoorOpen,
		moveCountdown,
	};
};

export default useElevator;
