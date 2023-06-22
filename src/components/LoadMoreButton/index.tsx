import "./styles.scss";

type Props = {
  onClick?: any;
}

export default function LoadMoreButton({onClick} : Props) {
  return (
    <div className="container load-more-button-container">
      <div className="load-more-button">
        <input type="button" value="Carregar mais" onClick={onClick}/>
      </div>
    </div>
  );
}