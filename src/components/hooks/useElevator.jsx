/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useCountdown from "./useCountdown";

const useElevator = ({ floors, stopTime = 2, direction, delay }) => {
	const [currentFloor, setCurrentFloor] = useState(1);
	const [requestedFloors, setRequestedFloors] = useState([]);
	const [isDoorOpen, setIsDoorOpen] = useState(false);
	const { countdown, setStartCountdown, startTimer } = useCountdown(
		stopTime,
		requestedFloors
	);

	useEffect(() => {
		setRequestedFloors(
			direction === "up"
				? floors.sort((a, b) => a - b)
				: floors.sort((a, b) => b - a)
		);
	}, [direction, floors]);

	useEffect(() => {}, [requestedFloors]);

	useEffect(() => {
		if (countdown === stopTime - parseInt(stopTime / 5)) {
			setIsDoorOpen(true);
		} else if (countdown === 2) {
			setIsDoorOpen(false);
		}
	}, [countdown, setStartCountdown, startTimer, stopTime]);

	const handleNextFloor = () => {
		const current_floor = requestedFloors[0];
		const new_floors = requestedFloors?.shift();

		new_floors && setRequestedFloors(requestedFloors);
		current_floor && setCurrentFloor(current_floor);
	};

	useEffect(() => {
		if (countdown === 0) {
			setTimeout(() => {
				handleNextFloor();
			}, `${delay}000`);
		}
	}, [countdown, setStartCountdown, requestedFloors]);

	const handleMoveCar = () => {
		startTimer();
	};

	return {
		currentFloor,
		moveCar: handleMoveCar,
		isDoorOpen,
	};
};

export default useElevator;
