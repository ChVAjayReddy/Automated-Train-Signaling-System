import React from "react";
import Station from "./Station.jsx";
import TrackCell from "./TrackCell.jsx";
import Track from "./Track.jsx";

const Simulation = () => {
  return (
    <div className="border-2 border-blue-800 col-start-1 col-end-4 grid grid-cols-4 grid-rows-3">
      <Track />
      <Track />
      <Track />
      <Station />
      <Track />
      <Station />
      <Track />
      <Track />
      <Track />
      <Track />
      <Track />
      <Station />
    </div>
  );
};

export default Simulation;
