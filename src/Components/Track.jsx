import React from "react";
import TrackCell from "./TrackCell.jsx";
import Train from "./Train.jsx";
import { PiTrafficSignalFill } from "react-icons/pi";
const Track = ({ trainPosition, signal, section, handleSignal }) => {
  const stationLayout = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
  return (
    <div className="flex items-center relative align-middle">
      <div className="flex">
        {stationLayout.map((cellType, index) =>
          index === trainPosition ? (
            <div key={index}>
              <Train />
            </div>
          ) : (
            <div key={index}>
              <TrackCell key={index} type={cellType} />
            </div>
          )
        )}
      </div>
      <button
        className="absolute top-1/3 right-0"
        onClick={() => handleSignal(section)}
      >
        <PiTrafficSignalFill style={{ color: signal }} />
      </button>
    </div>
  );
};
export default Track;
