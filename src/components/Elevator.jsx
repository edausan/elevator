/* eslint-disable react-hooks/exhaustive-deps */
import Floors from "./Floors";
import CarColumn from "./CarColumn";
import { createContext, useEffect, useState } from "react";
// import { initialData } from "./data";
import useRandomizer from "./hooks/useRandomizer";

export const ElevatorContext = createContext();

const Elevator = () => {
	const {
		generateRandomGroupOfNumber,
		generateDirection,
		getNumberAndDecimal,
	} = useRandomizer();

	const [elevatorData, setElevatorData] = useState([]);

	useEffect(() => {
		handleSetData();
	}, []);

	const handleSetData = () => {
		setElevatorData([]);
		for (let i = 0; i < 4; i++) {
			const randoms = generateRandomGroupOfNumber();
			const { firstDecimal, integerPart } = getNumberAndDecimal();
			setElevatorData((prev) => {
				return [
					...prev,
					{
						evNo: i + 1,
						currentFloor: 0,
						requestedFloors: randoms,
						direction: generateDirection(),
						delay: integerPart > 0 ? `${integerPart}${firstDecimal}` : 0,
					},
				];
			});
		}
	};

	return (
		<ElevatorContext.Provider value={{ elevatorData, setElevatorData }}>
			<section className="flex flex-col items-center justify-center">
				<section className="relative bg-amber-50">
					<div className="flex items-center justify-center">
						<h2 className="text-4xl text-amber-800 m-6 uppercase font-black">
							Elevatorator
						</h2>
					</div>

					<Floors />
					<div className="flex flex-row justify-between absolute top-0 z-0 h-full w-full">
						{elevatorData.map((rf) => {
							return (
								<CarColumn
									evData={rf}
									key={rf.evNo}
									id={rf.evNo}
									requestedFloors={rf.requestedFloors}
								/>
							);
						})}
					</div>
				</section>
				{/* <button
					onClick={handleSetData}
					className="px-2 py-1 bg-sky-500 rounded-md m-2 text-white">
					Set Random Floors
				</button> */}
			</section>
		</ElevatorContext.Provider>
	);
};

export default Elevator;
