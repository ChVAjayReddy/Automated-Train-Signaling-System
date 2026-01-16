import React, { useEffect, useState } from "react";
import Station from "./Station";
import Track from "./Track";

const Simulation = () => {
  const [runningPositions, setrunningPositions] = useState([]);
  const [runningStations, setrunningStations] = useState([]);
  let emptyTrack = [0, 1, 3, 4, 6, 7];
  let stationTrack = [2, 5];
  const [stations, setstations] = useState([
    {
      id: 2,
      home: "red",
      homestatus: false,
      loop: ["red", "red", "red"],

      loopstatus: [false, false, false],
      outer: ["red", "red", "red"],
    },
    {
      id: 5,
      home: "red",
      homestatus: false,
      loop: ["red", "red", "red"],
      loopstatus: [false, false, false],
      outer: ["red", "red", "red"],
    },
  ]);
  const [automaticBlockedStations, setautomaticBlockedStations] = useState([]);
  const [manualBlockedStations, setmanualBlockedStations] = useState([]);
  const [trainscount, settrainscount] = useState(0);
  const [trainid, settrainid] = useState([]);
  const [stationsblocked, setstationsblocked] = useState([2, 5]);
  let track = [];
  function addTrain() {
    if (runningStations.includes(0)) {
      alert(
        "Can't enter the train, as train is already running in the same section"
      );
      return;
    }
    let temp = trainscount + 1;
    settrainscount(temp);
    settrainid((trainid) => [...trainid, temp]);
    setrunningPositions((prevrunningPositions) => [...prevrunningPositions, 0]);
    setrunningStations((prevrunningStations) => [...prevrunningStations, 1]);
  }

  function handleSignal(section) {
    if (manualBlockedStations.includes(section)) {
      let temp = manualBlockedStations.filter(
        (sectionno) => sectionno != section
      );
      setmanualBlockedStations(temp);
    } else {
      setmanualBlockedStations((manualBlockedStations) => [
        ...manualBlockedStations,
        section,
      ]);
    }
  }
  function handleStationSignals(stationId, signalType, signalId = 4) {
    if (signalType === "home") {
      let temp = stations.map((station, index) =>
        station.id === stationId
          ? {
              ...station,
              home: station.home === "red" ? "green" : "red",
              homestatus: station.homestatus ? false : true,
            }
          : station
      );
      console.log(temp);
      setstations(temp);
      let removestation = temp
        .filter((station) => station.homestatus === false)
        .map((station) => station.id);
      console.log(removestation);
      setstationsblocked(removestation);
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      let nextStation = [];
      let updaterunningPositions = runningPositions.map((position, index) => {
        if (stationTrack.includes(runningStations[index])) {
          if (position === 2) {
            if (stationsblocked.includes(runningStations[index])) {
              return 2;
            } else {
              return position + 1;
            }
          } else {
            if (position === 9) {
              nextStation.push(index);
              return 0;
            } else {
              if (position === 3) {
                if (runningStations[index] === 2) {
                  setstationsblocked((stationsblocked) => [
                    ...stationsblocked,
                    3,
                  ]);
                  let temp = stations.map((station, index) =>
                    station.id === runningStations[index]
                      ? {
                          ...station,
                          home: station.home === "red" ? "green" : "red",
                          homestatus: station.homestatus ? false : true,
                        }
                      : station
                  );

                  setstations(temp);
                }
                if (runningStations[index] === 5) {
                  setstationsblocked((stationsblocked) => [
                    ...stationsblocked,
                    5,
                  ]);
                  let temp = stations.map((station, index) =>
                    station.id === runningStations[index]
                      ? {
                          ...station,
                          home: station.home === "red" ? "green" : "red",
                          homestatus: station.homestatus ? false : true,
                        }
                      : station
                  );

                  setstations(temp);
                }
              }
              return position + 1;
            }
          }
        } else {
          if (position === 9) {
            if (
              automaticBlockedStations.includes(runningStations[index]) ||
              manualBlockedStations.includes(runningStations[index])
            ) {
              return 9;
            } else {
              nextStation.push(index);
              return 0;
            }
          } else {
            return position + 1;
          }
        }
      });
      setrunningPositions(updaterunningPositions);
      let updaterunningStations = runningStations.map((station, index) =>
        nextStation.includes(index)
          ? station + 1
          : automaticBlockedStations.includes(station) ||
            manualBlockedStations.includes(station)
          ? station
          : station
      );
      setrunningStations(updaterunningStations);
      let updateautomaticBlockedStations = updaterunningStations.map(
        (station) => station - 1
      );
      setautomaticBlockedStations(updateautomaticBlockedStations);
    }, 1000);
    return () => clearInterval(interval);
  }, [
    runningPositions,
    runningStations,
    automaticBlockedStations,
    manualBlockedStations,
    stationTrack,
    stationsblocked,
    stations,
  ]);
  for (let i = 0; i < 8; i++) {
    if (stationTrack.includes(i)) {
      let stationdata = stations.filter((station) => station.id === i);
      console.log(stationdata);
      if (runningStations.includes(i)) {
        let position = runningPositions[runningStations.indexOf(i)];
        track.push(
          <div key={i}>
            <Station
              trainPosition={position}
              home={stationdata[0].home}
              up={stationdata[0].outer[0]}
              down={stationdata[0].outer[2]}
              main={stationdata[0].outer[1]}
              section={i}
              handleSignal={handleSignal}
            />
          </div>
        );
      } else {
        track.push(
          <div key={i}>
            <Station
              home={stationdata[0].home}
              up={stationdata[0].outer[0]}
              down={stationdata[0].outer[2]}
              main={stationdata[0].outer[1]}
            />
          </div>
        );
      }
    } else {
      if (
        automaticBlockedStations.includes(i) ||
        manualBlockedStations.includes(i)
      ) {
        let position = runningPositions[runningStations.indexOf(i)];
        track.push(
          <div className="grid align-middle" key={i}>
            <Track
              trainPosition={position}
              signal="red"
              section={i}
              handleSignal={handleSignal}
            />
          </div>
        );
      } else if (runningStations.includes(i)) {
        let position = runningPositions[runningStations.indexOf(i)];
        track.push(
          <div className="grid align-middle" key={i}>
            <Track
              trainPosition={position}
              section={i}
              signal="green"
              handleSignal={handleSignal}
            />
          </div>
        );
      } else {
        track.push(
          <div className="grid align-middle" key={i}>
            <Track
              trainPosition={12}
              signal="green"
              section={i}
              handleSignal={handleSignal}
            />
          </div>
        );
      }
    }
  }

  return (
    <>
      <div className="border-2 border-blue-800 col-start-1 col-end-4 grid grid-cols-4 grid-rows-3 ">
        {track}
      </div>
      <button onClick={() => addTrain()}>Add Train</button>
      {stations.map((station) => (
        <div key={station.id}>
          <p>Station {station.id}</p>
          {station.loop.map((signal, index) => (
            <div key={index}>
              <button
                style={{
                  border: "1px solid black",
                  backgroundColor: signal,
                  width: "20PX",
                  height: "20PX",
                }}
              ></button>
            </div>
          ))}
          <p>Home</p>
          <button
            style={{
              border: "1px solid black",
              backgroundColor: station.home,
              width: "20PX",
              height: "20PX",
            }}
            onClick={() => handleStationSignals(station.id, "home")}
          ></button>
          <p>Outer</p>
          {station.outer.map((signal, index) => (
            <div key={index}>
              <button
                style={{
                  border: "1px solid black",
                  backgroundColor: signal,
                  width: "20PX",
                  height: "20PX",
                }}
              ></button>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Simulation;
