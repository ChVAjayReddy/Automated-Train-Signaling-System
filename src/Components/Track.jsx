import React from "react";
import TrackCell from "./TrackCell.jsx";
import { PiTrafficSignalFill } from "react-icons/pi";
const Track = () => {
  const stationLayout = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4];

  return (
    <div className="grid items-center relative">
      <div className="flex">
        {stationLayout.map((cellType, index) => (
          <TrackCell key={index} type={cellType} />
        ))}
      </div>
      <button className="absolute top-1/3 right-0">
        <PiTrafficSignalFill style={{ color: "green" }} />
      </button>
    </div>
  );
};
export default Track;
