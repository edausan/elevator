import Floor from "./Floor";

const Floors = () => {
	return (
		<div className="flex flex-col-reverse relative z-10 mt-[50px]">
			<Floor floorNo={1} />
			<Floor floorNo={2} />
			<Floor floorNo={3} />
			<Floor floorNo={4} />
			<Floor floorNo={5} />
			<Floor floorNo={6} />
			<Floor floorNo={7} />
			<Floor floorNo={8} />
			<Floor floorNo={9} />
			<Floor floorNo={10} />
		</div>
	);
};

export default Floors;
