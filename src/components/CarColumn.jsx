/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import Car from "./Car";
import { ElevatorContext } from "./Elevator";
import useElevator from "./hooks/useElevator";
import { floorLevelsHeight } from "./data";

const CarColumn = ({ evData }) => {
	const { requestedFloors, evNo, direction, delay } = evData;
	const { setElevatorData } = useContext(ElevatorContext);

	const stopTime = 10;
	const { currentFloor, isDoorOpen, moveCountdown } = useElevator({
		floors: requestedFloors,
		direction,
		stopTime,
		delay,
	});

	useEffect(() => {
		setElevatorData((data) => {
			return data.map((d) => {
				if (d.evNo === evNo) {
					return {
						...d,
						currentFloor,
					};
				}

				return d;
			});
		});
	}, [currentFloor, evNo, setElevatorData]);

	return (
		<>
			<div className="h-full w-[100px] relative ">
				<Car
					countdown={moveCountdown.countdown}
					id={evNo}
					floorNo={floorLevelsHeight[currentFloor - 1]}
					assignedFloor={currentFloor - 1}
					stopTime={stopTime}
					isDoorOpen={isDoorOpen}
					delay
				/>
			</div>
		</>
	);
};

export default CarColumn;
