type Props = {
    fill: string;
    className: string;
}

export default function SearchIcon({fill, className}: Props) {
  return (
    <svg
      width="86"
      height="86"
      viewBox="0 0 86 86"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="35.5" cy="35.5" r="35.5" />
      <path d="M65.6348 57.6933C66.0328 57.3104 66.6659 57.3226 67.0488 57.7206L81.2711 72.5027C83.5686 74.8906 83.4953 78.6889 81.1074 80.9864L80.4009 81.6661C78.013 83.9636 74.2147 83.8903 71.9172 81.5024L57.6949 66.7203C57.312 66.3223 57.3242 65.6893 57.7222 65.3064L65.6348 57.6933Z" />
    </svg>
  );
}
