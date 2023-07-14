import { useEffect, useRef, useState } from "react";
import { AudioDTO } from "../../../models/audio";
import SoundSampleRow from "../../../components/SoundSampleRow";
import SearchIcon from "../../../components/Icons/Search";
import * as soundService from "../../../services/sound-service";
import * as pageService from "../../../services/page-service";
import "./styles.scss";
import {
  PageNextClickDTO,
  PageNextDTO,
  PageReloadDTO,
  PageSearchDTO,
  QueryParams,
  SortType,
  UseType,
} from "../../../services/page-service";

export default function Sounds() {
  const isLastPage = useRef(false);
  const [isFocused, setIsFocused] = useState(false);
  const [observerClassName] = useState("sentinela");
  const [searchCount, setSearchCount] = useState(0);
  const [nextPageCount, setNextPageCount] = useState(0);
  const [lastResponsePageContent, setLastResponsePageContent] = useState<
    AudioDTO[]
  >([]);
  const [intersectionObserverCount, setIntersectionObserverCount] = useState(0);
  const [insertAudioCount, setInsertAudioCount] = useState(0);
  const [updateAudioCount, setUpdateAudioCount] = useState(0);
  const [sounds, setSounds] = useState<AudioDTO[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [filterAttribute, setFilterAttribute] =
    useState<keyof AudioDTO>("name");
  const [sortAttribute, setSortAttribute] = useState<keyof AudioDTO>("name");
  const [sortType, setSortType] = useState<SortType>(SortType.ASC);
  const [queryParams, setQueryParams] = useState<QueryParams>(() => ({
    page: 0,
    size: 12,
    sort: `${sortAttribute},${sortType === SortType.ASC ? "asc" : "desc"}`,
  }));
  const [updateSoundDTO, setUpdateSoundDTO] = useState<AudioDTO>({
    id: "",
    name: "",
    audioUrl: "",
    creationDate: "",
    lastUpdateDate: "",
    soundType: "",
    liked: false,
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
        setIntersectionObserverCount: setIntersectionObserverCount,
        findAllWithPageable: (page, size) =>
          soundService.findAllSounds(searchText, page, size, queryParams.sort),
        queryParams: queryParams,
      };
      pageService.loadNextPage(pageNextDTO, sortAttribute, sortType);
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
        findAllWithPageable: (page, size) =>
          soundService.findAllSounds(searchText, page, size, queryParams.sort),
        useType: UseType.INSERT,
        searchText: searchText,
        queryParams: queryParams,
      };
      pageService.reloadPage(
        pageReloadDTO,
        filterAttribute,
        sortAttribute,
        sortType
      );
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
        findAllWithPageable: (page, size) =>
          soundService.findAllSounds(searchText, page, size, queryParams.sort),
        useType: UseType.UPDATE,
        searchText: searchText,
        queryParams: queryParams,
      };
      pageService.reloadPage(
        pageReloadDTO,
        filterAttribute,
        sortAttribute,
        sortType
      );
    }
  }, [updateAudioCount]);

  useEffect(() => {
    const pageSearchDTO: PageSearchDTO<AudioDTO> = {
      setObjects: setSounds,
      setLastResponsePageContent: setLastResponsePageContent,
      isLastPageRef: isLastPage,
      setIntersectionObserverCount: setIntersectionObserverCount,
      findAllWithPageable: (page, size) =>
        soundService.findAllSounds(searchText, page, size, queryParams.sort),
      queryParams: queryParams,
    };
    pageService.searchPage(pageSearchDTO, sortAttribute, sortType);
  }, [searchCount]);

  useEffect(() => {
    if (intersectionObserverCount > 0) {
      const pageNextClickDTO: PageNextClickDTO = {
        setQueryParams: setQueryParams,
        setNextPageCount: setNextPageCount,
      };
      pageService.createInfinityScroll(pageNextClickDTO, observerClassName);
    }
  }, [intersectionObserverCount]);

  function handleSearch(event: any) {
    isLastPage.current = true;
    setSearchText(event.target.value);
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

  function handleDeleteAudioFile(deletedSoundId: string) {
    console.log("Entrou no delete")
    const soundsWithoutDeletedSound = sounds.filter(
      (sound) => sound.id !== deletedSoundId
    );
    console.log("soundsWithoutDeletedSound", soundsWithoutDeletedSound);
    setSounds((prevParam) => prevParam = soundsWithoutDeletedSound);
  }

  function handleUpdateAudioFile(updateSound: AudioDTO) {
    setUpdateSoundDTO((prevParam) => (prevParam = updateSound));
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

  function handleFocused(){
    setIsFocused(true);
  }

  function handleBlur() {
    setIsFocused(false);
  }

  const searchBarBorderColor = isFocused ? '1px solid var(--border-gray-color)' : '1px solid var(--line-gray-color)'

  return (
    <section className="sounds-section">
      <div className="sounds-container">
        <form className="search-bar-form" onSubmit={handleSubmit}>
          <div className="search-bar-form-div" style={{border: searchBarBorderColor}}>
            <SearchIcon fill="#999aa7" className="search-bar-icon" />
            <input
              value={searchText}
              type="text"
              placeholder="Procurar"
              onChange={handleSearch}
              onFocus={handleFocused}
              onBlur={handleBlur}
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
          <table className="sample-dashboard-table">
            <thead className="sample-dashboard-table-header">
              <tr className="sample-dashboard-table-header-row">
                <th className="id id-header">
                  <h4>#</h4>
                </th>
                <th className="name name-header">
                  <h4>Nome</h4>
                </th>
                <th className="like like-header"></th>
                <th className="add add-header"></th>
                <th className="options options-header"></th>
              </tr>
            </thead>
            <tbody className="sample-dashboard-table-body">
              {sounds.map((sound, index) => (
                    <SoundSampleRow
                      audio={sound}
                      onDeleteAudioFile={handleDeleteAudioFile}
                      onEditAudioFile={handleUpdateAudioFile}
                      index={index + 1}
                      key={sound.id}
                    />
                  ))}
            </tbody>
          </table>
        </div>
        {!isLastPage.current && <div id={observerClassName}></div>}
      </div>
    </section>
  );
}
