export const floorLevelsHeight = [
	6, 66, 126, 186, 246, 306, 366, 426, 486, 546,
];

export const initialData = [
	{
		evNo: 1,
		currentFloor: 0,
		requestedFloors: [0, 3, 5, 7, 9],
		direction: "up",
		initialFloor: 0,
		delay: 0,
	},
	{
		evNo: 2,
		currentFloor: 0,
		requestedFloors: [4, 5, 6, 8, 9, 10],
		direction: "up",
		initialFloor: 4,
		delay: 2,
	},
	{
		evNo: 3,
		currentFloor: 0,
		requestedFloors: [9, 7, 5, 4, 3, 1],
		direction: "down",
		initialFloor: 9,
		delay: 1,
	},
	{
		evNo: 4,
		currentFloor: 0,
		requestedFloors: [5, 3, 1],
		direction: "down",
		initialFloor: 5,
		delay: 3,
	},
];
