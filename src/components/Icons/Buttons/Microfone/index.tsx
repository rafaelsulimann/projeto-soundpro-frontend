type Props = {
  simbolColor: string;
  className: string;
};

export default function MicrofoneButton({simbolColor, className}: Props) {
  return (
    <svg
      width="31"
      height="46"
      viewBox="0 0 31 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6.01953 43.5H16.0195M26.0195 43.5H16.0195M16.0195 43.5V37.5"
        stroke={simbolColor}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <rect
        x="9.5"
        y="2"
        width="12"
        height="27"
        rx="6"
        stroke={simbolColor}
        strokeWidth="4"
      />
      <path
        d="M2 18C2.00896 42 29 42 29 18"
        stroke={simbolColor}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
