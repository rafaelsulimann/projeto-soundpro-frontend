type Props = {
  simbolColor: string;
  className: string;
};

export default function EqualizerButton({simbolColor, className}: Props) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8 34.5V45.5"
        stroke={simbolColor}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M23 2V13"
        stroke={simbolColor}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M40 35V46"
        stroke={simbolColor}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M8 2V20.5"
        stroke={simbolColor}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M40 2V20.5"
        stroke={simbolColor}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M23 27V45.5"
        stroke={simbolColor}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <rect y="25" width="16" height="10" rx="5" fill={simbolColor} />
      <rect x="15" y="12" width="16" height="10" rx="5" fill={simbolColor} />
      <rect x="32" y="25" width="16" height="10" rx="5" fill={simbolColor} />
    </svg>
  );
}
