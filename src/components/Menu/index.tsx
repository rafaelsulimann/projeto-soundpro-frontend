import React from "react";
import { Container } from "./styles";
import { Link } from "react-router-dom";

type Props = {
  icon: React.ReactElement; // ReactElement é uma maneira de aceitar componentes React como propriedades.
  label: string;
  to: string;
};

export default function Menu({ icon, label, to }: Props) {
  return (
    <Link to={to} className="link">
      <Container>
        {icon}
        <p>{label}</p>
      </Container>
    </Link>
  );
}
