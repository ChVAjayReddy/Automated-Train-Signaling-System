import React, { useEffect, useState } from "react";
import Station from "./Station.jsx";
import TrackCell from "./TrackCell.jsx";
import Track from "./Track.jsx";
import Train from "./Train.jsx";

const Simulation = () => {
  const cells = [];
  const stationsindex = [2, 5, 8, 11];
  const tracksindex = [0, 1, 3, 4, 6, 7, 9, 10];
  const [runningStationIndex, setrunningStationIndex] = useState([0]);
  const [runningPositionIndex, setrunningPositionIndex] = useState([0]);

  const [stations, setstations] = useState([
    {
      id: 0,
      type: "track",
      status: "idle",
      pos: "none",
      signal: "green",
    },
    {
      id: 1,
      type: "track",
      status: "idle",
      pos: "none",
      signal: "green",
    },
    {
      id: 2,
      type: "station",
      name: "Station A",
      status: "idle",
      tracks: ["entry", "loop up", "loop down", "main"],
      pos: ["none", "none", "none", "none"],
      signal: ["red", "red", "red", "red"],
    },
    {
      id: 3,
      type: "track",
      status: "idle",
      pos: "none",
      signal: "green",
    },
    {
      id: 4,
      type: "track",
      status: "idle",
      pos: "none",
      signal: "green",
    },
    {
      id: 5,
      type: "track",
      status: "idle",
      tracks: ["entry", "loop up", "loop down", "main"],
      pos: ["none", "none", "none", "none"],
      signal: ["red", "red", "red", "red"],
    },
    {
      id: 6,
      type: "track",
      status: "idle",
    },
    {
      id: 7,
      type: "track",
      status: "idle",
      pos: "none",
      signal: "green",
    },
    {
      id: 8,
      type: "track",
      status: "idle",
      tracks: ["entry", "loop up", "loop down", "main"],
      pos: ["none", "none", "none", "none"],
      signal: ["red", "red", "red", "red"],
    },
    {
      id: 9,
      type: "track",
      status: "idle",
      pos: "none",
      signal: "green",
    },
    {
      id: 10,
      type: "track",
      status: "idle",
      pos: "none",
      signal: "green",
    },
    {
      id: 11,
      type: "track",
      status: "idle",
      tracks: ["entry", "loop up", "loop down", "main"],
      pos: ["none", "none", "none", "none"],
      signal: ["red", "red", "red", "red"],
    },
  ]);
  useEffect(() => {
    const interval = setInterval(() => {
      let indexes = [];
      let temp = runningPositionIndex.map((pos, index) => {
        if (pos === 9) {
          pos = 0;
          indexes.push(index);
        } else {
          pos = pos + 1;
        }
        return pos;
      });
      setrunningPositionIndex(temp);
      let stationIndexes = runningStationIndex.map((stationPos, index) => {
        if (indexes[index] === index) {
          stationPos = stationPos + 1;
          return stationPos;
        } else {
          return stationPos;
        }
      });
      setrunningStationIndex(stationIndexes);

      console.log(
        "Position Indexes:",
        runningPositionIndex[0],
        runningStationIndex[0]
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [runningPositionIndex, runningStationIndex]);

  for (let i = 0; i < 12; i++) {
    if (i == 2 || i === 5 || i === 8 || i === 11) {
      runningStationIndex.includes(i)
        ? cells.push(
            <div key={i} pos={runningPositionIndex[0]}>
              <Station num={i} pos={runningPositionIndex[0]} />
            </div>
          )
        : cells.push(
            <div key={i}>
              <Station num={i} pos={12} />
            </div>
          );
    } else {
      runningStationIndex.includes(i)
        ? cells.push(
            <div key={i} className="grid items-center">
              <Track pos={runningPositionIndex[0]} />
            </div>
          )
        : cells.push(
            <div key={i} className="grid items-center">
              <Track pos={12} />
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
