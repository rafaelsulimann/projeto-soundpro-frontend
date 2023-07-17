import { useEffect, useRef, useState } from "react";
import { HOVER_TIMEOUT } from "../../../../utils/constants";
import { createPopper } from "@popperjs/core";

type Props = {
  backgroundColor: string;
  simbolColor: string;
  iconClassName: string;
  divClassName: string;
};

export default function RandomMusicButton({
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
              offset: [-70, -73],
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
          width="73"
          height="73"
          viewBox="0 0 73 73"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={iconClassName}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <circle cx="36.5" cy="36.5" r="36.5" fill={backgroundColor} />
          <path
            d="M44.8965 39.1523L50.7474 43.5088C50.8777 43.6059 50.885 43.7986 50.7623 43.9052L44.8965 49.0007"
            stroke={simbolColor}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M22 27.0312H23.6674C24.5461 27.0312 25.3807 27.4165 25.9506 28.0852L29.2492 31.9554"
            stroke={simbolColor}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M47.1777 44.0762H42.34C41.2841 44.0762 40.2711 43.6587 39.5218 42.9148L37.2577 40.6671"
            stroke={simbolColor}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M45.6523 24L50.766 27.9889C50.8869 28.0832 50.8976 28.2622 50.7888 28.3702L45.6523 33.4696"
            stroke={simbolColor}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M48.3261 28.5469H42.1491C40.984 28.5469 39.8768 29.0549 39.1169 29.9381L25.8677 45.3372C25.1078 46.2204 24.0006 46.7284 22.8355 46.7284H22"
            stroke={simbolColor}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {showBox && (
        <div ref={boxRef} className="box-hover">
          Ativar a ordem aleatória
        </div>
      )}
    </>
  );
}
