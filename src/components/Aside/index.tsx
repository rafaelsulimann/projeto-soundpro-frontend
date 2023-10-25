import Logo from "../Logo";
import MenuList from "../MenuList";
import { Container } from "./styles";

export default function Aside() {
  return (
    <Container>
      <Logo fill="var(--purple-color)" className="logoImg" />
      <MenuList />
    </Container>
  );
}
