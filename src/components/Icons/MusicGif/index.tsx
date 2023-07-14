import PathSvg from "./path";

type Props = {
  stroke: string;
  className: string;
};

export default function MusicGifIcon({ stroke, className }: Props) {

  return (
    <svg
    width="56"
    height="45"
    viewBox="0 0 56 45"
    fill="none"
    stroke={stroke}
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <PathSvg widthPosition={3} heightPosition={40} maxHeight={43}/>
    <PathSvg widthPosition={13} heightPosition={30} maxHeight={43}/>
    <PathSvg widthPosition={23} heightPosition={20} maxHeight={43}/>
    <PathSvg widthPosition={33} heightPosition={10} maxHeight={43}/>
    <PathSvg widthPosition={43} heightPosition={0} maxHeight={43}/>
  </svg>
  );
}
