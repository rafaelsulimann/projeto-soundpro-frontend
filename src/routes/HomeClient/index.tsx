import MusicPlayerBar from "../../components/MusicPlayerBar";
import Principal from "../../components/Principal";

export default function HomeClient() {
  return (
    <>
      <div className="home-client">
        <Principal/>
        <MusicPlayerBar />
      </div>
    </>
  );
}
