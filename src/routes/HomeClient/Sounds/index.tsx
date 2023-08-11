import { useContext, useEffect, useRef, useState } from "react";
import { AudioDTO } from "../../../models/audio";
import SoundSampleRow from "../../../components/SoundSampleRow";
import SearchIcon from "../../../components/Icons/Search";
import * as soundService from "../../../services/sound-service";
import * as pageService from "../../../services/page-service";
import { v4 as uuidv4 } from 'uuid';
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
import * as forms from "../../../utils/forms"
import { createPopper } from "@popperjs/core";
import BoxOption from "../../../components/BoxOption";
import InputFileBoxOption from "../../../components/InputFileBoxOption";
import SoundEditForm from "../../../components/SoundEditForm";
import { format, parseISO } from "date-fns";
import { WebSocketLoadingFilesDTO } from "../../../models/loadingAudioDTO";
import LoadingFile from "../../../components/LoadingFile";

export default function Sounds() {
  const [webSocketsLoadingFiles, setWebSocketsLoadingFiles] = useState<WebSocketLoadingFilesDTO[]>([]);
  const [isMinimizedHovered, setIsMinimizedHovered] = useState(false);
  const [isMinimizedActive, setIsMinimizedActive] = useState(false);
  const [isClosedHovered, setIsClosedHovered] = useState(false);
  const [isTwoElementsInLoading, setIsTwoElementsInLoading] = useState(false);
  const [firstIsTwoElementsRenderCount, setFirstIsTwoElementsRenderCount] = useState(0);

  useEffect(() => { 
    if(firstIsTwoElementsRenderCount === 0){
      setFirstIsTwoElementsRenderCount(prevState => prevState + 1);
      return;
    }
    if(webSocketsLoadingFiles.length >= 2){
      setIsTwoElementsInLoading(true);
    } else {
      setIsTwoElementsInLoading(false);
    }
  },[webSocketsLoadingFiles]);

  const isLastPage = useRef(false);
  const [selectSingleSound, setSelectSingleSound] = useState<AudioDTO>({
    id: "",
    name: "",
    audioUrl: "",
    creationDate: "",
    lastUpdatedDate: "",
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
    lastUpdatedDate: "",
    soundType: "",
    liked: false,
  });
  const [insertAudioDTO, setInsertAudioDTO] = useState<AudioDTO>({
    id: "",
    name: "",
    audioUrl: "",
    creationDate: "",
    lastUpdatedDate: "",
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
    lastUpdatedDate: "",
    soundType: "",
    liked: false,
  });
  const [soundRightButtonClicked, setSoundRightButtonClicked] =
    useState<AudioDTO>({
      id: "",
      name: "",
      audioUrl: "",
      creationDate: "",
      lastUpdatedDate: "",
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

  function handleDeleteAudioFile(deletedSoundId: string) {
    console.log("Entrou no delete");
    const soundsWithoutDeletedSound = sounds.filter(
      (sound) => sound.id !== deletedSoundId
    );
    console.log("soundsWithoutDeletedSound", soundsWithoutDeletedSound);
    setSounds((prevParam) => (prevParam = soundsWithoutDeletedSound));
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
        lastUpdatedDate: "",
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
        lastUpdatedDate: "",
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
        lastUpdatedDate: "",
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
        lastUpdatedDate: "",
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
        lastUpdatedDate: "",
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
    console.log("Entrou no import");
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
    const requestId = uuidv4();
    setWebSocketsLoadingFiles(prevState => [...prevState, {requestId: requestId}]);
    soundService.youtubeConverterdownload(youtubeUrlText, requestId)
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

  useEffect(() => {
        setFormData(forms.updateAll(formData, JSON.stringify(isEditPopupClicked)));
    }
  , []);

  function handleChange(formDataProps: any) {
    setFormData(formDataProps);
  }

  function handleTurnDirty(formDataProps: any) {
    setFormData(formDataProps);
  }

  function handleEditSubmit(formDataProps: any) {
    const formDataValidated = forms.dirtyAndValidateAll(formDataProps);
    if (forms.hasAnyInvalid(formDataValidated)) {
      setFormData(formDataValidated);
      return;
    }

    const requestBody = forms.toValues(formData);

    // if (isEditing) {
    //   requestBody.id = params.productId;
    // }

    // const request = isEditing
    // ? productService.updateRequest(requestBody)
    // : productService.insertRequest(requestBody)

    // request
    //   .then(() => {
    //     navigate("/admin/products");
    //   })
    //   .catch(error => {
    //     setFormData(productService.setBackendErrors(formData, error.response.data.errors));
    //   })
  }

  const [ isEditPopupClicked, setIsEditPopupClicked ] = useState<AudioDTO>({
    id: "",
    name: "",
    audioUrl: "",
    creationDate: "",
    lastUpdatedDate: "",
    soundType: "",
    liked: false,
  });

  function formatDate(data: string): string{
    const date = parseISO(data);
    return format(date, 'dd/MM/yyyy HH:mm');
  }

  function handleSubmit(formData: any) {
    console.log("formData", formData);
    console.log("isEditPopupClicked", isEditPopupClicked);
    soundService.updateSound(isEditPopupClicked.id, { soundName:formData.name.value, liked: isEditPopupClicked.liked})
    .then((response) => {
      console.log("Response updateSound", response.data);
      const newUpdatedSound: AudioDTO = response.data;
      setUpdateSoundDTO((prevParam) => (prevParam = newUpdatedSound));
      setUpdateAudioCount((prevParam) => prevParam + 1);
      handleEditPopupClick(response);
    })
    .catch((error) => {
      console.log(error.data);
    });
  }

  function handleUpdateAudioFile(updateSound: AudioDTO) {
    setFormData((prevState: any) => ({
      ...prevState, 
      name: {
        ...prevState.name,
        value: updateSound.name
      },
      creationDate: {
        ...prevState.creationDate,
        value: formatDate(updateSound.creationDate)
      },
      lastUpdatedDate: {
        ...prevState.lastUpdatedDate,
        value: formatDate(updateSound.lastUpdatedDate)
      },
      soundType: {
        ...prevState.soundType,
        value: updateSound.soundType
      },
    }));
      setSound3PointsClicked({
        id: "",
        name: "",
        audioUrl: "",
        creationDate: "",
        lastUpdatedDate: "",
        soundType: "",
        liked: false,
      });
      setSoundRightButtonClicked({
        id: "",
        name: "",
        audioUrl: "",
        creationDate: "",
        lastUpdatedDate: "",
        soundType: "",
        liked: false,
      });
    if (isEditPopupClicked.id !== "") {
      setIsEditPopupClicked({
        id: "",
        name: "",
        audioUrl: "",
        creationDate: "",
        lastUpdatedDate: "",
        soundType: "",
        liked: false,
      });
      setIsBoxOptionOpen(false);
    } else {
      setIsEditPopupClicked(updateSound);
      setIsBoxOptionOpen(true);
    }
    // setUpdateSoundDTO((prevParam) => (prevParam = updateSound));
    // setUpdateAudioCount((prevParam) => prevParam + 1);
  }
  
  function handleEditPopupClick(event: any){
      setSound3PointsClicked({
        id: "",
        name: "",
        audioUrl: "",
        creationDate: "",
        lastUpdatedDate: "",
        soundType: "",
        liked: false,
      });
      setSoundRightButtonClicked({
        id: "",
        name: "",
        audioUrl: "",
        creationDate: "",
        lastUpdatedDate: "",
        soundType: "",
        liked: false,
      });
      if (isEditPopupClicked.id !== "") {
        setIsEditPopupClicked({
          id: "",
          name: "",
          audioUrl: "",
          creationDate: "",
          lastUpdatedDate: "",
          soundType: "",
          liked: false,
        });
      }
      setIsBoxOptionOpen(false);
  }

  const [formData, setFormData] = useState<any>({
    name: {
      value: "",
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Nome",
      // validation: function (value: any) {
        //   return /^.{3,80}$/.test(value);
        // },
        // message: "Favor informar um nome de 3 a 80 caracteres",
      },
      creationDate: {
        value: "2023-08-05T01:39:03Z",
        id: "creationDate",
        name: "creationDate",
        type: "text",
        placeholder: "Adicionado em",
        // validation: function (value: any) {
          //   return Number(value) > 0;
          // },
      // message: "Favor informar um nome de 3 a 80 caracteres",
    },
    lastUpdatedDate: {
      value: "2023-08-05T01:39:03Z",
      id: "lastUpdatedDate",
      name: "lastUpdatedDate",
      type: "text",
      placeholder: "Atualizado em",
    },
    soundType: {
      value: "",
      id: "soundType",
      name: "soundType",
      type: "text",
      placeholder: "Tipo de arquivo",
      // validation: function (value: any) {
      //   return /^.{10,}$/.test(value);
      // },
      // message: "Favor informar um nome de 3 a 80 caracteres",
    },
  });

  function handleMinimizeMouseEnterHover() {
    setIsMinimizedHovered(true);
  }

  function handleMinimizeMouseLeaveHover() {
    setIsMinimizedHovered(false);
  
  }
  function handleClosedMouseEnterHover() {
    setIsClosedHovered(true);
  }

  function handleClosedMouseLeaveHover() {
    setIsClosedHovered(false);
  }

  function handleClosedUploadButton(){
    setWebSocketsLoadingFiles([]);
    setIsClosedHovered(false);
  }

  function handleMinimizeUploadButton(){
    setIsMinimizedActive(!isMinimizedActive);
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
            <h2>Samples </h2>
            <div
              className="new-button"
              onClick={(event) => handleImportButtonClick(event)}
              ref={botaoRef}
            >
              Importar
              <div>
                {isImportButtonClicked && (
                  <div
                    className="options-box-div sounds-box-options-div"
                    ref={boxRef}
                  >
                    <InputFileBoxOption
                      className="from-computer-button-div"
                      optionTextName="Do computador"
                      onFunctionChange={handleFileInputChange}
                      dataName="computer-button"
                      labelDivClassName="from-computer-button"
                      labelClassName="from-computer-button-input"
                      optionTextClassName="fa fa-cloud-upload"
                    />
                    {!isFromYoutubeButtonClicked ? (
                      <BoxOption
                        optionTextName="Do youtube"
                        className={"edit-div youtube-div"}
                        onFunctionClick={handleFromYoutubeButtonClick}
                      />
                    ) : (
                      <div data-name="youtube-button" className="youtube-input">
                        <input
                          type="text"
                          className="youtube-text"
                          value={youtubeUrlText}
                          placeholder="Youtube video url"
                          onChange={(event) => handleYoutubeUrlChange(event)}
                        />
                        <input
                          type="button"
                          className="youtube-submit-button"
                          value="Enviar"
                          onClick={handleYoutubeUrlSubmitClick}
                        />
                      </div>
                    )}
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
                  updatedAudio={updateSoundDTO}
                />
              ))}
            </tbody>
          </table>
        </div>
        {!isLastPage.current && <div id={observerClassName}></div>}
      </div>
      {isEditPopupClicked.id !== "" && (
        <SoundEditForm
          formData={formData}
          onChange={handleChange}
          onTurnDirty={handleTurnDirty}
          onSubmit={handleSubmit}
          isEditPopupClicked={isEditPopupClicked}
          onEditPopupClick={handleEditPopupClick}
        />
      )}
      {webSocketsLoadingFiles.length > 0 && (
      <div className= {isTwoElementsInLoading && isMinimizedActive ? "loading-files-div isMinimizedActive" : isMinimizedActive ? "loading-files-div isMinimizedActive" : isTwoElementsInLoading ? "loading-files-div isTwoElementsInLoading" : "loading-files-div"}>
        <div className="loading-files-header">
          <h2>Uploads</h2>
          <div className="loading-files-header-buttons">
            <div
              className="minimize-button-div"
              onMouseEnter={handleMinimizeMouseEnterHover}
              onMouseLeave={handleMinimizeMouseLeaveHover}
              onClick={handleMinimizeUploadButton}
              style={{
                background: isMinimizedHovered
                  ? "rgba(0, 0, 0, 0.2)"
                  : "transparent",
              }}
            >
              <div className="minimize-button"></div>
            </div>
            <div
              className="close-button"
              onMouseEnter={handleClosedMouseEnterHover}
              onMouseLeave={handleClosedMouseLeaveHover}
              onClick={handleClosedUploadButton}
              style={{
                background: isClosedHovered
                  ? "rgba(0, 0, 0, 0.2)"
                  : "transparent",
              }}
            >
              <h2>x</h2>
            </div>
          </div>
        </div>
        <hr />
        <div className="loading-file-upload-list">
          {webSocketsLoadingFiles.map((file) => (
            <LoadingFile loadingRequestId={file.requestId} isTwoElementsInLoading={webSocketsLoadingFiles.length > 2}/>
          ))}
        </div>
      </div>
      )} 
    </section>
  );
}
