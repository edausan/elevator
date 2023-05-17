/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";

const useCountdown = (time = 10, requestedFloors = []) => {
	const [startCountdown, setStartCountdown] = useState(false);
	const [countdown, setCountdown] = useState(time);
	const timerRef = useRef(null);

	const startTimer = () => {
		timerRef.current = setInterval(() => {
			setCountdown((prev) => prev - 1);
		}, 1000);
	};

	useEffect(() => {
		if (countdown <= 0) {
			stopTimer();
			if (requestedFloors.length > 0) {
				startTimer();
			}
		}
	}, [countdown]);

	useEffect(() => {
		if (startCountdown && time) {
			startTimer();
			setCountdown(time);
		}

		return () => stopTimer();
	}, [startCountdown, time]);

	const stopTimer = () => {
		clearInterval(timerRef.current);
		timerRef.current = null;
		setCountdown(time);
	};

	return {
		countdown,
		startTimer,
		stopTimer,
		setStartCountdown,
	};
};

export default useCountdown;
