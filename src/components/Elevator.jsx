/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";
import Floors from "./Floors";
import CarColumn from "./CarColumn";
import useRandomizer from "./hooks/useRandomizer";
import githubIcon from "../assets/github.svg";

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
				<section className="relative">
					<div className="flex items-center justify-center">
						<h2 className="text-4xl text-amber-800 m-6 uppercase font-black">
							Elevator Simulation
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

				<a href="https://github.com/edausan/elevator">
					<div className="group flex flex-row items-center justify-center transition-all p-3 mt-8 gap-2 rounded-md shadow-md hover:shadow-xl">
						<img src={githubIcon} alt="Github Icon" className="h-[24px]" />
						github.com/edausan/elevator
					</div>
				</a>
			</section>
		</ElevatorContext.Provider>
	);
};

export default Elevator;
