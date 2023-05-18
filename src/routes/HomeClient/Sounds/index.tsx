import { useEffect, useState } from "react";
import { AudioDTO } from "../../../models/audio";
import SoundSampleRow from "../../../components/SoundSampleRow";
import * as soundService from "../../../services/sound-service";
import "./styles.scss";

export default function Sounds() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [count, setCount] = useState(0);
  const [sounds, setSounds] = useState<AudioDTO[]>([]);

  useEffect(() => {
    soundService.findAllSounds(0).then((response) => {
      console.log(response);
      setSounds(response.data.content);
    });
  }, [audioFile, count]);

  function handleDeleteAudioFile(){
    setCount(count + 1);
  }
  
  function handleUpdateAudioFile(){
    setCount(count + 1);
  }

  function handleFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];
    console.log("file", file);
    if (file) {
      const formData = new FormData();
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
                  onDeleteAudioFile={handleDeleteAudioFile}
                  onEditAudioFile={handleUpdateAudioFile}
                  key={sound.id}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
