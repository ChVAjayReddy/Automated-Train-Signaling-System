import { LuTrainTrack } from "react-icons/lu";
const TrackCell = ({ type }) => {
  const TRACK = {
    EMPTY: 0,
    HORIZONTAL: 1,
    VERTICAL: 2,
    CURVE: 3,
    DIAGONAL: 4,
  };

  if (type === TRACK.EMPTY) return <div className="w-7 h-7" />;
  const rotationMap = {
    [TRACK.HORIZONTAL]: "rotate(0deg)",
    [TRACK.VERTICAL]: "rotate(90deg)",
    [TRACK.DIAGONAL]: "rotate(45deg)",
  };

  return (
    <LuTrainTrack
      size={28}
      style={{ transform: rotationMap[type] }}
      className="text-slate-400"
    />
  );
};
export default TrackCell;
