import { useEffect, useRef, useState } from "react";
import { HOVER_TIMEOUT } from "../../../../utils/constants";
import { createPopper } from "@popperjs/core";

type Props = {
  backgroundColor: string;
  simbolColor: string;
  divClassName: string;
  iconClassName: string;
  onClick: any;
};

export default function StopMusicButton({
  backgroundColor,
  simbolColor,
  divClassName,
  iconClassName,
  onClick,
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
              offset: [-10, -80],
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
          width="151"
          height="151"
          viewBox="0 0 151 151"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={iconClassName}
          onClick={onClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <circle cx="75.5" cy="75.5" r="75.5" fill={backgroundColor} />
          <g filter="url(#filter0_ii_816_172)">
            <circle cx="76" cy="76" r="65" fill={backgroundColor} />
          </g>
          <rect
            x="58"
            y="56"
            width="12"
            height="39"
            rx="6"
            fill="white"
            stroke={simbolColor}
            strokeWidth="2"
          />
          <rect
            x="82"
            y="56"
            width="12"
            height="39"
            rx="6"
            fill="white"
            stroke={simbolColor}
            strokeWidth="2"
          />
          <defs>
            <filter
              id="filter0_ii_816_172"
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
                result="effect1_innerShadow_816_172"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="5" />
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
                in2="effect1_innerShadow_816_172"
                result="effect2_innerShadow_816_172"
              />
            </filter>
          </defs>
        </svg>
      </div>
      {showBox && (
        <div ref={boxRef} className="box-hover">
          Pausar
        </div>
      )}
    </>
  );
}
