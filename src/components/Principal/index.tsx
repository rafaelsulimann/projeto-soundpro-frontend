import Aside from "../Aside";
import Main from "../Main";
import "./styles.scss";

export default function Principal() {
  return (
    <>
      <div className="principal-container">
        <Aside />
        <Main />
      </div>
    </>
  );
}
