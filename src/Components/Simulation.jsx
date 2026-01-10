import React, { useEffect, useState } from "react";
import Station from "./Station.jsx";
import TrackCell from "./TrackCell.jsx";
import Track from "./Track.jsx";
import Train from "./Train.jsx";

const Simulation = () => {
  const cells = [];
  const stations = [2, 6, 9, 12];
  const tracks = [1, 2, 4, 5, 7, 8, 10, 11];
  const [runningStationIndex, setrunningStationIndex] = useState([0]);
  const [runningPositionIndex, setrunningPositionIndex] = useState([0]);

  useEffect(() => {
    const interval = setInterval(() => {
      let temp = runningPositionIndex.map((pos) => (pos === 9 ? 0 : pos + 1));
      setrunningPositionIndex(temp);
    }, 1000);
    return () => clearInterval(interval);
  }, [runningPositionIndex]);

  for (let i = 0; i < 12; i++) {
    if (i == 2 || i === 5 || i === 8 || i === 11) {
      cells.push(
        <div key={i}>
          <Station num={i} />
        </div>
      );
    } else {
      runningStationIndex.includes(i)
        ? cells.push(
            <div key={i} className="grid items-center">
              <Track position={runningPositionIndex[0]} />
            </div>
          )
        : cells.push(
            <div key={i} className="grid items-center">
              <Track position={10} />
            </div>
          );
    }
  }

  return (
    <div className="border-2 border-blue-800 col-start-1 col-end-4 grid grid-cols-4 grid-rows-3">
      {cells}
    </div>
  );
};

export default Simulation;
