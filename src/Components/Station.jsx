import React from "react";
import TrackCell from "./TrackCell.jsx";
import { PiTrafficSignalFill } from "react-icons/pi";
import Train from "./Train.jsx";
const Station = ({ num, pos }) => {
  const stationLayout = [
    [0, 0, 0, 0, 0, 4, 4, 4, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 2, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 2],
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 2, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 4, 4, 4, 0, 0],
  ];

  return (
    <div className="relative">
      {num === 2 || num === 5 || num === 8 || num === 11
        ? stationLayout.map((row, i) =>
            i === 3 ? (
              <div key={i} className="flex ">
                {row.map((cell, j) =>
                  j === pos ? (
                    <Train />
                  ) : (
                    <TrackCell key={j} type={cell} num={i} val={j} />
                  )
                )}
              </div>
            ) : (
              <div key={i} className="flex ">
                {row.map((cell, j) => (
                  <TrackCell key={j} type={cell} num={i} val={j} />
                ))}
              </div>
            )
          )
        : stationLayout.map((row, i) => (
            <div key={i} className="flex ">
              {row.map((cell, j) => (
                <TrackCell key={j} type={cell} num={i} val={j} />
              ))}
            </div>
          ))}
      <p className="absolute bottom-15 left-0 right-0 text-center">
        Station {num}
      </p>
      <button className="absolute  right-1/5 -top-2.5">
        <PiTrafficSignalFill style={{ color: "red" }} />
      </button>
      <button className="absolute top-1/3 right-1/5">
        <PiTrafficSignalFill style={{ color: "red" }} />
      </button>
      <button className="absolute top-4/5 right-1/5">
        <PiTrafficSignalFill style={{ color: "red" }} />
      </button>
      <button className="absolute top-1/3 right-7/10">
        <PiTrafficSignalFill style={{ color: "red" }} />
      </button>
    </div>
  );
};
export default Station;
