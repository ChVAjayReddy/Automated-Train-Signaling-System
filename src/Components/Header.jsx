import React from "react";

const Header = () => {
  return (
    <>
      <header className="bg-slate-900 text-slate-100 px-6 py-3 flex justify-between items-center border-b border-slate-700">
        <div>
          <h1 className="text-xl font-semibold">
            🚆 Smart Train Signalling System
          </h1>
          <p className="text-sm text-slate-400">
            Real-Time Monitoring Dashboard
          </p>
        </div>

        <div className="flex gap-4 items-center">
          <span className="px-3 py-1 text-sm bg-green-600/20 text-green-400 rounded-full">
            System Online
          </span>
          <span className="px-3 py-1 text-sm bg-blue-600/20 text-blue-400 rounded-full">
            Auto Mode
          </span>
        </div>

        <div className="text-sm text-slate-300">
          {new Date().toLocaleTimeString()}
        </div>
      </header>
    </>
  );
};

export default Header;
