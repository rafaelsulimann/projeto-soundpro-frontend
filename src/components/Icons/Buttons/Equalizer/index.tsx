import { useEffect, useRef, useState } from "react";
import { HOVER_TIMEOUT } from "../../../../utils/constants";
import { createPopper } from "@popperjs/core";

type Props = {
  simbolColor: string;
  divClassName: string;
  iconClassName: string;
};

export default function EqualizerButton({
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
              offset: [-30, -86],
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
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={iconClassName}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
          <rect
            x="15"
            y="12"
            width="16"
            height="10"
            rx="5"
            fill={simbolColor}
          />
          <rect
            x="32"
            y="25"
            width="16"
            height="10"
            rx="5"
            fill={simbolColor}
          />
        </svg>
      </div>
      {showBox && (
        <div ref={boxRef} className="box-hover">
          Equalizar
        </div>
      )}
    </>
  );
}
