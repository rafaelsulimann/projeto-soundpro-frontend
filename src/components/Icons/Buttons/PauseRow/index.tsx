type Props = {
  simbolColor: string;
  className: string;
  onClick: any;
  blobSrc: string;
  liked: boolean;
};

export default function PauseRowButton({
  simbolColor,
  className,
  onClick,
  blobSrc,
  liked,
}: Props) {
  return (
    <svg
      width="38"
      height="41"
      viewBox="0 0 38 41"
      fill={simbolColor}
      xmlns="http://www.w3.org/2000/svg"
      onClick={(event: any) => onClick(event, blobSrc, liked)}
      className={className}
    >
      <rect width="14" height="41" rx="7" />
      <rect x="24" width="14" height="41" rx="7" />
    </svg>
  );
}
