/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { ElevatorContext } from "./Elevator";

/* eslint-disable react/prop-types */
const Floor = ({ floorNo }) => {
	const { elevatorData } = useContext(ElevatorContext);

	return (
		<div className="relative w-[600px] h-[60px] border-b-[6px] border-amber-600 flex text-xs shadow-xl">
			<div className="absolute bottom-3 left-[50%] translate-x-[-50%]">
				FL-{floorNo}
			</div>

			<div className="w-full flex flex-row justify-between">
				{elevatorData.map((data) => {
					return (
						<ElevatorButtons
							evData={data}
							key={data.evNo}
							ev={data.evNo}
							floorNo={floorNo}
						/>
					);
				})}
			</div>
		</div>
	);
};

const ElevatorButtons = ({ evData, ev, floorNo }) => {
	const { setElevatorData } = useContext(ElevatorContext);
	const { requestedFloors, direction } = evData;
	const [isActive, setIsActive] = useState(false);
	const [isSelected, setIsSelected] = useState(false);

	useEffect(() => {
		const currentFloor = evData.currentFloor + 1;
		const is_active = currentFloor === floorNo + 1;
		const is_selected = requestedFloors.findIndex((f) => f === floorNo);
		setIsSelected(is_selected >= 0);
		setIsActive(is_active);
	}, [evData, floorNo, requestedFloors]);

	const handleRequestFloor = (direction) => {
		const notExists = requestedFloors.findIndex((f) => f === floorNo) === -1;

		notExists &&
			setElevatorData((elevatorData) => {
				return elevatorData.map((evData) => {
					if (evData.evNo === ev) {
						return {
							...evData,
							requestedFloors: [...requestedFloors, floorNo],
							direction,
						};
					}

					return evData;
				});
			});
	};

	return (
		<div className="w-[100px] flex flex-row justify-between">
			<Button
				icon="▲"
				onClick={() => handleRequestFloor("up")}
				disabled={evData.currentFloor > floorNo}
				active={isActive && direction === "up"}
				selected={isSelected && direction === "up"}
			/>
			<Button
				icon="▼"
				onClick={() => handleRequestFloor("down")}
				disabled={evData.currentFloor < floorNo}
				active={isActive && direction === "down"}
				selected={isSelected && direction === "down"}
			/>
		</div>
	);
};

const Button = ({ icon, onClick, disabled, active, selected }) => {
	return (
		<button
			// onClick={onClick}
			disabled={disabled}
			className={`p-4 text-2xl text-gray-300 hover:text-gray-500 transition-all duration-200 disabled:text-gray-300/25 ${
				active ? "text-green-500" : ""
			} ${selected ? "text-yellow-500" : ""}`}>
			{icon}
		</button>
	);
};

export default Floor;
