type Props = {
  fill: string;
  className: string;
}

export default function AlbumsIcon({fill, className}: Props) {
  return (
    <svg
      width="75"
      height="74"
      viewBox="0 0 75 74"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect y="33" width="75" height="41" rx="8" />
      <rect x="8" y="22" width="59" height="7" rx="3" />
      <rect x="16" y="11" width="42" height="7" rx="3" />
      <rect x="26" width="23" height="7" rx="3" />
    </svg>
  );
}
