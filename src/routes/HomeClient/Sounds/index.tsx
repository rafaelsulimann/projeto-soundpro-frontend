import { useContext, useEffect, useRef, useState } from "react";
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
import { ContextPlayer } from "../../../utils/context-player";
import { createPopper } from "@popperjs/core";
import BoxOption from "../../../components/BoxOption";
import InputFileBoxOption from "../../../components/InputFileBoxOption";

export default function Sounds() {
  const isLastPage = useRef(false);
  const [selectSingleSound, setSelectSingleSound] = useState<AudioDTO>({
    id: "",
    name: "",
    audioUrl: "",
    creationDate: "",
    lastUpdateDate: "",
    soundType: "",
    liked: false,
  });
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
  const [scrollRowHoveredId, setScrollRowHoveredId] = useState<string>("");
  const [firstRenderCount, setIsFirstRenderCount] = useState(0);
  const { isPlaying } = useContext(ContextPlayer);
  const [isBoxOptionOpen, setIsBoxOptionOpen] = useState<boolean>(false);
  const [sound3PointsClicked, setSound3PointsClicked] = useState<AudioDTO>({
    id: "",
    name: "",
    audioUrl: "",
    creationDate: "",
    lastUpdateDate: "",
    soundType: "",
    liked: false,
  });
  const [soundRightButtonClicked, setSoundRightButtonClicked] =
    useState<AudioDTO>({
      id: "",
      name: "",
      audioUrl: "",
      creationDate: "",
      lastUpdateDate: "",
      soundType: "",
      liked: false,
    });
  const [isImportButtonClicked, setIsImportButtonClicked] =
    useState<boolean>(false);

  useEffect(() => {
    if (!isPlaying) {
      window.onwheel = function (event: WheelEvent) {
        if (event.deltaY === 125 || event.deltaY === -125) {
          var scrollHoveredInterval = setInterval(() => {
            handleWheel(event);
          }, 50);
          setTimeout(() => {
            clearTimeout(scrollHoveredInterval);
          }, 150);
        } else {
          handleWheel(event);
        }
      };
    }
  }, [isPlaying]);

  useEffect(() => {
    if (firstRenderCount === 0) {
      setIsFirstRenderCount(1);
      return;
    }
    if (isBoxOptionOpen) {
      const mainContainer = document.querySelector(
        ".main-container"
      ) as HTMLElement;

      if (!mainContainer) return;

      const handleWheel = (event: WheelEvent) => {
        event.preventDefault(); // Impede o comportamento padrão de rolagem
      };

      if (isBoxOptionOpen) {
        mainContainer.addEventListener("wheel", handleWheel, {
          passive: false,
        });
      }

      return () => {
        mainContainer.removeEventListener("wheel", handleWheel);
      };
    }
  }, [isBoxOptionOpen]);

  function handleWheel(event: WheelEvent) {
    const currentElement = document.elementFromPoint(
      event.clientX,
      event.clientY
    );
    const trElement = currentElement?.closest("tr");

    if (trElement?.dataset.id) {
      const trId = trElement.dataset.id;
      setScrollRowHoveredId(trId);
    }
  }

  function handleInputFileClcik(event: WheelEvent): boolean {
    const currentElement = document.elementFromPoint(
      event.clientX,
      event.clientY
    );
    const divElement = currentElement?.closest("div");

    if (divElement?.dataset.name) {
      return true;
    }else {
      return false;
    }
  }

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
    console.log("Entrou no delete");
    const soundsWithoutDeletedSound = sounds.filter(
      (sound) => sound.id !== deletedSoundId
    );
    console.log("soundsWithoutDeletedSound", soundsWithoutDeletedSound);
    setSounds((prevParam) => (prevParam = soundsWithoutDeletedSound));
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
      setIsImportButtonClicked(false);
      setIsBoxOptionOpen(false);
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

  function handleFocused() {
    setIsFocused(true);
  }

  function handleBlur() {
    setIsFocused(false);
  }

  function handleSelectSound(audio: AudioDTO) {
    if (selectSingleSound.id === audio.id) {
      setSelectSingleSound({
        id: "",
        name: "",
        audioUrl: "",
        creationDate: "",
        lastUpdateDate: "",
        soundType: "",
        liked: false,
      });
    } else {
      setSelectSingleSound(audio); // Define o ID do novo Sound selecionado
    }
  }

  function handle3PointsButtonClick(audio: AudioDTO) {
    if (soundRightButtonClicked.id !== "") {
      setSoundRightButtonClicked({
        id: "",
        name: "",
        audioUrl: "",
        creationDate: "",
        lastUpdateDate: "",
        soundType: "",
        liked: false,
      });
    }
    if (sound3PointsClicked.id === audio.id) {
      setSound3PointsClicked({
        id: "",
        name: "",
        audioUrl: "",
        creationDate: "",
        lastUpdateDate: "",
        soundType: "",
        liked: false,
      });
    } else {
      setSound3PointsClicked(audio); // Define o ID do novo Sound selecionado
    }
  }

  function handleRightButtonClick(audio: AudioDTO) {
    if (sound3PointsClicked.id !== "") {
      setSound3PointsClicked({
        id: "",
        name: "",
        audioUrl: "",
        creationDate: "",
        lastUpdateDate: "",
        soundType: "",
        liked: false,
      });
    }
    if (soundRightButtonClicked.id === audio.id) {
      setSoundRightButtonClicked({
        id: "",
        name: "",
        audioUrl: "",
        creationDate: "",
        lastUpdateDate: "",
        soundType: "",
        liked: false,
      });
    } else {
      setSoundRightButtonClicked(audio); // Define o ID do novo Sound selecionado
    }
  }

  const searchBarBorderColor = isFocused
    ? "1px solid var(--border-gray-color)"
    : "1px solid var(--line-gray-color)";

  const boxRef = useRef<HTMLDivElement>(null);
  const botaoRef = useRef<HTMLDivElement>(null);

  function handleImportButtonClick(event: any) {
    if(handleInputFileClcik(event)){
      return;
    } else if(isImportButtonClicked){
      console.log("Entrou no import")
      setIsImportButtonClicked(false);
      setIsFromYoutubeButtonClicked(false);
      setYoutubeUrlText("");
      setIsBoxOptionOpen(false);
    }else {
      console.log("Entrou no import")
      setIsImportButtonClicked(true);
      setIsBoxOptionOpen(true);
    }
  }

  useEffect(() => {
    if (isImportButtonClicked && botaoRef.current && boxRef.current) {
      createPopper(botaoRef.current, boxRef.current, {
        placement: "bottom-start",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [-100 , 10], // Distância vertical entre o elemento de referência e a box
            },
          },
        ],
      });
      window.addEventListener("click", handleWindowClick);
    } else {
      // Remove event listener quando a box é fechada
      window.removeEventListener("click", handleWindowClick);
    }

    // Função que é chamada quando o evento "click" é acionado no objeto window
    function handleWindowClick(event: MouseEvent) {
      if (
        !boxRef.current?.contains(event.target as Node) &&
        !botaoRef.current?.contains(event.target as Node)
      ) {
        // Fecha a box se o elemento clicado não estiver dentro da box ou do botão
        handleImportButtonClick(event);
      }
    }

    // Função que é chamada quando o componente é desmontado
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };

  }, [isImportButtonClicked]);

  const [isFromYoutubeButtonClicked, setIsFromYoutubeButtonClicked] =
    useState<boolean>(false);

  function handleFromYoutubeButtonClick(event: any) {
    console.log("Entrou no import")
    setIsFromYoutubeButtonClicked(true);
  }

  const [youtubeUrlText, setYoutubeUrlText] = useState<string>("");

  function handleYoutubeUrlChange(event: any){
    setYoutubeUrlText(event.target.value);
  }

  function handleYoutubeUrlSubmitClick(){
    setIsImportButtonClicked(false);
    setIsFromYoutubeButtonClicked(false);
    setYoutubeUrlText("");
    setIsBoxOptionOpen(false);
    soundService.youtubeConverterdownload(youtubeUrlText)
    .then((response) => {
      setIsImportButtonClicked(false);
      setIsFromYoutubeButtonClicked(false);
      setYoutubeUrlText("");
      setIsBoxOptionOpen(false);
      setInsertAudioDTO(response.data);
      setInsertAudioCount((prevParam) => prevParam + 1);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <section className="sounds-section">
      <div className="sounds-container">
        <form className="search-bar-form" onSubmit={handleSubmit}>
          <div
            className="search-bar-form-div"
            style={{ border: searchBarBorderColor }}
          >
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
            <div
              className="new-button"
              onClick={(event) => handleImportButtonClick(event)}
              ref={botaoRef}
            >
              Importar
              <div>
                {isImportButtonClicked && (
                  <div className="options-box-div sounds-box-options-div" ref={boxRef}>
                    <InputFileBoxOption
                      className="from-computer-button-div"
                      optionTextName="Do computador"
                      onFunctionChange={handleFileInputChange}
                      dataName="computer-button"
                      labelDivClassName="from-computer-button"
                      labelClassName="from-computer-button-input"
                      optionTextClassName="fa fa-cloud-upload"
                    />
                    {!isFromYoutubeButtonClicked 
                    ? (<BoxOption
                      optionTextName="Do youtube"
                      className={"edit-div youtube-div"}
                      onFunctionClick={handleFromYoutubeButtonClick}
                    />)
                    : (
                      <div data-name="youtube-button" className="youtube-input">
                        <input type="text" className="youtube-text" value={youtubeUrlText} onChange={(event) => handleYoutubeUrlChange(event)}/>
                        <input type="button" className="youtube-submit-button" value="Enviar" onClick={handleYoutubeUrlSubmitClick}/>
                      </div>
                    )
                  }
                    
                  </div>
                )}
              </div>
            </div>
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
                  onClick={handleSelectSound}
                  index={index + 1}
                  key={sound.id}
                  isSelected={selectSingleSound.id === sound.id}
                  scrollRowHoveredId={scrollRowHoveredId}
                  setIsBoxOptionOpen={setIsBoxOptionOpen}
                  is3PointsClicked={sound3PointsClicked.id === sound.id}
                  on3PointsClick={handle3PointsButtonClick}
                  isRightButtonClicked={soundRightButtonClicked.id === sound.id}
                  onRightButtonClick={handleRightButtonClick}
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
