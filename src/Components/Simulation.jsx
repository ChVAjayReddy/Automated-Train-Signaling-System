import React, { useEffect, useState } from "react";
import Station from "./Station.jsx";
import TrackCell from "./TrackCell.jsx";
import Track from "./Track.jsx";
import Train from "./Train.jsx";
import { TbHomeSignal } from "react-icons/tb";

const Simulation = () => {
  const cells = [];
  let stations = [2, 5];

  const [stationsset, setstationsset] = useState(stations);
  const [runningStationIndex, setrunningStationIndex] = useState([]);
  const [runningPositionIndex, setrunningPositionIndex] = useState([]);
  const [blockedStations, setblockedStations] = useState([]);
  const [manualOverride, setmanualOverride] = useState([]);
  const [trains, settrains] = useState([]);
  const [traincounter, settraincounter] = useState(0);
  const [stationsojupdate, setstationsojupdate] = useState([
    {
      station: 2,
      stationLoopSignals: ["red", "red", "red"],
      homeSignal: "red",
      stationLoopOutSignals: ["red", "red", "red"],
    },
    {
      station: 5,
      stationLoopSignals: ["red", "red", "red"],
      homeSignal: "red",
      stationLoopOutSignals: ["red", "red", "red"],
    },
  ]);
  // const [trackline, settrackline] = useState([
  //   {
  //     id: 0,
  //     type: "track",
  //     status: "idle",
  //     pos: -1,
  //     signal: "green",
  //   },
  //   {
  //     id: 1,
  //     type: "track",
  //     status: "idle",
  //     pos: -1,
  //     signal: "green",
  //   },
  //   {
  //     id: 2,
  //     type: "station",
  //     name: "Station A",
  //     status: "idle",
  //     tracks: ["entry", "loop up", "loop down", "main"],
  //     pos: ["none", "none", "none", "none"],
  //     signal: ["red", "red", "red", "red"],
  //   },
  //   {
  //     id: 3,
  //     type: "track",
  //     status: "idle",
  //     pos: -1,
  //     signal: "green",
  //   },
  //   {
  //     id: 4,
  //     type: "track",
  //     status: "idle",
  //     pos: -1,
  //     signal: "green",
  //   },
  //   {
  //     id: 5,
  //     type: "station",
  //     status: "idle",
  //     tracks: ["entry", "loop up", "loop down", "main"],
  //     pos: ["none", "none", "none", "none"],
  //     signal: ["red", "red", "red", "red"],
  //   },
  //   {
  //     id: 6,
  //     type: "track",
  //     status: "idle",
  //     pos: -1,
  //     signal: "green",
  //   },
  //   {
  //     id: 7,
  //     type: "track",
  //     status: "idle",
  //     pos: -1,
  //     signal: "green",
  //   },
  //   {
  //     id: 8,
  //     type: "station",
  //     status: "idle",
  //     tracks: ["entry", "loop up", "loop down", "main"],
  //     pos: ["none", "none", "none", "none"],
  //     signal: ["red", "red", "red", "red"],
  //   },
  //   {
  //     id: 9,
  //     type: "track",
  //     status: "idle",
  //     pos: -1,
  //     signal: "green",
  //   },
  //   {
  //     id: 10,
  //     type: "track",
  //     status: "idle",
  //     pos: -1,
  //     signal: "green",
  //   },
  //   {
  //     id: 11,
  //     type: "track",
  //     status: "idle",
  //     tracks: ["entry", "loop up", "loop down", "main"],
  //     pos: ["none", "none", "none", "none"],
  //     signal: ["red", "red", "red", "red"],
  //   },
  // ]);
  function addtrain() {
    let traincountertemp = traincounter + 1;
    settraincounter(traincountertemp);
    settrains((prevtrains) => [...prevtrains, traincountertemp]);
    setrunningStationIndex((prevrunningStationIndex) => [
      ...prevrunningStationIndex,
      0,
    ]);
    setrunningPositionIndex((prevrunningPositionIndex) => [
      ...prevrunningPositionIndex,
      0,
    ]);
  }
  function handleSignal(station, signal) {
    if (signal === "green") {
      setmanualOverride((prevmanualOverride) => [
        ...prevmanualOverride,
        station,
      ]);
    } else {
      let temp = manualOverride.filter((stationid) => stationid !== station);
      setmanualOverride(temp);
    }
  }
  function updateStationObject(station, signalType, color) {
    let temp = stationsojupdate.map((stations) =>
      stations.station === station
        ? { ...stations, homeSignal: color === "green" ? "red" : "green" }
        : stations
    );

    setstationsojupdate(temp);
    if (stationsset.includes(station)) {
      let tempstation = stationsset.filter((num) => num != station);
      setstationsset(tempstation);
    } else {
      setstationsset((prevstationsset) => [...prevstationsset, station]);
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      let indexes = [];
      let temp = runningPositionIndex.map((pos, index) => {
        if (pos === 0) {
          if (
            manualOverride.includes(runningStationIndex[index]) ||
            blockedStations.includes(runningStationIndex[index]) ||
            stationsset.includes(runningStationIndex[index])
          ) {
            pos === 0;
          } else {
            pos = pos + 1;
          }
        } else if (pos === 9) {
          indexes.push(index);
          pos = 0;
        } else {
          pos = pos + 1;
        }
        return pos;
      });
      setrunningPositionIndex(temp);
      let updaterunningstations = runningStationIndex.map((station, index) =>
        indexes.includes(index) ? station + 1 : station
      );
      setrunningStationIndex(updaterunningstations);
      let blocked = updaterunningstations.map((station, index) =>
        temp[index] > 0 ? station : station - 1
      );

      setblockedStations(blocked);
      let tempstationsset = stationsojupdate.map((station, index) => {
        if (updaterunningstations.includes(station.station)) {
          let posindex = updaterunningstations.indexOf(station.station);
          if (temp[posindex] > 0) {
            return { ...station, homeSignal: "red" };
          } else {
            return station;
          }
        } else {
          return station;
        }
      });
      setstationsojupdate(tempstationsset);
    }, 1000);
    return () => clearInterval(interval);
  }, [
    runningPositionIndex,
    runningStationIndex,
    blockedStations,
    manualOverride,
    stationsset,
    stationsojupdate,
  ]);

  for (let i = 0; i < 8; i++) {
    if (stations.includes(i)) {
      let temp = stationsojupdate.filter((stations) => stations.station == i);
      if (runningStationIndex.includes(i)) {
        let stationindex = runningStationIndex.indexOf(i);
        cells.push(
          <div key={i}>
            <Station
              num={i}
              pos={runningPositionIndex[stationindex]}
              home={temp[0].homeSignal}
              up={temp[0].stationLoopOutSignals[0]}
              main={temp[0].stationLoopOutSignals[1]}
              down={temp[0].stationLoopOutSignals[1]}
            />
          </div>
        );
      } else {
        let temp = stationsojupdate.filter((stations) => stations.station == i);
        cells.push(
          <div key={i}>
            <Station
              num={i}
              pos={12}
              home={temp[0].homeSignal}
              up={temp[0].stationLoopOutSignals[0]}
              main={temp[0].stationLoopOutSignals[1]}
              down={temp[0].stationLoopOutSignals[1]}
            />
          </div>
        );
      }
    } else {
      if (runningStationIndex.includes(i)) {
        if (blockedStations.includes(i) || manualOverride.includes(i)) {
          let stationindex = runningStationIndex.indexOf(i);
          cells.push(
            <div key={i} className="grid items-center">
              <Track
                pos={runningPositionIndex[stationindex]}
                signal={"red"}
                station={i}
                handleSignal={handleSignal}
              />
            </div>
          );
        } else {
          let stationindex = runningStationIndex.indexOf(i);
          cells.push(
            <div key={i} className="grid items-center">
              <Track
                pos={runningPositionIndex[stationindex]}
                signal={"green"}
                station={i}
                handleSignal={handleSignal}
              />
            </div>
          );
        }
      } else {
        if (blockedStations.includes(i) || manualOverride.includes(i)) {
          let stationindex = runningStationIndex.indexOf(i);
          cells.push(
            <div key={i} className="grid items-center">
              <Track
                pos={runningPositionIndex[stationindex]}
                signal={"red"}
                station={i}
                handleSignal={handleSignal}
              />
            </div>
          );
        } else {
          cells.push(
            <div key={i} className="grid items-center">
              <Track
                pos={12}
                signal={"green"}
                station={i}
                handleSignal={handleSignal}
              />
            </div>
          );
        }
      }
    }
  }

  return (
    <>
      <div className="border-2 border-blue-800 col-start-1 col-end-4 grid grid-cols-4 grid-rows-3">
        {cells}
      </div>
      <div className="flex flex-col gap-10">
        <button
          style={{
            height: "20px",
            width: "20px",
          }}
          onClick={() => addtrain()}
        >
          add train
        </button>
        <div className="">
          {stationsojupdate.map((station, index) => (
            <div key={index}>
              <p>Station No {index + 1}</p>
              {runningStationIndex.includes(station.station - 1)
                ? "Train entering station Please give signal"
                : "Nill"}
              <p>Loop Signals</p>
              <div className="flex gap-1">
                {station.stationLoopSignals.map((signal, index) => (
                  <button
                    key={index}
                    style={{
                      backgroundColor: signal,
                      height: "20px",
                      width: "20px",
                      borderRadius: "10%",
                    }}
                  ></button>
                ))}
              </div>
              <p>Home Signal </p>
              <button
                onClick={() =>
                  updateStationObject(
                    station.station,
                    "home",
                    station.homeSignal
                  )
                }
                style={{
                  backgroundColor: station.homeSignal,
                  height: "20px",
                  width: "20px",
                }}
              ></button>
              <p>Out Loop Signals</p>
              <div className="flex gap-1">
                {station.stationLoopOutSignals.map((signal, index) => (
                  <button
                    key={index}
                    style={{
                      backgroundColor: signal,
                      height: "20px",
                      width: "20px",
                    }}
                  ></button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Simulation;
