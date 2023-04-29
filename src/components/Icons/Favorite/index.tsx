type Props = {
  fill: string;
  className: string;
};

export default function FavoriteIcon({fill, className}: Props) {
  return (
    <svg
      width="82"
      height="72"
      viewBox="0 0 82 72"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M39.8052 10.7945C24.8398 -19.2109 -42.6276 17.2773 41.3406 71.7896C122.373 17.283 57.8374 -19.2129 39.8052 10.7945Z" />
    </svg>
  );
}
