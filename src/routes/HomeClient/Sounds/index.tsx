import { useEffect, useRef, useState } from "react";
import { AudioDTO } from "../../../models/audio";
import SoundSampleRow from "../../../components/SoundSampleRow";
import SearchIcon from "../../../components/Icons/Search";
import * as soundService from "../../../services/sound-service";
import "./styles.scss";

type QueryParams = {
  page: number;
  name: string;
};

export default function Sounds() {
  const firstEntryRef = useRef(true);
  const isLastPage = useRef(false);
  const [count, setCount] = useState(0);
  const [intersectionObserverCount, setIntersectionObserverCount] = useState(0);
  const [sounds, setSounds] = useState<AudioDTO[]>([]);
  const [filteredSounds, setFilteredSounds] = useState<AudioDTO[]>([]);
  const [inputText, setInputText] = useState("");
  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 0,
    name: "",
  });

  useEffect(() => {
    soundService
      .findAllSounds(queryParams.name, queryParams.page)
      .then((response) => {
        const nextPage = response.data.content;
        isLastPage.current = response.data.last; // Use a função de retorno para obter o valor atualizado
        //Filtrar os sons duplicados antes de adicioná-los ao estado
        const uniqueSounds = nextPage.filter((nextSound: AudioDTO) => {
          return !sounds.some((sound) => sound.id === nextSound.id);
        });
        setSounds((prevSounds) => [...prevSounds, ...uniqueSounds]); // Atualize o estado usando uma função para concatenar corretamente os sons
      });
  }, [count, queryParams]);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        if (firstEntryRef.current) {
          firstEntryRef.current = false;
        } else {
          handleNextPageClick();
        }
      }
    });

    const divSentinela = document.querySelector("#sentinela");

    if (divSentinela != null) {
      intersectionObserver.observe(divSentinela);
    }

    return () => intersectionObserver.disconnect();
  }, [intersectionObserverCount]);

  function handleSearch(event: any) {
    const inputTextConst = event.target.value;
    setInputText(inputTextConst);
    setSounds([]);
    setQueryParams((prevParams) => ({
      ...prevParams,
      page: 0,
      name: inputTextConst,
    }));
    if (event.target.value == "" || event.target.value == undefined) {
      firstEntryRef.current = true;
      isLastPage.current = false;
      setIntersectionObserverCount(intersectionObserverCount + 1);
    }
  }

  function handleSubmit(event: any) {
    event.preventDefault();
  }

  function handleNextPageClick() {
    setQueryParams((prevParams) => ({
      ...prevParams,
      page: prevParams.page + 1,
    }));
  }

  function handleDeleteAudioFile(deletedSoundId: string) {
    const updatedSounds = sounds.filter((sound) => sound.id !== deletedSoundId);
    const updatedFilteredSounds = filteredSounds.filter(
      (sound) => sound.id !== deletedSoundId
    );
    setSounds(updatedSounds);
    setFilteredSounds(updatedFilteredSounds);
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
        <form className="search-bar-form" onSubmit={handleSubmit}>
          <div className="search-bar-form-div">
            <SearchIcon fill="#999aa7" className="search-bar-icon" />
            <input
              value={inputText}
              type="text"
              placeholder="Procurar"
              onChange={handleSearch}
              className="search-bar-input"
            />
          </div>
        </form>
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
            {sounds.map((sound) => (
              <SoundSampleRow
                audio={sound}
                onDeleteAudioFile={handleDeleteAudioFile}
                onEditAudioFile={handleUpdateAudioFile}
                key={sound.id}
              />
            ))}
          </div>
          {!isLastPage.current && <div id="sentinela"></div>}
        </div>
      </div>
    </section>
  );
}
