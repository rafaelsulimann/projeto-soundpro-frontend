import { useContext, useEffect, useState } from "react";
import { AudioDTO } from "../../../models/audio";
import { ContextPlayer } from "../../../utils/context-player";
import SoundSampleRow from "../../../components/SoundSampleRow";
import * as soundService from "../../../services/sound-service";
import "./styles.scss";

export default function Sounds() {
  const { src, setSrc, isPlaying, setIsPlaying, liked, setLiked } =
    useContext(ContextPlayer);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [sounds, setSounds] = useState<AudioDTO[]>([]);

  useEffect(() => {
    soundService.findAllSounds(0).then((response) => {
      console.log(response);
      setSounds(response.data.content);
    });
  }, [audioFile]);

  function handleFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];
    console.log("file", file);
    if (file) {
      const formData = new FormData();
      formData.append("name", file.name);
      formData.append("audio", file);
      soundService
        .insertSound(formData)
        .then((response) => {
          console.log(response.data);
          setAudioFile(file);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function handleUpdateSrc(newSrc: string, liked: boolean) {
    if (src === "" || src === undefined) {
      setSrc(newSrc);
      setLiked(liked);
    }
    if (src === newSrc) {
      if (isPlaying) {
        setIsPlaying(!isPlaying);
      } else {
        setIsPlaying(!isPlaying);
      }
    } else {
      setSrc(newSrc);
      setLiked(liked);
      if (isPlaying) {
        setIsPlaying(!isPlaying);
      }
    }
  }

  return (
    <section className="sounds-section">
      <div className="sounds-container">
        <div className="sounds-navigation">
          <nav>
            <a href="" className="first-navigation">
              All
            </a>
            <a href="">Samples</a>
            <a href="">Presets</a>
            <a href="">Packs</a>
          </nav>
        </div>
        <div className="sounds-samples">
          <div className="sounds-samples-title">
            <h2>Samples</h2>
            <label htmlFor="file-upload" className="new-button">
              <p className="fa fa-cloud-upload">New</p>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileInputChange}
              />
            </label>
          </div>
          <div className="sound-samples-dashboard">
            {sounds &&
              sounds.map((sound) => (
                <SoundSampleRow
                  audio={sound}
                  onUpdateSrc={handleUpdateSrc}
                  key={sound.id}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
