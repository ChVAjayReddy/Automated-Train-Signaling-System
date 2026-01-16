import React, { useState, useEffect } from "react";
import Train from "./Train";
import SignleTrack from "./SignleTrack";
import { PiTrafficSignalFill } from "react-icons/pi";

const Simulation = () => {
  const [runningPositins, setrunningPositins] = useState([]);
  const [runningStations, setrunningStations] = useState([]);
  const [automaticBlockedStations, setautomaticBlockedStations] = useState([]);
  const [manualBlockedStations, setmanualBlockedStations] = useState([]);
  let stations = [2, 5];
  const [trainatstation, settrainatstation] = useState([]);
  const [stationobj, setstationobj] = useState([
    {
      id: 2,
      home: "red",
      homestatus: false,
      up: "red",
      upstatus: false,
      main: "red",
      mainstatus: false,
      down: "red",
      downstatus: false,
      upouter: "red",
      upstatusouter: false,
      mainouter: "red",
      mainstatusouter: false,
      downouter: "red",
      downstatusouter: false,
      homeposition: -1,
      upposition: -1,
      mainposition: -1,
      downposition: -1,
    },
    {
      id: 5,
      home: "red",
      homestatus: false,
      up: "red",
      upstatus: false,
      main: "red",
      mainstatus: false,
      down: "red",
      downstatus: false,
      upouter: "red",
      upstatusouter: false,
      mainouter: "red",
      mainstatusouter: false,
      downouter: "red",
      downstatusouter: false,
      homeposition: -1,
      upposition: -1,
      mainposition: -1,
      downposition: -1,
    },
  ]);
  function addTrain() {
    setrunningPositins((prevrunningPositins) => [...prevrunningPositins, 0]);
    setrunningStations((prevrunningStations) => [...prevrunningStations, 0]);
  }
  function handleSignal(i) {
    if (automaticBlockedStations.includes(i)) return;
    if (manualBlockedStations.includes(i)) {
      let remove = manualBlockedStations.filter((station) => station != i);
      setmanualBlockedStations(remove);
    } else {
      setmanualBlockedStations((prevmanualBlockedStations) => [
        ...prevmanualBlockedStations,
        i,
      ]);
    }
  }
  function handleStationSignal(statinno, signal, color) {
    if (signal === "home") {
      let temp = stationobj.filter((station) => station.id === statinno);
      console.log(temp);
      if (temp[0].upstatus || temp[0].mainstatus || temp[0].downstatus) {
        let tempobj = stationobj.map((station) =>
          station.id === statinno
            ? { ...station, home: "green", homestatus: true }
            : station
        );
        setstationobj(tempobj);
      } else {
        alert("first select up or main or down signal then select home signal");
      }
    }
    if (signal === "up") {
      let tempobj = stationobj.map((station) =>
        station.id === statinno
          ? { ...station, up: "green", upstatus: true }
          : station
      );
      setstationobj(tempobj);
    }
    if (signal === "main") {
      let tempobj = stationobj.map((station) =>
        station.id === statinno
          ? { ...station, main: "green", mainstatus: true }
          : station
      );
      setstationobj(tempobj);
    }
    if (signal === "down") {
      let tempobj = stationobj.map((station) =>
        station.id === statinno
          ? { ...station, down: "green", downstatus: true }
          : station
      );
      setstationobj(tempobj);
    }
    if (signal === "upouter") {
      let tempobj = stationobj.map((station) =>
        station.id === statinno
          ? { ...station, upouter: "green", upstatusouter: true }
          : station
      );
      setstationobj(tempobj);
    }
    if (signal === "mainouter") {
      let tempobj = stationobj.map((station) =>
        station.id === statinno
          ? { ...station, mainouter: "green", mainstatusouter: true }
          : station
      );
      setstationobj(tempobj);
    }
    if (signal === "downouter") {
      let tempobj = stationobj.map((station) =>
        station.id === statinno
          ? { ...station, downouter: "green", downstatusouter: true }
          : station
      );
      setstationobj(tempobj);
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      let stationstobeupdated = [];
      let againupdaterunningStations = [];
      let updaterunningPositins = runningPositins.map((position, index) => {
        if (position === 9) {
          if (
            automaticBlockedStations.includes(runningStations[index]) ||
            manualBlockedStations.includes(runningStations[index])
          ) {
            return 9;
          } else {
            stationstobeupdated.push(index);
            return 0;
          }
        } else {
          return position + 1;
        }
      });
      let updaterunningStations = runningStations.map((station, index) => {
        if (stationstobeupdated.includes(index)) {
          return station + 1;
        } else {
          return station;
        }
      });
      setrunningStations(updaterunningStations);

      if (
        trainatstation.includes(2) &&
        (stationobj[0].upstatus ||
          stationobj[0].mainstatus ||
          stationobj[0].downstatus) &&
        stationobj[0].homestatus
      ) {
        if (stationobj[0].upstatus) {
          if (stationobj[0].upposition === -1) {
            let updatestationobj = stationobj.map((station) => {
              if (station.id === 2) {
                return { ...station, upposition: 1 };
              } else {
                return station;
              }
            });
            setstationobj(updatestationobj);
          } else {
            let updatestationobj = stationobj.map((station) => {
              if (station.id === 2) {
                return {
                  ...station,
                  upposition: station.upposition + 1,
                  homeposition: -1,
                };
              } else {
                return station;
              }
            });
            setstationobj(updatestationobj);
          }
        }
        if (stationobj[0].mainstatus) {
          if (stationobj[0].mainposition === 0) {
            let updatestationobj = stationobj.map((station) => {
              if (station.id === 2) {
                return { ...station, homeposition: 1 };
              } else {
                return station;
              }
            });
            setstationobj(updatestationobj);
          } else {
            let updatestationobj = stationobj.map((station) => {
              if (station.id === 2) {
                return {
                  ...station,
                  homeposition: station.homeposition + 1,
                };
              } else {
                return station;
              }
            });
            setstationobj(updatestationobj);
          }
        }
        if (stationobj[0].downstatus) {
          if (stationobj[0].downposition === -1) {
            let updatestationobj = stationobj.map((station) => {
              if (station.id === 2) {
                return { ...station, downposition: 1 };
              } else {
                return station;
              }
            });
            setstationobj(updatestationobj);
          } else {
            let updatestationobj = stationobj.map((station) => {
              if (station.id === 2) {
                return {
                  ...station,
                  downposition: station.downposition + 1,
                  homeposition: -1,
                };
              } else {
                return station;
              }
            });
            setstationobj(updatestationobj);
          }
        }
      }
      if (updaterunningStations.includes(2)) {
        let updatestationobj = stationobj.map((station) => {
          if (station.id === 2) {
            return { ...station, homeposition: 0 };
          } else {
            return station;
          }
        });
        settrainatstation((prevtrainatstation) => [...prevtrainatstation, 2]);
        againupdaterunningStations = updaterunningStations.filter(
          (station) => station != 2
        );
        setrunningStations(againupdaterunningStations);
        setstationobj(updatestationobj);
      }

      if (updaterunningStations.includes(5)) {
        let updatestationobj = stationobj.map((station) => {
          if (station.id === 5) {
            return { ...station, homeposition: 0 };
          } else {
            return { ...station };
          }
        });
        setstationobj(updatestationobj);
        settrainatstation((prevtrainatstation) => [...prevtrainatstation, 5]);
        againupdaterunningStations = updaterunningStations.filter(
          (station) => station != 5
        );
        setrunningStations(againupdaterunningStations);
      }
      let updateautomaticBlockedStations = updaterunningStations.map(
        (station) => station - 1
      );
      setrunningPositins(updaterunningPositins);

      setautomaticBlockedStations(updateautomaticBlockedStations);
    }, 100);
    return () => clearInterval(interval);
  }, [
    runningPositins,
    runningStations,
    automaticBlockedStations,
    manualBlockedStations,
    stationobj,
    trainatstation,
  ]);
  let trainPosition = [];
  for (let i = 0; i < 8; i++) {
    if (stations.includes(i)) {
      let data = stationobj.filter((station) => station.id === i);
      let structure = [];
      for (let k = 0; k < 3; k++) {
        let track = [];
        if (k === 0) {
          for (let i = 0; i < 10; i++) {
            if (i === 0 || i == 9) {
              track.push("empty");
            } else {
              if (data[0].upposition === i) {
                track.push("train");
              } else {
                track.push("track");
              }
            }
          }
          structure.push(track);
        }
        if (k === 1) {
          for (let i = 0; i < 10; i++) {
            if (data[0].homeposition === i) {
              track.push("train");
            } else {
              track.push("track");
            }
          }
          structure.push(track);
        }

        if (k === 2) {
          for (let i = 0; i < 10; i++) {
            if (i === 0 || i == 9) {
              track.push("empty");
            } else {
              if (data[0].downposition === i) {
                track.push("train");
              } else {
                track.push("track");
              }
            }
          }
          structure.push(track);
        }
      }
      trainPosition.push(structure);
    } else {
      let Position = runningStations.includes(i)
        ? runningPositins[runningStations.indexOf(i)]
        : undefined;
      let temp = [];
      for (let j = 0; j < 10; j++) {
        if (j === Position) {
          temp.push("train");
        } else {
          temp.push("track");
        }
      }
      trainPosition.push(temp);
    }
  }

  return (
    <div className="border-2 border-blue-800 col-start-1 col-end-4 grid grid-cols-4 grid-rows-3">
      {trainPosition.map((station, index) => (
        <div className="flex relative">
          {stations.includes(index) ? (
            <div className="flex flex-col">
              {station.map((track, index) => (
                <div className="flex" key={index}>
                  {track.map((status, index) => (
                    <div key={index}>
                      {status === "track" ? (
                        <SignleTrack />
                      ) : status === "train" ? (
                        <Train />
                      ) : (
                        <div className="w-7 h-7" />
                      )}
                    </div>
                  ))}
                </div>
              ))}

              <button
                className="absolute  left-0 top-1/5"
                onClick={() =>
                  handleStationSignal(
                    index,
                    "home",
                    stationobj.filter((station) => station.id === index)[0].home
                  )
                }
              >
                <PiTrafficSignalFill
                  color={
                    stationobj.filter((station) => station.id === index)[0].home
                  }
                />
              </button>
              <button
                className="absolute -top-1/5 right-1/10"
                onClick={() =>
                  handleStationSignal(
                    index,
                    "upouter",
                    stationobj.filter((station) => station.id === index)[0]
                      .upouter
                  )
                }
              >
                <PiTrafficSignalFill
                  color={
                    stationobj.filter((station) => station.id === index)[0]
                      .upouter
                  }
                />
              </button>
              <button
                className="absolute top-1/4 right-1/10"
                onClick={() =>
                  handleStationSignal(
                    index,
                    "mainouter",
                    stationobj.filter((station) => station.id === index)[0]
                      .mainouter
                  )
                }
              >
                <PiTrafficSignalFill
                  color={
                    stationobj.filter((station) => station.id === index)[0]
                      .mainouter
                  }
                />
              </button>
              <button
                className="absolute top-3/5 right-1/10"
                onClick={() =>
                  handleStationSignal(
                    index,
                    "downouter",
                    stationobj.filter((station) => station.id === index)[0]
                      .downouter
                  )
                }
              >
                <PiTrafficSignalFill
                  color={
                    stationobj.filter((station) => station.id === index)[0]
                      .downouter
                  }
                />
              </button>
              <button
                className="absolute -top-1/5 right-5/10"
                onClick={() =>
                  handleStationSignal(
                    index,
                    "up",
                    stationobj.filter((station) => station.id === index)[0].up
                  )
                }
              >
                <PiTrafficSignalFill
                  color={
                    stationobj.filter((station) => station.id === index)[0].up
                  }
                />
              </button>
              <button
                className="absolute top-1/4 right-5/10"
                onClick={() =>
                  handleStationSignal(
                    index,
                    "main",
                    stationobj.filter((station) => station.id === index)[0].main
                  )
                }
              >
                <PiTrafficSignalFill
                  color={
                    stationobj.filter((station) => station.id === index)[0].main
                  }
                />
              </button>
              <button
                className="absolute top-3/5 right-5/10"
                onClick={() =>
                  handleStationSignal(
                    index,
                    "down",
                    stationobj.filter((station) => station.id === index)[0].down
                  )
                }
              >
                <PiTrafficSignalFill
                  color={
                    stationobj.filter((station) => station.id === index)[0].down
                  }
                />
              </button>
            </div>
          ) : (
            <div key={index} className="flex self-center relative">
              {station.map((status, i) => (
                <div key={i}>
                  {status === "track" ? <SignleTrack /> : <Train />}
                </div>
              ))}
              <button
                className="absolute -top-2 right-0"
                onClick={() => handleSignal(index)}
              >
                <PiTrafficSignalFill
                  color={
                    automaticBlockedStations.includes(index) ||
                    manualBlockedStations.includes(index)
                      ? "red"
                      : "green"
                  }
                />
              </button>
            </div>
          )}
        </div>
      ))}
      <button onClick={() => addTrain()}>add train</button>
    </div>
  );
};

export default Simulation;
