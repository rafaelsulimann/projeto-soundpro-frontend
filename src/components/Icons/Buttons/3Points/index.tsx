type Props = {
  simbolColor: string;
  className: string;
};

export default function Points3Button({simbolColor, className}: Props) {
  return (
    <svg
      width="6"
      height="26"
      viewBox="0 0 6 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle
        cx="3"
        cy="3"
        r="2.75"
        fill={simbolColor}
        stroke="#121215"
        stroke-width="0.5"
      />
      <circle
        cx="3"
        cy="23"
        r="2.75"
        fill={simbolColor}
        stroke="#121215"
        stroke-width="0.5"
      />
      <circle
        cx="3"
        cy="13"
        r="2.75"
        fill={simbolColor}
        stroke="#121215"
        stroke-width="0.5"
      />
    </svg>
  );
}
