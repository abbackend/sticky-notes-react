const Plus = ({ size = 24, color = "#FFFFFF", className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      stroke={color}
      fill="none"
      strokeWidth="2.5"
      className={className}
    >
      <path strokeLinecap="round" d="M18 12H6M12 6v12"></path>
    </svg>
  );
};

export default Plus;
