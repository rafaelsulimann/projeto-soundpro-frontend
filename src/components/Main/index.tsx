import { Outlet } from "react-router-dom";
import { Container } from "./styles";

export default function Main() {
  return (
    <Container className="main-container">
      <Outlet />
    </Container>
  );
}
