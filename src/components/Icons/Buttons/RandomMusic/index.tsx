type Props = {
  backgroundColor: string;
  simbolColor: string;
  className: string;
};

export default function RandomMusicButton({
  backgroundColor,
  simbolColor,
  className,
}: Props) {
  return (
    <svg
      width="73"
      height="73"
      viewBox="0 0 73 73"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="36.5" cy="36.5" r="36.5" fill={backgroundColor} />
      <path
        d="M39.9091 44.1007C38.8045 44.1007 37.9091 44.9961 37.9091 46.1007C37.9091 47.2053 38.8045 48.1007 39.9091 48.1007V44.1007ZM29.9756 44.1007H27V48.1007H29.9756V44.1007ZM23 40.1007V29H19V40.1007H23ZM27 25H47V21H27V25ZM51 29V40.1007H55V29H51ZM47 44.1007H39.9091V48.1007H47V44.1007ZM51 40.1007C51 42.3098 49.2091 44.1007 47 44.1007V48.1007C51.4183 48.1007 55 44.519 55 40.1007H51ZM47 25C49.2091 25 51 26.7909 51 29H55C55 24.5817 51.4183 21 47 21V25ZM23 29C23 26.7909 24.7909 25 27 25V21C22.5817 21 19 24.5817 19 29H23ZM27 44.1007C24.7909 44.1007 23 42.3098 23 40.1007H19C19 44.519 22.5817 48.1007 27 48.1007V44.1007Z"
        fill={simbolColor}
      />
      <path
        d="M42.4561 40.8496L37.4375 45.6802C37.3977 45.7186 37.3966 45.7821 37.4351 45.8218L42.4561 50.9999"
        stroke={simbolColor}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
