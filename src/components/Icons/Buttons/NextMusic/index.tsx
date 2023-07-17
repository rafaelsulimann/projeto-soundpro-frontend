import { createPopper } from "@popperjs/core";
import { HOVER_TIMEOUT } from "../../../../utils/constants";
import { useEffect, useRef, useState } from "react";

type Props = {
  backgroundColor: string;
  simbolColor: string;
  iconClassName: string;
  divClassName: string;
};

export default function NextMusicButton({
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
              offset: [-20, -75],
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
          <circle cx="51" cy="51" r="51" fill={backgroundColor} />
          <g filter="url(#filter0_ii_816_170)">
            <circle
              cx="51.3389"
              cy="51.3389"
              r="43.9073"
              fill={backgroundColor}
            />
          </g>
          <path
            d="M34 64.9193V37.362C34 35.6511 36.0088 34.73 37.3052 35.8466L54.1457 50.3504C55.1039 51.1756 55.0653 52.6719 54.0658 53.4466L37.2253 66.5C35.9111 67.5187 34 66.5821 34 64.9193Z"
            fill={simbolColor}
          />
          <rect x="61" y="35" width="6" height="33" rx="2" fill={simbolColor} />
          <defs>
            <filter
              id="filter0_ii_816_170"
              x="7.43164"
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
                result="effect1_innerShadow_816_170"
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
                in2="effect1_innerShadow_816_170"
                result="effect2_innerShadow_816_170"
              />
            </filter>
          </defs>
        </svg>
      </div>
      {showBox && (
        <div ref={boxRef} className="box-hover">
          Avançar
        </div>
      )}
    </>
  );
}
