type Props = {
  fill: string;
  className: string;
};

export default function ArtistsIcon({fill, className}: Props) {
  return (
    <svg
      width="86"
      height="70"
      viewBox="0 0 86 70"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M25 40C25 33.9249 29.9249 29 36 29H50C56.0751 29 61 33.9249 61 40V66C61 68.2091 59.2091 70 57 70H29C26.7909 70 25 68.2091 25 66V40Z" />
      <path d="M0 46.5C0 40.701 4.70101 36 10.5 36H19C20.1046 36 21 36.8954 21 38V68C21 69.1046 20.1046 70 19 70H10.5C4.70101 70 0 65.299 0 59.5V46.5Z" />
      <path d="M86 46.5C86 40.701 81.299 36 75.5 36H67C65.8954 36 65 36.8954 65 38V68C65 69.1046 65.8954 70 67 70H75.5C81.299 70 86 65.299 86 59.5V46.5Z" />
      <circle cx="42" cy="14" r="14" />
      <circle cx="17" cy="23" r="11" />
      <circle cx="67" cy="23" r="11" />
    </svg>
  );
}