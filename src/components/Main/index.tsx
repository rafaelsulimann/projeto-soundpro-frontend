import { Outlet } from "react-router-dom";
import './styles.scss'
import Sounds from "../Sounds";

export default function Main() {
    return (
        <main className="main-container">
            <section className="sounds-section">
                <Sounds />
            </section>
            <Outlet />
        </main>
    );
}