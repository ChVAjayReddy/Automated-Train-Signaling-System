import React from "react";
import TrackCell from "./TrackCell.jsx";
import Train from "./Train.jsx";
import { PiTrafficSignalFill } from "react-icons/pi";
const Track = ({ pos }) => {
  const stationLayout = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
  return (
    <div className="flex items-center relative align-middle">
      <div className="flex">
        {stationLayout.map((cellType, index) =>
          index === pos ? <Train /> : <TrackCell key={index} type={cellType} />
        )}
      </div>
      <button className="absolute -top-1/3 right-0">
        <PiTrafficSignalFill style={{ color: "green" }} />
      </button>
    </div>
  );
};
export default Track;
