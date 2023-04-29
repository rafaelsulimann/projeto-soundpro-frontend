type Props = {
    fill: string;
    className: string;
}

export default function HomeIcon({fill, className}: Props) {
  return (
    <svg
      width="64"
      height="66"
      viewBox="0 0 64 66"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M20.5 66H4C1.79086 66 0 64.2091 0 62V23.6982C0 22.0142 0.847727 20.4433 2.25536 19.5189L30.1272 1.21494C32.1666 -0.124343 34.8139 -0.0953565 36.8234 1.28827L61.8355 18.5097C63.1906 19.4427 64 20.9827 64 22.6279V62C64 64.2091 62.2091 66 60 66H43.5C41.2909 66 39.5 64.2091 39.5 62V56V49C39.5 47.3431 38.1569 46 36.5 46H27.5C25.8431 46 24.5 47.3431 24.5 49V56V62C24.5 64.2091 22.7091 66 20.5 66Z" />
    </svg>
  );
}
