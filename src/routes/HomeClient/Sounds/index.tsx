import { useEffect, useRef, useState } from "react";
import { AudioDTO } from "../../../models/audio";
import SoundSampleRow from "../../../components/SoundSampleRow";
import SearchIcon from "../../../components/Icons/Search";
import * as soundService from "../../../services/sound-service";
import * as pageService from '../../../services/page-service'
import "./styles.scss";
import { PageNextClickDTO, PageNextDTO, PageReloadDTO, PageSearchDTO, QueryParams, UseType } from "../../../services/page-service";

export default function Sounds() {
  const isLastPage = useRef(false);
  const [observerClassName] = useState("sentinela")
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
      const pageNextDTO: PageNextDTO<AudioDTO> = {
        objects: sounds,
        setObjects: setSounds,
        setLastResponsePageContent: setLastResponsePageContent,
        isLastPageRef: isLastPage,
        setIntersectionObserverCount:setIntersectionObserverCount,
        findAllWithPageable: (name, page, size) => soundService.findAllSounds(name, page, size),
        queryParams: queryParams
      }
      pageService.loadNextPage(pageNextDTO);
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
    const pageSearchDTO: PageSearchDTO<AudioDTO> = {
      setObjects: setSounds,
      setLastResponsePageContent: setLastResponsePageContent,
      isLastPageRef: isLastPage,
      setIntersectionObserverCount: setIntersectionObserverCount,
      findAllWithPageable: (name, page, size) => soundService.findAllSounds(name, page, size),
      queryParams: queryParams
    }
    pageService.searchPage(pageSearchDTO);
  }, [searchCount]);

  useEffect(() => {
    if (intersectionObserverCount > 0) {
      const pageNextClickDTO: PageNextClickDTO ={
        setQueryParams: setQueryParams,
        setNextPageCount: setNextPageCount
      }
      pageService.createInfinityScroll(pageNextClickDTO, observerClassName);
    }
  }, [intersectionObserverCount]);

  function handleSearch(event: any) {
    isLastPage.current = true;
    setInputText(event.target.value);
    setQueryParams((prevParams) => ({...prevParams, page: 0, name: event.target.value,}));
    setSearchCount((prevParam) => prevParam + 1);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
  }

  function handleDeleteAudioFile(deletedSoundId: string) {
    const soundsWithoutDeletedSound = sounds.filter((sound) => sound.id !== deletedSoundId);
    setSounds(soundsWithoutDeletedSound);
  }

  function handleUpdateAudioFile(updateSound: AudioDTO) {
    setUpdateSoundDTO((prevParam) => prevParam = updateSound);
    setUpdateAudioCount((prevParam) => prevParam + 1);
  }

  function handleFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("audio", file);
      soundService
        .insertSound(formData)
        .then((response) => {
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
          {!isLastPage.current && <div id={observerClassName}></div>}
        </div>
      </div>
    </section>
  );
}
