import { Container } from "./styles";

type Props = {
    fill: string;
    className: string;
}

export default function LogoIcon({fill, className}: Props) {
    return(
      <Container>
        <svg
            width="156"
            height="105"
            viewBox="0 0 156 105"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
            className={className}
          >
            <rect x="32" width="12" height="105" rx="6" className="rect"/>
            <rect x="112" width="12" height="105" rx="6" className="rect"/>
            <rect x="96" y="16" width="12" height="74" rx="6" className="rect"/>
            <rect x="128" y="16" width="12" height="74" rx="6" className="rect"/>
            <rect x="48" y="16" width="12" height="74" rx="6" className="rect"/>
            <rect x="16" y="16" width="12" height="74" rx="6" className="rect"/>
            <rect x="80" y="24" width="12" height="58" rx="6" className="rect"/>
            <rect x="64" y="32" width="12" height="42" rx="6" className="rect"/>
            <rect y="32" width="12" height="42" rx="6" className="rect"/>
            <rect x="144" y="32" width="12" height="42" rx="6" className="rect"/>
          </svg>
      </Container>
    );
}