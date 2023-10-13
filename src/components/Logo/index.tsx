import LogoIcon from "../Icons/LogoIcon";
import { Container } from "./styles";

type Props = {
    fill: string;
    className: string;
}

export default function Logo({ fill, className }: Props) {
  return (
    <Container>
        <LogoIcon fill={fill} className={className} />
        <h1>Sound Pro</h1>
    </Container>
  );
}
