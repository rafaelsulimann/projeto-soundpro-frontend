type Props = {
  simbolColor: string;
  className: string;
};

export default function VolumeButton({ simbolColor, className }: Props) {
  return (
    <svg
      width="28"
      height="33"
      viewBox="0 0 28 33"
      fill={simbolColor}
      stroke={simbolColor}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M23 12C27.6667 12 27.6667 21 23 21"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M2.5 10.9979H6.5L17.8904 2.23792C18.548 1.73215 19.5 2.20098 19.5 3.03061V29.9689C19.5 30.7986 18.5478 31.2674 17.8902 30.7614L6.5 21.9979H2.5C2.22386 21.9979 2 21.7741 2 21.4979V11.4979C2 11.2218 2.22386 10.9979 2.5 10.9979Z"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
