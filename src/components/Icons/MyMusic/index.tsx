type Props = {
  fill: string;
  className: string;
};

export default function MyMusicIcon({ fill, className }: Props) {
  return (
    <svg
      width="69"
      height="69"
      viewBox="0 0 69 69"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="69" height="69" rx="14" />
      <rect
        x="26"
        y="13"
        width="6"
        height="43"
        rx="2"
        fill="rgba(0, 0, 0, 0.8)"
      />
      <rect
        x="48"
        y="21"
        width="6"
        height="35"
        rx="2"
        fill="rgba(0, 0, 0, 0.8)"
      />
      <rect
        x="37"
        y="35"
        width="6"
        height="21"
        rx="2"
        fill="rgba(0, 0, 0, 0.8)"
      />
      <rect
        x="15"
        y="28"
        width="6"
        height="28"
        rx="2"
        fill="rgba(0, 0, 0, 0.8)"
      />
    </svg>
  );
}
