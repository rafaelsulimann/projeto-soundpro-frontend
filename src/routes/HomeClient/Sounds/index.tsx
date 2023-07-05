import { useEffect, useRef, useState } from "react";
import { AudioDTO } from "../../../models/audio";
import SoundSampleRow from "../../../components/SoundSampleRow";
import SearchIcon from "../../../components/Icons/Search";
import * as soundService from "../../../services/sound-service";
import * as pageService from '../../../services/page-service'
import "./styles.scss";
import { PageReloadDTO, QueryParams, UseType } from "../../../models/page";

export default function Sounds() {
  const isLastPage = useRef(false);
  const [searchCount, setSearchCount] = useState(0);
  const [nextPageCount, setNextPageCount] = useState(0);
  const [lastResponsePageContent, setLastResponsePageContent] = useState<AudioDTO[]>([]);
  const [intersectionObserverCount, setIntersectionObserverCount] = useState(0);
  const [insertAudioCount, setInsertAudioCount] = useState(0);
  const [updateAudioCount, setUpdateAudioCount] = useState(0);
  const [sounds, setSounds] = useState<AudioDTO[]>([]);
  const [inputText, setInputText] = useState("");
  const [updateSoundDTO, setUpdateSoundDTO] = useState<AudioDTO>({
    id: "",
    name: "",
    audioUrl: "",
    creationDate: "",
    lastUpdateDate: "",
    soundType: "",
    liked: false,
  });
  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 0,
    name: "",
    size: 12,
  });
  const [insertAudioDTO, setInsertAudioDTO] = useState<AudioDTO>({
    id: "",
    name: "",
    audioUrl: "",
    creationDate: "",
    lastUpdateDate: "",
    liked: false,
    soundType: "",
  });

  useEffect(() => {
    if (nextPageCount > 0) {
      console.log("NEXT PAGE EFFECT - Query name", queryParams.name);
      console.log("NEXT PAGE EFFECT - Query page", queryParams.page);
      soundService
        .findAllSounds(queryParams.name, queryParams.page, queryParams.size)
        .then((response) => {
          console.log("Response", response);
          const nextPage: AudioDTO[] = response.data.content;
          isLastPage.current = response.data.last; // Use a função de retorno para obter o valor atualizado
          // Filtrar os sons duplicados antes de adicioná-los ao estado
          if (isLastPage.current === false) {
            setIntersectionObserverCount((prevParam) => prevParam + 1);
          }
          const uniqueSounds = nextPage.filter((nextSound: AudioDTO) => {
            return !sounds.some((sound) => sound.id === nextSound.id);
          });
          const soundsResponse = sounds.concat(uniqueSounds);
          const soundsResponseSorted = soundsResponse.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          setSounds(soundsResponseSorted); // Atualize o estado usando uma função para concatenar corretamente os sons
          setLastResponsePageContent(nextPage);
        });
    }
  }, [nextPageCount]);

  useEffect(() => {
    if (insertAudioCount > 0) {
      const pageReloadDTO: PageReloadDTO<AudioDTO> = {
        objects: sounds,
        setObjects: setSounds,
        newObject: insertAudioDTO,
        lastResponsePageContent: lastResponsePageContent,
        setLastResponsePageContent: setLastResponsePageContent,
        isLastPageRef: isLastPage,
        setIntersectionObserverCount: setIntersectionObserverCount,
        findAllWithPageable: (name, page, size) => soundService.findAllSounds(name, page, size),
        useType: UseType.INSERT,
        inputText: inputText,
        queryParams: queryParams,
      };
      pageService.reloadPage(pageReloadDTO);
    }
  }, [insertAudioCount]);

  useEffect(() => {
    if (updateAudioCount > 0) {
      const pageReloadDTO: PageReloadDTO<AudioDTO> = {
        objects: sounds,
        setObjects: setSounds,
        newObject: updateSoundDTO,
        lastResponsePageContent: lastResponsePageContent,
        setLastResponsePageContent: setLastResponsePageContent,
        isLastPageRef: isLastPage,
        setIntersectionObserverCount: setIntersectionObserverCount,
        findAllWithPageable: (name, page, size) => soundService.findAllSounds(name, page, size),
        useType: UseType.UPDATE,
        inputText: inputText,
        queryParams: queryParams,
      };
      pageService.reloadPage(pageReloadDTO);
    }
  }, [updateAudioCount]);

  useEffect(() => {
    console.log("SEARCH COUNT EFFECT - Query name", queryParams.name);
    console.log("SEARCH COUNT EFFECT - Query page", queryParams.page);
    soundService
      .findAllSounds(queryParams.name, queryParams.page, queryParams.size)
      .then((response) => {
        console.log("Response", response);
        isLastPage.current = response.data.last; // Use a função de retorno para obter o valor atualizado
        if (isLastPage.current === false) {
          setIntersectionObserverCount((prevParam) => prevParam + 1);
        }
        const soundsResponse: AudioDTO[] = response.data.content;
        console.log("soundsResponse", soundsResponse);
        const soundResponseSorted = soundsResponse.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        console.log("soundResponseSorted", soundResponseSorted);
        setSounds((prevParam) => (prevParam = soundResponseSorted)); // Atualize o estado usando uma função para concatenar corretamente os sons
        console.log("Sounds", sounds);
        setLastResponsePageContent(soundResponseSorted);
        console.log("lastResponsePageContent", lastResponsePageContent);
      });
  }, [searchCount]);

  useEffect(() => {
    console.log("entrou use effect do intersection observer");

    if (intersectionObserverCount > 0) {
      console.log("entrou no if global intersection observer");
      // setIntersectionObserverCount((prevParam) => prevParam = 0);
      console.log("intersection observer count", intersectionObserverCount);
      const intersectionObserver = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          console.log("entrou no segundo if do intersection");
          handleNextPageClick();
        }
      });

      const divSentinela = document.querySelector("#sentinela");

      if (divSentinela != null) {
        intersectionObserver.observe(divSentinela);
      }

      return () => intersectionObserver.disconnect();
    }
  }, [intersectionObserverCount]);

  function handleSearch(event: any) {
    isLastPage.current = true;
    setInputText(event.target.value);
    setQueryParams((prevParams) => ({
      ...prevParams,
      page: 0,
      name: event.target.value,
    }));
    setSearchCount((prevParam) => prevParam + 1);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
  }

  function handleNextPageClick() {
    console.log("entrou no next page");
    setQueryParams((prevParams) => ({
      ...prevParams,
      page: prevParams.page + 1,
    }));
    setNextPageCount((prevParam) => prevParam + 1);
  }

  function handleDeleteAudioFile(deletedSoundId: string) {
    const soundsWithoutDeletedSound = sounds.filter(
      (sound) => sound.id !== deletedSoundId
    );
    setSounds(soundsWithoutDeletedSound);
  }

  function handleUpdateAudioFile(updateSound: AudioDTO) {
    setUpdateSoundDTO((prevParam) => prevParam = updateSound);
    setUpdateAudioCount((prevParam) => prevParam + 1);
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
          setInsertAudioDTO(response.data);
          setInsertAudioCount((prevParam) => prevParam + 1);
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
