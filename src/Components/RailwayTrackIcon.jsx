const RailwayTrackIcon = ({ width = 200 }) => (
  <svg
    width={width}
    height="24"
    viewBox="0 0 200 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Rails */}
    <line x1="0" y1="6" x2="200" y2="6" stroke="#475569" strokeWidth="2" />
    <line x1="0" y1="18" x2="200" y2="18" stroke="#475569" strokeWidth="2" />

    {/* Sleepers */}
    {[...Array(20)].map((_, i) => (
      <line
        key={i}
        x1={i * 10}
        y1="6"
        x2={i * 10}
        y2="18"
        stroke="#64748b"
        strokeWidth="1"
      />
    ))}
  </svg>
);

export default RailwayTrackIcon;
