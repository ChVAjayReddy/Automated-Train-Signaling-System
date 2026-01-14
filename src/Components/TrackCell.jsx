import { LuTrainTrack } from "react-icons/lu";
const TrackCell = ({ type, num, val }) => {
  const TRACK = {
    EMPTY: 0,
    HORIZONTAL: 1,
    VERTICAL: 2,
    CURVE: 3,
    DIAGONAL: 4,
  };

  if (
    type === TRACK.EMPTY &&
    (num === 1 || num === 2 || num === 4 || num === 5)
  ) {
    if (
      val === 0 ||
      val === 1 ||
      val === 2 ||
      val === 3 ||
      (num === 5 && val === 9) ||
      (num === 1 && val === 9)
    ) {
      return <div className="w-7 h-7" />;
    } else {
      return <div className="w-7 h-7" />;
      // return <div className="w-7 h-7 border-2 border-amber-400" />;
    }
  }

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
