/* eslint-disable react/prop-types */
const Car = ({
	id,
	floorNo,
	assignedFloor,
	stopTime,
	isDoorOpen,
	countdown,
}) => {
	return (
		<div
			id={`car-${id}`}
			className={`w-full h-[54px] border-4 border-slate-500/80 bg-slate-100 text-slate-500 flex flex-col items-center justify-center transition-all ease-in-out absolute overflow-hidden shadow-lg`}
			style={{
				bottom: floorNo || 6,
				transitionDuration: `${stopTime}s`,
			}}>
			<div className="absolute top-0 left-0 z-10 w-full h-full shadow-inner"></div>
			<small className="text-[10px]">EV-{id}</small>
			<small className="text-[10px]">FL-{assignedFloor + 1}</small>

			<div
				className="absolute top-0 h-full w-[50%] flex items-start justify-center bg-slate-400 z-0 transition-all duration-[1s] shadow-inner overflow-hidden after:content-['*'] after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:w-[150%] after:h-[150%] bg-gradient-to-b from-white/50 via-transparent to-transparent after:rotate-45 after:origin-center"
				style={{ left: isDoorOpen ? -50 : 0 }}>
				<span className="text-[10px] text-slate-500">{countdown}</span>
			</div>
			<div
				className="absolute top-0 right-0 border-l border-l-slate-500 h-full w-[50%] bg-slate-400 z-0 transition-all duration-[1s] after:content-['*'] after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:w-[150%] after:h-[150%] bg-gradient-to-b from-white/50 via-transparent to-transparent after:rotate-45 after:origin-center"
				style={{ right: isDoorOpen ? -50 : 0 }}></div>
		</div>
	);
};

export default Car;
