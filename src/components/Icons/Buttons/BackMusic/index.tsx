import { createPopper } from "@popperjs/core";
import { useEffect, useRef, useState } from "react";
import { HOVER_TIMEOUT } from "../../../../utils/constants";

type Props = {
  backgroundColor: string;
  simbolColor: string;
  divClassName: string;
  iconClassName: string;
};

export default function BackMusicButton({
  backgroundColor,
  simbolColor,
  divClassName,
  iconClassName,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [showBox, setShowBox] = useState(false);
  const botaoRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsHovered(true);
      setShowBox(true);
    }, HOVER_TIMEOUT);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(false);
    setShowBox(false);
  };

  useEffect(() => {
    if (isHovered && botaoRef.current && boxRef.current) {
      createPopper(botaoRef.current, boxRef.current, {
        placement: "bottom-start",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [-13, -74],
            },
          },
        ],
      });
    }
  }, [isHovered]);
  return (
    <>
      <div ref={botaoRef} className={divClassName}>
        <svg
          width="102"
          height="102"
          viewBox="0 0 102 102"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={iconClassName}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <circle
            cx="51"
            cy="51"
            r="51"
            transform="matrix(-1 0 0 1 102 0)"
            fill={backgroundColor}
          />
          <g filter="url(#filter0_ii_816_169)">
            <circle
              cx="43.9073"
              cy="43.9073"
              r="43.9073"
              transform="matrix(-1 0 0 1 94.5684 7.43164)"
              fill={backgroundColor}
            />
          </g>
          <path
            d="M68 64.9193V37.362C68 35.6511 65.9912 34.73 64.6948 35.8466L47.8543 50.3504C46.8961 51.1756 46.9347 52.6719 47.9342 53.4466L64.7747 66.5C66.0889 67.5187 68 66.5821 68 64.9193Z"
            fill={simbolColor}
          />
          <rect
            width="6"
            height="33"
            rx="2"
            transform="matrix(-1 0 0 1 41 35)"
            fill={simbolColor}
          />
          <defs>
            <filter
              id="filter0_ii_816_169"
              x="6.75391"
              y="7.43164"
              width="87.8145"
              height="87.8145"
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
              <feGaussianBlur stdDeviation="3.37748" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.311111 0 0 0 0 0.317593 0 0 0 0 0.35 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect1_innerShadow_816_169"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="3.37748" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.309804 0 0 0 0 0.31634 0 0 0 0 0.34902 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="effect1_innerShadow_816_169"
                result="effect2_innerShadow_816_169"
              />
            </filter>
          </defs>
        </svg>
      </div>
      {showBox && (
        <div ref={boxRef} className="box-hover">
          Voltar
        </div>
      )}
    </>
  );
}
