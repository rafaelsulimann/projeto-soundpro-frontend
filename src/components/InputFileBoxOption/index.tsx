import { useState } from "react";

type Props = {
  optionTextName: string;
  iconSrc?: any;
  iconAltName?: string;
  className?: string;
  imgClassName?: string;
  onFunctionChange?: any;
  dataName?: string;
  labelDivClassName: string;
  labelClassName: string;
  optionTextClassName: string;
};

export default function InputFileBoxOption({
  optionTextName,
  iconSrc,
  iconAltName,
  className,
  imgClassName,
  onFunctionChange,
  dataName,
  labelDivClassName,
  labelClassName,
  optionTextClassName,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const bgHovered = isHovered ? "#2d2d35" : "transparent";

  function handleClick(event: any) {
    event.stopPropagation();
    onFunctionChange(event);
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={
        className != null && className != "" ? className : "option-div"
      }
      style={{ background: bgHovered }}
    >
      {iconSrc && (
        <img
          className={
            imgClassName != null && imgClassName != ""
              ? imgClassName
              : "option-box-icon"
          }
          src={iconSrc}
          alt={iconAltName}
        />
      )}
      <div data-name={dataName} className={labelDivClassName}>
        <label htmlFor="file-upload" className={labelClassName}>
          <p className={optionTextClassName}>{optionTextName}</p>
          <input
            id="file-upload"
            type="file"
            onChange={(event) => {
              handleClick(event);
            }}
          />
        </label>
      </div>
    </div>
  );
}
