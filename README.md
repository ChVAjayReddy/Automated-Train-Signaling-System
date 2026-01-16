//Colors
Background: #0f172a (dark blue)
Track: #334155
Green: #22c55e
Yellow: #eab308
Red: #ef4444
Text: #e5e7eb
⚠️ What Is Still NOT Professional (Very Important)

Now the critical part 👇
This is where recruiters silently judge.

❌ 1️⃣ Tracks look like “icons repeated”, not “infrastructure”

Right now:

Tracks look flat & uniform

No visual hierarchy

Same color everywhere

Recruiter thought:

“Looks like icons placed on canvas, not a live system.”

❌ 2️⃣ Stations are not visually prominent

Your “Station A” text:

Blends into background

No container

No emphasis

In real systems, stations are important entities.

❌ 3️⃣ Right-side panel is EMPTY (wasted opportunity)

That empty blue-bordered area is a 🚨 big missed chance.

Recruiters expect:

Details

Status

Controls

Logs

Empty panel = unfinished system.

❌ 4️⃣ No sense of “state”

Everything looks static:

No occupied tracks

No active train

No signal influence

A signalling system must show state clearly.

🔥 How to Make THIS Look RECRUITER-LEVEL
✅ 1️⃣ Improve Track Visuals (Small change, BIG impact)

Do this:

Base track: light grey

Active track: blue

Occupied track: amber

Blocked track: red

Example idea:

.track {
color: #94a3b8;
}
.track.active {
color: #38bdf8;
}
.track.occupied {
color: #f59e0b;
}

💡 Even without trains, color change = state awareness

✅ 2️⃣ Make Stations Look Like Stations

Instead of plain text:

┌──────────────┐
│ 🚉 Station A │
│ Platforms: 2 │
│ Status: OK │
└──────────────┘

Light background

Rounded card

Small icon

This instantly upgrades professionalism.

✅ 3️⃣ Use the Right Panel PROPERLY (VERY IMPORTANT)

Your right panel should show something like:

Train Details Panel

Train ID: TR-102
Current Track: 3
Speed: 60 km/h
Next Station: Station A
Signal Status: GREEN

OR

System Logs

[19:21] Train entered Track 2
[19:22] Signal changed to RED
[19:23] Station A occupied

👉 This is what turns it into a monitoring dashboard.

✅ 4️⃣ Add ONE Moving Train (Enough!)

You don’t need many trains.

Just ONE animated train will:

Prove real-time logic

Prove state management

Prove React skill

Even a simple rectangle moving left → right is enough.

🧠 Recruiter Verdict (Honest)
Right now:

Score: 7 / 10

“Good idea, solid effort, needs polish.”

After suggested changes:

Score: 9 / 10

“Strong frontend engineer with system-thinking.”

🧭 What I Recommend You Do NEXT (Order Matters)

1️⃣ Add train + occupied track highlighting
2️⃣ Convert Station label → station card
3️⃣ Populate right panel with real data
4️⃣ Slightly soften track colors
5️⃣ Remove unnecessary borders (use spacing instead)

//
import React, { useEffect, useState } from "react";
import Station from "./Station";
import Track from "./Track";

