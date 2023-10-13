import { Outlet } from "react-router-dom";
import { Container } from "./styles";

export default function Main() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}
