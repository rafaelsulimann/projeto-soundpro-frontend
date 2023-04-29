import { Outlet } from "react-router-dom";
import "./styles.scss";

export default function Main() {
  return (
    <main className="main-container">
      <Outlet />
    </main>
  );
}