const Simulation = () => {
let trackdata = [
{
id: 0,
type: "non-station",
startPosition: 0,
lastPosition: 9,
previous: "Start",
currentPosition: -1,
next: 1,
signal: "green",
isTrainRunning: false,
isSectionBlocked: false,
},
{
id: 1,
type: "non-station",
startPosition: 0,
lastPosition: 9,
previous: 0,
next: 2,
currentPosition: -1,
signal: "green",
isTrainRunning: false,
isSectionBlocked: false,
},
{
id: 2,
type: "station",
startPosition: 0,
lastPosition: 1,
currentPosition: -1,
previous: 1,
signal: "red",
isTrainRunning: false,
isSectionBlocked: false,
next: [
{
type: "up-track",
startPosition: 0,
lastPosition: 6,
previous: 2,
next: 3,
currentPosition: -1,
signal: "red",
isTrainRunning: false,
isSectionBlocked: false,
},
{
type: "main-track",
startPosition: 0,
lastPosition: 6,
previous: 2,
next: 3,
signal: "red",
currentPosition: -1,
isTrainRunning: false,
isSectionBlocked: false,
},
{
type: "down-track",
startPosition: 0,
lastPosition: 6,
previous: 2,
next: 3,
signal: "red",
currentPosition: -1,
isTrainRunning: false,
isSectionBlocked: false,
},
],
},
{
id: 3,
type: "non-station",
startPosition: 0,
lastPosition: 9,
currentPosition: -1,
previous: 2,
next: 4,
signal: "green",
isTrainRunning: false,
isSectionBlocked: false,
},
{
id: 4,
type: "non-station",
startPosition: 0,
lastPosition: 9,
previous: 3,
next: 5,
currentPosition: -1,
signal: "green",
isTrainRunning: false,
isSectionBlocked: false,
},
{
id: 5,
type: "station",
startPosition: 0,
lastPosition: 1,
previous: 4,
currentPosition: -1,
signal: "red",
isTrainRunning: false,
isSectionBlocked: false,
next: [
{
type: "up-track",
startPosition: 0,
lastPosition: 6,
previous: 4,
next: 5,
signal: "red",
currentPosition: -1,
isTrainRunning: false,
isSectionBlocked: false,
},
{
type: "main-track",
startPosition: 0,
lastPosition: 6,
previous: 4,
next: 5,
currentPosition: -1,
signal: "red",
isTrainRunning: false,
isSectionBlocked: false,
},
{
type: "down-track",
startPosition: 0,
lastPosition: 6,
previous: 4,
next: 5,
signal: "red",
currentPosition: -1,
isTrainRunning: false,
isSectionBlocked: false,
},
],
},
{
id: 6,
type: "non-station",
startPosition: 0,
lastPosition: 9,
previous: 5,
next: 7,
currentPosition: -1,
signal: "green",
isTrainRunning: false,
isSectionBlocked: false,
},
{
id: 7,
type: "non-station",
startPosition: 0,
lastPosition: 9,
previous: 6,
next: "End",
currentPosition: -1,
signal: "green",
isTrainRunning: false,
isSectionBlocked: false,
},
];
const [track, settrack] = useState(trackdata);
function addtrain() {
let temp = track.map((station) =>
station.id === 0
? { ...station, isTrainRunning: true, currentPosition: 0 }
: station
);
settrack(temp);
}
function handleSignal(station) {
let temp = track.map((section) => {
if (section.id === station) {
return {
...section,
isSectionBlocked: section.isSectionBlocked ? false : true,
signal: section.signal === "green" ? "red" : "green",
};
} else {
return { ...section };
}
});
settrack(temp);
}
let trackline = [];
useEffect(() => {
const interval = setInterval(() => {
let nextStation = [];
let tempcurrentPosition = track.map((section) => {
if (section.isTrainRunning) {
if (section.currentPosition === 9) {
nextStation.push(section.next);
return { ...section, currentPosition: -1, isTrainRunning: false };
} else {
if (
section.isSectionBlocked === true &&
section.currentPosition === 0
) {
return { ...section, currentPosition: 0 };
}
if (section.currentPosition === -1) {
return { ...section };
} else {
return {
...section,
currentPosition: section.currentPosition + 1,
};
}
}
}
return section;
});
let tempUpdateStations = tempcurrentPosition.map((section) => {
if (nextStation.includes(section.id)) {
return { ...section, currentPosition: 0, isTrainRunning: true };
} else {
return { ...section };
}
});
console.log(tempUpdateStations);
let temprelease = [];
let tempBlockedTrack = tempUpdateStations.map((section) => {
if (section.currentPosition > 0) {
temprelease.push(section.id - 1);
return { ...section, isSectionBlocked: true, signal: "red" };
} else {
return { ...section, isSectionBlocked: false };
}
});

      let tempreleaseBlocked = tempBlockedTrack.map((section) => {
        if (temprelease.includes(section.id)) {
          return { ...section, isSectionBlocked: false, signal: "green" };
        } else {
          return { ...section };
        }
      });

      settrack(tempreleaseBlocked);
    }, 1000);
    return () => clearInterval(interval);

}, [track]);
for (let i = 0; i < track.length; i++) {
if (track[i].type === "station") {
if (
track[i].isTrainRunning === false &&
track[i].isSectionBlocked === false
) {
trackline.push(

<div>
<Station
              up={track[i].next[0].signal}
              main={track[i].next[1].signal}
              down={track[i].next[2].signal}
              pos={12}
              num={i}
              home={track[i].signal}
            />
</div>
);
}
} else {
if (
track[i].isTrainRunning === false &&
track[i].isSectionBlocked === false
) {
trackline.push(
<div>
<Track
              pos={12}
              signal={track[i].signal}
              station={i}
              handleSignal={handleSignal}
            />
</div>
);
}
if (
track[i].isTrainRunning === true &&
track[i].isSectionBlocked === false
) {
trackline.push(
<div>
<Track
              pos={track[i].currentPosition}
              signal={track[i].signal}
              station={i}
              handleSignal={handleSignal}
            />
</div>
);
}
if (
track[i].isTrainRunning === true &&
track[i].isSectionBlocked === true
) {
trackline.push(
<div>
<Track
              pos={track[i].currentPosition}
              signal={track[i].signal}
              station={i}
              handleSignal={handleSignal}
            />
</div>
);
}
if (
track[i].isTrainRunning === false &&
track[i].isSectionBlocked === true
) {
trackline.push(
<div>
<Track
              pos={track[i].currentPosition}
              signal={track[i].signal}
              station={i}
              handleSignal={handleSignal}
            />
</div>
);
}
}
}
return (
<>
{trackline}
<button onClick={() => addtrain()}>add train</button>
</>
);
};

export default Simulation;

///
{num === 2 || num === 5 || num === 8 || num === 11
? stationLayout.map((row, i) =>
i === 3? (

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
///
