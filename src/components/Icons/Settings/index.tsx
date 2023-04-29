type Props = {
  fill: string;
  className: string;
};

export default function SettingsIcon({ fill, className }: Props) {
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
        y="16"
        width="31"
        height="9"
        rx="3"
        fill="rgba(0, 0, 0, 0.8)"
      />
      <rect
        x="26"
        y="31"
        width="31"
        height="9"
        rx="3"
        fill="rgba(0, 0, 0, 0.8)"
      />
      <rect
        x="26"
        y="45"
        width="31"
        height="9"
        rx="3"
        fill="rgba(0, 0, 0, 0.8)"
      />
      <circle cx="17" cy="50" r="5" fill="rgba(0, 0, 0, 0.8)" />
      <circle cx="17" cy="35" r="5" fill="rgba(0, 0, 0, 0.8)" />
      <circle cx="17" cy="20" r="5" fill="rgba(0, 0, 0, 0.8)" />
    </svg>
  );
}
