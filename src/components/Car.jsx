/* eslint-disable react/prop-types */
const Car = ({ id, floorNo, assignedFloor, stopTime, isDoorOpen }) => {
	const duration = (stopTime / 4).toString().split(".").join("");
	return (
		<div
			id={`car-${id}`}
			className={`w-full h-[54px] border-4 border-slate-500/80 bg-slate-100 text-slate-500 flex flex-col items-center justify-center transition-all absolute overflow-hidden  shadow-lg`}
			style={{
				bottom: floorNo || 6,
				transitionDuration: `${parseInt(duration)}0ms`,
			}}>
			<div className="absolute top-0 left-0 z-10 w-full h-full shadow-inner"></div>
			<small>EV-{id}</small>
			<small>AF: {assignedFloor + 1}</small>

			<div
				className="absolute top-0 h-full w-[50%] bg-slate-400 z-0 transition-all duration-500"
				style={{ left: isDoorOpen ? -50 : 0 }}></div>
			<div
				className="absolute top-0 right-0 border-l border-l-slate-500 h-full w-[50%] bg-slate-400 z-0 transition-all duration-500"
				style={{ right: isDoorOpen ? -50 : 0 }}></div>
		</div>
	);
};

export default Car;
