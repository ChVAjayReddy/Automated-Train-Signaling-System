import React from "react";
import TrackCell from "./TrackCell.jsx";
import Train from "./Train.jsx";
import { PiTrafficSignalFill } from "react-icons/pi";
const Track = ({ pos, signal, station, handleSignal }) => {
  const stationLayout = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
  return (
    <div className="flex items-center relative align-middle">
      <div className="flex" key={pos}>
        {stationLayout.map((cellType, index) =>
          index === pos ? (
            <div key={index}>
              <Train key={station} />
            </div>
          ) : (
            <div key={index}>
              <TrackCell key={index} type={cellType} />
            </div>
          )
        )}
      </div>
      <button
        className="absolute -top-1/3 left-0"
        onClick={() => handleSignal(station, signal)}
      >
        <PiTrafficSignalFill style={{ color: signal }} />
      </button>
    </div>
  );
};
export default Track;
