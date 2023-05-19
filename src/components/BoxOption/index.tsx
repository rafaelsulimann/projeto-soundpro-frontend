import { useState } from "react";

type Props = {
  optionTextName: string;
  iconSrc: any;
  iconAltName: string;
  className?: string;
  imgClassName?: string;
  onFunctionClick: any;
};

export default function BoxOption({
  optionTextName,
  iconSrc,
  iconAltName,
  className,
  imgClassName,
  onFunctionClick,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const bgHovered = isHovered ? "#2d2d35" : "transparent";

  function handleClick() {
    onFunctionClick();
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={
        className != null && className != "" ? className : "option-div"
      }
      style={{ background: bgHovered }}
      onClick={handleClick}
    >
      <img
        className={
          imgClassName != null && imgClassName != ""
            ? imgClassName
            : "option-box-icon"
        }
        src={iconSrc}
        alt={iconAltName}
      />
      <p>{optionTextName}</p>
    </div>
  );
}
