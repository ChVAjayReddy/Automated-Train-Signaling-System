import React from "react";
import TrackCell from "./TrackCell.jsx";
import { PiTrafficSignalFill } from "react-icons/pi";
import Train from "./Train.jsx";
const Station = ({ trainPosition, home, up, down, main }) => {
  const stationLayout = [
    [0, 0, 0, 0, 4, 4, 4, 4, 4, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 2],
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 4, 4, 4, 4, 4, 0],
  ];

  return (
    <div className="relative">
      {stationLayout.map((tracks, index) => (
        <div key={index} className="flex">
          {index === 2
            ? tracks.map((track, i) => (
                <div key={index + i} className="flex ">
                  {trainPosition === i ? (
                    <Train></Train>
                  ) : (
                    <TrackCell type={track} />
                  )}
                </div>
              ))
            : tracks.map((track, i) => (
                <div key={index + i} className="flex ">
                  <TrackCell type={track} />
                </div>
              ))}
        </div>
      ))}
      <p className="absolute bottom-15 left-0 right-0 text-center">Station</p>
      <button className="absolute  right-1/9 -top-2.5">
        <PiTrafficSignalFill style={{ color: down }} />
      </button>
      <button className="absolute top-1/3 right-1/9">
        <PiTrafficSignalFill style={{ color: main }} />
      </button>
      <button className="absolute top-4/5 right-1/9 ">
        <PiTrafficSignalFill style={{ color: up }} />
      </button>
      <button className="absolute top-1/3 left-2/9">
        <PiTrafficSignalFill style={{ color: home }} />
      </button>
    </div>
  );
};
export default Station;
