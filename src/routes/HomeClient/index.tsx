import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import MusicPlayerBar from "../../components/MusicPlayerBar";
import Principal from "../../components/Principal";

export default function HomeClient() {
  return (
    <>
      <Principal/>
      <MusicPlayerBar />
    </>
  );
}
