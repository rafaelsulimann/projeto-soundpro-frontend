type Props = {
  backgroundColor: string;
  simbolColor: string;
  className: string;
  onClick: any;
};

export default function PlayMusicButton({
  backgroundColor,
  simbolColor,
  className,
  onClick,
}: Props) {
  return (
    <svg
      width="151"
      height="151"
      viewBox="0 0 151 151"
      fill={simbolColor}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <circle cx="75.5" cy="75.5" r="75.5" fill={backgroundColor} />
      <g filter="url(#filter0_ii_818_182)">
        <circle cx="76" cy="76" r="65" fill={backgroundColor} />
      </g>
      <path d="M59 97.506V52.0409C59 49.839 61.4159 48.4911 63.2897 49.6475L100.122 72.3801C101.903 73.479 101.903 76.0679 100.122 77.1668L63.2897 99.8994C61.4159 101.056 59 99.7079 59 97.506Z" />
      <defs>
        <filter
          id="filter0_ii_818_182"
          x="11"
          y="11"
          width="130"
          height="130"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.311111 0 0 0 0 0.317593 0 0 0 0 0.35 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_818_182"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.309804 0 0 0 0 0.31634 0 0 0 0 0.34902 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow_818_182"
            result="effect2_innerShadow_818_182"
          />
        </filter>
      </defs>
    </svg>
  );
}
