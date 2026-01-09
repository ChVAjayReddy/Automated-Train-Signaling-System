import React from "react";
import Simulation from "./Simulation.jsx";
import Dashboard from "./Dashboard.jsx";

const Body = () => {
  return (
    <>
      <div className="grid grid-cols-4 gap-4 p-4">
        <Simulation />
        <Dashboard />
      </div>
    </>
  );
};

export default Body;
