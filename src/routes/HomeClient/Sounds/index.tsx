import { useContext, useEffect, useRef, useState } from "react";
import { AudioDTO } from "../../../models/audio";
import * as soundService from "../../../services/sound-service";
import * as pageService from "../../../services/page-service";
import { v4 as uuidv4 } from "uuid";
import * as forms from "../../../utils/forms";
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
import SoundEditForm from "../../../components/SoundEditForm";
import { format, parseISO } from "date-fns";
import { WebSocketLoadingFilesDTO } from "../../../models/loadingAudioDTO";
import { Container } from "./styles";
import SearchBar from "../../../components/SearchBar";
import SoundsNavigation from "../../../components/SoundsNavigation";
import SoundsType from "../../../components/SoundsType";
import SoundsDashBoard from "../../../components/SoundsDashboard";
import LoadingFiles from "../../../components/LoadingFiles";

export default function Sounds() {
  const [webSocketsLoadingFiles, setWebSocketsLoadingFiles] = useState<WebSocketLoadingFilesDTO[]>([]);
  const [isTwoElementsInLoading, setIsTwoElementsInLoading] = useState(false);
  const [empty, setEmpty] = useState<AudioDTO>({
    id: "",
    name: "",
    audioUrl: "",
    creationDate: "",
    lastUpdatedDate: "",
    soundType: "",
    liked: false,
  });
  const isLastPage = useRef(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const botaoRef = useRef<HTMLDivElement>(null);
  const [selectSingleSound, setSelectSingleSound] = useState<AudioDTO>(empty);
  const [observerClassName] = useState("sentinela");
  const [searchCount, setSearchCount] = useState(0);
  const [nextPageCount, setNextPageCount] = useState(0);
  const [lastResponsePageContent, setLastResponsePageContent] = useState<AudioDTO[]>([]);
  const [intersectionObserverCount, setIntersectionObserverCount] = useState(0);
  const [insertAudioCount, setInsertAudioCount] = useState(0);
  const [updateAudioCount, setUpdateAudioCount] = useState(0);
  const [sounds, setSounds] = useState<AudioDTO[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [filterAttribute, setFilterAttribute] = useState<keyof AudioDTO>("name");
  const [sortAttribute, setSortAttribute] = useState<keyof AudioDTO>("name");
  const [sortType, setSortType] = useState<SortType>(SortType.ASC);
  const [queryParams, setQueryParams] = useState<QueryParams>(() => ({
    page: 0,
    size: 12,
    sort: `${sortAttribute},${sortType === SortType.ASC ? "asc" : "desc"}`,
  }));
  const [updateSoundDTO, setUpdateSoundDTO] = useState<AudioDTO>(empty);
  const [insertAudioDTO, setInsertAudioDTO] = useState<AudioDTO>(empty);
  const [scrollRowHoveredId, setScrollRowHoveredId] = useState<string>("");
  const { isPlaying } = useContext(ContextPlayer);
  const [isBoxOptionOpen, setIsBoxOptionOpen] = useState<boolean>(false);
  const [sound3PointsClicked, setSound3PointsClicked] = useState<AudioDTO>(empty);
  const [soundRightButtonClicked, setSoundRightButtonClicked] = useState<AudioDTO>(empty);
  const [isImportButtonClicked, setIsImportButtonClicked] = useState<boolean>(false);
  const [youtubeUrlText, setYoutubeUrlText] = useState<string>("");
  const [isFromYoutubeButtonClicked, setIsFromYoutubeButtonClicked] = useState<boolean>(false);
  const [firstIsTwoElementsRenderCount, setFirstIsTwoElementsRenderCount] = useState(0);
  const [isEditPopupClicked, setIsEditPopupClicked] = useState<AudioDTO>(empty);
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
  
  //1º - Interrompe executação quando a tela é renderizada a primeira vez
  //2º - Verifica se possui dois ou mais elementos na box de uploads
  useEffect(() => { 
    //interrompe a primeira execução quando a tela for renderizada e habilita para que a partir de agora, sempre que o webSocketsLoadingFiles for alterado, ou seja, a lista de audios na box de uploads, então nós vamos validar se possui 2 ou mais elementos na lista
    if(firstIsTwoElementsRenderCount === 0){
      setFirstIsTwoElementsRenderCount(prevState => prevState + 1);
      return;
    }
    //Verifica se possui dois ou mais elementos na box de uploads
    if(hasTwoElementsInUploadBox()){
      //se for igual ou maior do que 2, então "true"
      setIsTwoElementsInLoading(true);
    } else {
      //se não for, então "false"
      setIsTwoElementsInLoading(false);
    }
  },[webSocketsLoadingFiles]);

  //1º - Verifica se a musica está tocando, pois caso não estiver, ele ativará a funcionalidade de obter a posição do mouse a cada 50 milisegundos e alterar a cor do background da table row que o mouse estiver cime no momento
  useEffect(() => {
    //verifica se existe alguma musica tocando no momento
    if (!isPlaying) {
      //se não estiver, então habilitamos a funcionalidade de obter a posição do mouse a cada 50 milissegundos e alterar a cor de fundo do table row que o mouse estiver em cima no momento
      enableHoveredTableRowWhenIsNotPlaying();
    }
  }, [isPlaying]);

  //1º - Interrompe executação quando a tela é renderizada a primeira vez, pois o isBoxOptionOpen sempre é renderizado inicialmente como "false"
  //2º - Verifica se a box option esta ativa, se estiver, ele impedi o scroll na div main
  useEffect(() => {
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

  //1º - Interrompe executação quando a tela é renderizada a primeira vez
  //2º - Sempre que o nextPageCount for alterado, no caso quando a tela chegar no intersectionObserver, nós iremos fazer uma requisição para a próxima página e somaremos com a página atual que já está rendenreziada na tela
  useEffect(() => {
    if (nextPageCount > 0) {
      loadNextPage();
    }
  }, [nextPageCount]);

  //1º - Interrompe executação quando a tela é renderizada a primeira vez
  //2º - Sempre que o insertAudioCount for alterado, no caso quando nós inserirmos algum produto, tanto pelo computador quanto pelo youtube, nós vamos atualizar a página inserindo este produto ná página ou não, dependendo da ordenação e se ele deve ficar na página que já está renderizada
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

  //1º - Interrompe executação quando a tela é renderizada a primeira vez
  //2º - Sempre que o updatedAudioCount for alterado, ou seja, quando atualizarmos alguma informação do audio ou dermos like, então nós vamos atualizar a página, alterando a posição ou retirnado o audio da tela se necessário
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

  //1º - Executa sempre que a tela for renderizada 
  //2º - Sempre que o searchCount for alterado, no caso o searchCount será alteado quando inserirmos qualquer texto no SearchBar, e para cada caracter inserido, ele fará uma nova consulta no banco de dados considerando o seguinte nome que estiver no input do Search Bar e irá atualizar os audios do dashboard  
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

  //1º - Interrompe executação quando a tela é renderizada a primeira vez
  //2º - sempre que o intersectionObserverCount for alterado, ou seja, quando o retorno da requisição para o backend, a paginação não for a última página, então nós iremos criar um intersectionObserver para criar o scroll infinito
  useEffect(() => {
    if (intersectionObserverCount > 0) {
      createInfinityScroll();
    }
  }, [intersectionObserverCount]);

  //1º - Interrompe executação quando a tela é renderizada a primeira vez pois o isImportButtonClicked sempre inicia como false
  //2º - Sempre que o isImportButtonClicked ele for alterador, ou seja, sempre que clicarmos no botão do "importar", então ele vai criar uma box com o popper para conseguirmos criar uma box e posicionar ela em relação ao botão do importar
  //3º - Caso após aberto o import box, se o usuario clicar em alguma lugar que não for o import box, ele será fechado
  useEffect(() => {
    //verificar se o importButton foi clicado, ou seja, o isImportButtonClicked for "true"
    if (isImportButtonClicked && botaoRef.current && boxRef.current) {
      adjustPositionAndValidateClickInImportBox();
    }

  }, [isImportButtonClicked]);

  useEffect(() => {
    setFormData(forms.updateAll(formData, JSON.stringify(isEditPopupClicked)));
  }, []);

  function handleSearch(event: any) {
    updateSearchText(event.target.value);
    updateQueryParams(event.target.value);
    searchPage();
  }

  function handleDeleteAudioFile(deletedSoundId: string) {
    console.log("Entrou no delete");
    const soundsWithoutDeletedSound = sounds.filter(
      (sound) => sound.id !== deletedSoundId
    );
    console.log("soundsWithoutDeletedSound", soundsWithoutDeletedSound);
    updateSoundListAfterSoundDeleted(soundsWithoutDeletedSound);
  }

  function handleFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("audio", file);
      closeImportBoxOption();
      soundService
        .insertSound(formData)
        .then((response) => {
          setInsertAudioDTO(response.data);
          reloadPageByInsert();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function handleSelectSound(audio: AudioDTO) {
    if (isSoundRowClickedEqualsSingleSoundSelected(audio)) {
      unselectSound();
    } else {
      selectSound(audio);
    }
  }

  function handle3PointsButtonClick(audio: AudioDTO) {
    if (isSoundOptionBoxOpenByRightClick()) {
      closeSoundOptionsBoxByRightClick();
    }
    if (isSoundOptionBoxOpenBy3PointsEqualsAudioId(audio.id)) {
      closeSoundOptionsBoxBy3Points();
    } else {
      openSoundOptionBoxBy3Points(audio); // Define o ID do novo Sound selecionado
    }
  }

  function handleRightButtonClick(audio: AudioDTO) {
    if (isSoundOptionBoxOpenBy3PointsEqualsAudioId(audio.id)) {
      closeSoundOptionsBoxBy3Points();
    }
    if (isSoundOptionBoxOpenByRightClickEqualsAudioId(audio.id)) {
      closeSoundOptionsBoxByRightClick();
    } else {
      openSoundOptionBoxByRightClick(audio); 
    }
  }

  function handleImportButtonClick(event: any) {
    if (isFromComputerButtonClickInImportBox(event)) {
      return;
    } else if (isImportBoxOptionOpen()) {
      console.log("Entrou no import");
      closeImportBoxOption();
    } else {
      console.log("Entrou no import");
      openImportBoxOption();
    }
  }

  function handleFromYoutubeButtonClick(event: any) {
    console.log("Entrou no import");
    openYoutubeInputTextInImportBoxOption();
  }

  function handleYoutubeUrlChange(event: any) {
    updateYoutubeUrlInputText(event.target.value);
  }

  function handleYoutubeUrlSubmitClick() {
    closeImportBoxOption();
    const requestId: string = addNewSoundInUploadBox();
    soundService
      .youtubeConverterdownload(youtubeUrlText, requestId)
      .then((response) => {
        setInsertAudioDTO(response.data);
        reloadPageByInsert();
      })
      .catch((error) => {
        console.log(error);
      });
  }

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

  function handleSubmit(formData: any) {
    console.log("formData", formData);
    console.log("isEditPopupClicked", isEditPopupClicked);
    soundService
      .updateSound(isEditPopupClicked.id, {
        soundName: formData.name.value,
        liked: isEditPopupClicked.liked,
      })
      .then((response) => {
        console.log("Response updateSound", response.data);
        const newUpdatedSound: AudioDTO = response.data;
        setUpdateSoundDTO((prevParam) => (prevParam = newUpdatedSound));
        reloadPageByUpdate();
        handleEditPopupClick();
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
        value: updateSound.name,
      },
      creationDate: {
        ...prevState.creationDate,
        value: formatDate(updateSound.creationDate),
      },
      lastUpdatedDate: {
        ...prevState.lastUpdatedDate,
        value: formatDate(updateSound.lastUpdatedDate),
      },
      soundType: {
        ...prevState.soundType,
        value: updateSound.soundType,
      },
    }));
    if(isSoundOptionBoxOpenBy3Points()){
      closeSoundOptionsBoxBy3Points();
    }
    if(isSoundOptionBoxOpenByRightClick()){
      closeSoundOptionsBoxByRightClick();
    }
    if (isEditPopupOpen()) {
      closeEditPopup();
    } else {
      openEditPopup(updateSound);
    }
  }

  function updateYoutubeUrlInputText(newValue: string){
    setYoutubeUrlText(newValue);
  }

  //verificar se o elemento que foi clicado é o "importar - DoComputador"
  function isFromComputerButtonClickInImportBox(event: WheelEvent): boolean {
    //obtem o elemento que o html que o mouse estiver posicionado em cima atualmente
    const currentElement = document.elementFromPoint(
      event.clientX,
      event.clientY
    );

    //verificar se o elemento é do tipo <div>
    const divElement = currentElement?.closest("div");

    //se for <div>, verifica se possui o dataset name
    if (divElement?.dataset.name) {

      //se possuir, retorna "true"
      return true;
    } else {
      //se não possuir, retorna "false"
      return false;
    }
  }

  function updateSearchText(newValue: string){
    setSearchText(newValue);
  }

  function updateQueryParams(newQueryParams: string){
    setQueryParams((prevParams) => ({
      ...prevParams,
      page: 0,
      name: newQueryParams,
    }));
  }

  function updateSoundListAfterSoundDeleted(soundsWithoutDeletedSound: AudioDTO[]){
    setSounds((prevParam) => (prevParam = soundsWithoutDeletedSound));
  }

  function formatDate(data: string): string {
    const date = parseISO(data);
    return format(date, "dd/MM/yyyy HH:mm");
  }

  //seta o isTwoElementsInLoading considerando o isTwoElementsInLoading que estamos recebendo como parâmetro para sabermos se tem 2 ou mais audios no box de uploads
  function hasTwoElementsInUploadBox(){
    return webSocketsLoadingFiles.length >= 2;
  }

  function enableHoveredTableRowWhenIsNotPlaying(){
    //cria o evento de WheelEvent que será acionado quando o usuario utilizar o scroll na tela
    window.onwheel = function (event: WheelEvent) {
      var scrollHoveredInterval = setInterval(() => {
        //habilita o hover do table row específico que o mouse estiver em cima a cada 50 milissegundos
        insertHoverInTableRowWhenMouseIsUp(event);
      }, 50);
      setTimeout(() => {
        //para a atualização após 150 milissegundos, ou seja, após 3 atualizações
        clearTimeout(scrollHoveredInterval);
      }, 150);
    };
  }

  //obtem o id do table row se/que o mouse estiver posicionado em cima do elemento <tr> que tiver o dataset id e seta ele no scrollRowHeveredId
  function insertHoverInTableRowWhenMouseIsUp(event: WheelEvent) {
    //obtem o elemento que o html que o mouse estiver posicionado em cima atualmente
    const currentElement = document.elementFromPoint(
      event.clientX,
      event.clientY
    );

    //verificar se o elemento é do tipo <tr>
    const trElement = currentElement?.closest("tr");

    //se for <tr>, verifica se possui o dataset id
    if (trElement?.dataset.id) {

      //se possuir, seta este id no scrollRowHeveredId
      const trId = trElement.dataset.id;
      setScrollRowHoveredId(trId);
    }
  }

  function lockScrollInMainDiv(){
    setIsBoxOptionOpen(true);
  }

  function unlockScrollInMainDiv(){
    setIsBoxOptionOpen(false);
  }

  function loadNextPage(){
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

  function reloadPageByInsert(){
    setInsertAudioCount((prevParam) => prevParam + 1);
  }

  function reloadPageByUpdate(){
    setUpdateAudioCount((prevParam) => prevParam + 1);
  }

  function searchPage(){
    setSearchCount((prevParam) => prevParam + 1);
  }

  function createInfinityScroll(){
    const pageNextClickDTO: PageNextClickDTO = {
      setQueryParams: setQueryParams,
      setNextPageCount: setNextPageCount,
    };
    pageService.createInfinityScroll(pageNextClickDTO, observerClassName);
  }

  function adjustPositionAndValidateClickInImportBox(){
    if (isImportButtonClicked && botaoRef.current && boxRef.current) {
      //posiciona o importBoxOption em relação ao botaoRef, que no caso a referência para o importButton
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
      
      //Adiciona evento de click, onde a função que é chamada a partir de agora quando o usuario clicar em qualquer coisa será tambem verificar se onde ele clicou, está dentro ou não do importBox criado pelo popper
      window.addEventListener("click", handleWindowClick);
    } else {
      // Remove event listener quando a box é fechada
      window.removeEventListener("click", handleWindowClick);
    }

    //verificar se o click do mouse está dentro da importBoxOption, se ele e fecha a importBoxOption
    function handleWindowClick(event: MouseEvent) {
      //verificar se o lugar onde o usuario clicou com o mouse ele não está dentro do importBox
      if (!boxRef.current?.contains(event.target as Node) && !botaoRef.current?.contains(event.target as Node)) {
        //Se não for, Fecha a box se o elemento clicado não estiver dentro da box ou do botão
        handleImportButtonClick(event);
      }
    }

    // Função que é chamada quando o componente é desmontado
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }

  function unselectSound(){
    setSelectSingleSound(empty);
  }

  function selectSound(audio: AudioDTO){
    setSelectSingleSound(audio); // Define o ID do novo Sound selecionado
  }

  function isSoundRowClickedEqualsSingleSoundSelected(audio: AudioDTO){
    return selectSingleSound.id === audio.id;
  }

  function openSoundOptionBoxByRightClick(audio: AudioDTO){
    if(isSoundOptionBoxOpenBy3Points()){
      closeSoundOptionsBoxBy3Points();
    }
    if(isImportBoxOptionOpen()){
      closeImportBoxOption();
    }
    setSoundRightButtonClicked(audio); // Define o ID do novo Sound selecionado
    lockScrollInMainDiv();
  }

  function isImportBoxOptionOpen(){
    return isImportButtonClicked;
  }

  function openSoundOptionBoxBy3Points(audio: AudioDTO){
    if(isSoundOptionBoxOpenByRightClick()){
      closeSoundOptionsBoxByRightClick();
    }
    if(isImportBoxOptionOpen()){
      closeImportBoxOption();
    }
    setSound3PointsClicked(audio); // Define o ID do novo Sound selecionado
    lockScrollInMainDiv();
  }

  function isSoundOptionBoxOpenBy3PointsEqualsAudioId(audioId: string){
    return sound3PointsClicked.id === audioId;
  }

  function isSoundOptionBoxOpenBy3Points(){
    return sound3PointsClicked.id !== "";
  }

  function isSoundOptionBoxOpenByRightClick(){
    return soundRightButtonClicked.id !== "";
  }

  function isSoundOptionBoxOpenByRightClickEqualsAudioId(audioId: string){
    return soundRightButtonClicked.id === audioId;
  }

  function closeYoutubeInputTextInImportBoxOption(){
    setIsFromYoutubeButtonClicked(false);
  }

  function clearYoutubeUrlText(){
    setYoutubeUrlText("");
  }

  function openYoutubeInputTextInImportBoxOption(){
    setIsFromYoutubeButtonClicked(true);
  }

  function addNewSoundInUploadBox() : string{
    const requestId = uuidv4();
    setWebSocketsLoadingFiles(prevState => [...prevState, {requestId: requestId}]);
    return requestId;
  }

  function handleEditPopupClick(){
    closeEditPopup();
  }

  function isEditPopupOpen(){
    return isEditPopupClicked.id !== "";
  }

  function closeSoundOptionsBoxBy3Points(){
    setSound3PointsClicked(empty);
    unlockScrollInMainDiv();
  }

  function closeSoundOptionsBoxByRightClick(){
    setSoundRightButtonClicked(empty);
    unlockScrollInMainDiv();
  }

  function closeImportBoxOption(){
    closeYoutubeInputTextInImportBoxOption();
    clearYoutubeUrlText();
    setIsImportButtonClicked(false);
    unlockScrollInMainDiv();
  }

  function openImportBoxOption(){
    if(isSoundOptionBoxOpenByRightClick()){
      closeSoundOptionsBoxByRightClick();
    }
    if(isSoundOptionBoxOpenBy3Points()){
      closeSoundOptionsBoxBy3Points();
    }
    setIsImportButtonClicked(true);
    lockScrollInMainDiv();
  }

  function closeEditPopup(){
    setIsEditPopupClicked(empty);
    unlockScrollInMainDiv();
  }

  function openEditPopup(updateSound: AudioDTO){
    if(isSoundOptionBoxOpenByRightClick()){
      closeSoundOptionsBoxByRightClick();
    }
    if(isSoundOptionBoxOpenBy3Points()){
      closeSoundOptionsBoxBy3Points();
    }
    setIsEditPopupClicked(updateSound);
    lockScrollInMainDiv();
  }

  return (
    <>
      <Container>
        <SearchBar onSearch={handleSearch} searchText={searchText} />
        <SoundsNavigation />
        <SoundsType
          onImportButtonClick={handleImportButtonClick}
          botaoRef={botaoRef}
          boxRef={boxRef}
          isImportButtonClicked={isImportButtonClicked}
          onFileInputChange={handleFileInputChange}
          isFromYoutubeButtonClicked={isFromYoutubeButtonClicked}
          onFromYoutubeButtonClick={handleFromYoutubeButtonClick}
          youtubeUrlText={youtubeUrlText}
          onYoutubeUrlChange={handleYoutubeUrlChange}
          onYoutubeUrlSubmitClick={handleYoutubeUrlSubmitClick}
        />
        <SoundsDashBoard
          sounds={sounds}
          onDeleteAudioFile={handleDeleteAudioFile}
          onUpdateAudioFile={handleUpdateAudioFile}
          onSelectSound={handleSelectSound}
          selectSingleSoundId={selectSingleSound.id}
          scrollRowHoveredId={scrollRowHoveredId}
          setIsBoxOptionOpen={setIsBoxOptionOpen}
          sound3PointsClickedId={sound3PointsClicked.id}
          on3PointsButtonClick={handle3PointsButtonClick}
          soundRightButtonClickedId={soundRightButtonClicked.id}
          onRightButtonClick={handleRightButtonClick}
          updateSoundDTO={updateSoundDTO}
        />
        {!isLastPage.current && <div id={observerClassName}></div>}
      </Container>
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
        <LoadingFiles
          isTwoElementsInLoading={isTwoElementsInLoading}
          setWebSocketsLoadingFiles={setWebSocketsLoadingFiles}
          webSocketsLoadingFiles={webSocketsLoadingFiles}
        />
      )}
    </>
  );
}
