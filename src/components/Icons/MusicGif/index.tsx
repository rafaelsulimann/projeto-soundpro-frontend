type Props = {
  stroke: string;
  className: string;
};

export default function MusicGifIcon({ stroke, className }: Props) {
  return (
    <svg
      width="56"
      height="45"
      viewBox="0 0 56 45"
      fill="none"
      stroke={stroke}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M3 20V43" strokeWidth="5" />
      <path d="M33 20V43" strokeWidth="5" />
      <path d="M23 24V43" strokeWidth="5" />
      <path d="M53 0V45" strokeWidth="5" />
      <path d="M43 7V43" strokeWidth="5" />
      <path d="M13 7V43" strokeWidth="5" />
    </svg>
  );
}
