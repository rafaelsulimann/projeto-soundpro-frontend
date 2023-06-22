import { useEffect, useRef, useState } from "react";
import { HOVER_TIMEOUT } from "../../../../utils/constants";
import { createPopper } from "@popperjs/core";

type Props = {
  simbolColor: string;
  divClassName: string;
  iconClassName: string;
};

export default function MicrofoneButton({
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
              offset: [-37, -86],
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
          width="31"
          height="46"
          viewBox="0 0 31 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={iconClassName}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
      </div>
      {showBox && (
        <div ref={boxRef} className="box-hover">
          Microfone
        </div>
      )}
    </>
  );
}
