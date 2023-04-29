type Props = {
    simbolColor: string;
    className: string;
}

export default function WaveIcon({simbolColor, className}: Props) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="10" width="4" height="24" rx="2" fill={simbolColor} />
      <rect x="15" y="5" width="4" height="14" rx="2" fill={simbolColor} />
      <rect x="5" y="5" width="4" height="14" rx="2" fill={simbolColor} />
      <rect y="9" width="4" height="6" rx="2" fill={simbolColor} />
      <rect x="20" y="9" width="4" height="6" rx="2" fill={simbolColor} />
    </svg>
  );
}
