type Props = {
    simbolColor: string;
    className: string;
    onClick: any;
    blobSrc: string;
    liked: boolean;
}

export default function PlayRowButton({simbolColor, className, onClick, blobSrc, liked}: Props) {
  return (
    <svg
      width="58"
      height="70"
      viewBox="0 0 58 70"
      fill={simbolColor}
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => onClick(blobSrc, liked)}
      className={className}
    >
      <path d="M0 66.7981V2.81699C0 0.615093 2.4159 -0.732909 4.2896 0.423591L56.122 32.414C57.903 33.5129 57.903 36.1018 56.122 37.2007L4.2897 69.1911C2.4159 70.3471 0 69.0001 0 66.7981Z" />
    </svg>
  );
}
