import { useEffect, useState } from "react";
import { AudioDTO } from "../../../models/audio";
import SoundSampleRow from "../../../components/SoundSampleRow";
import * as soundService from "../../../services/sound-service";
import "./styles.scss";
import LoadMoreButton from "../../../components/LoadMoreButton";

type QueryParams = {
  page: number;
};

export default function Sounds() {
  const [isLastPage, setIsLastPage] = useState(false);
  const [count, setCount] = useState(0);
  const [sounds, setSounds] = useState<AudioDTO[]>([]);
  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 0,
  });

  useEffect(() => {
    soundService.findAllSounds(queryParams.page).then((response) => {
      console.log(response);
      const nextPage = response.data.content;
      setIsLastPage(response.data.last);
      setSounds(sounds.concat(nextPage));
    });
  }, [count, queryParams]);

  function handleNextPageClick() {
    setQueryParams({ ...queryParams, page: queryParams.page + 1 });
  }

  function handleDeleteAudioFile() {
    setCount(count + 1);
  }

  function handleUpdateAudioFile() {
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
          setCount(count + 1);
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
          <div className="sounds-load-more-button">
            {
              !isLastPage && <LoadMoreButton onClick={handleNextPageClick} />
            }
          </div>
        </div>
      </div>
    </section>
  );
}
