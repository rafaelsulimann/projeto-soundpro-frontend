import { useEffect, useRef, useState } from "react";
import { AudioDTO } from "../../../models/audio";
import SoundSampleRow from "../../../components/SoundSampleRow";
import SearchIcon from "../../../components/Icons/Search";
import * as soundService from "../../../services/sound-service";
import "./styles.scss";

type QueryParams = {
  page: number;
  name: string;
  size: number;
};

type UpdatedSoundDTO = {
  id: string;
  newName: string;
};

export default function Sounds() {
  const isLastPage = useRef(false);
  const [searchCount, setSearchCount] = useState(0);
  const [nextPageCount, setNextPageCount] = useState(0);
  const [lastResponsePageContent, setLastResponsePageContent] = useState<
    AudioDTO[]
  >([]);
  const [intersectionObserverCount, setIntersectionObserverCount] = useState(0);
  const [sounds, setSounds] = useState<AudioDTO[]>([]);
  const [updatedSoundId, setUpdatedSoundId] = useState("");
  const [inputText, setInputText] = useState("");
  const [updateSoundDTO, setUpdateSoundDTO] = useState<UpdatedSoundDTO>({
    id: "",
    newName: "",
  });
  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 0,
    name: "",
    size: 12,
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
          const soundsResponseSorted = soundsResponse.sort((a, b) => a.name.localeCompare(b.name));
          setSounds(soundsResponseSorted); // Atualize o estado usando uma função para concatenar corretamente os sons
          setLastResponsePageContent(nextPage.sort((a, b) => a.name.localeCompare(b.name)));
        });
    }
  }, [nextPageCount]);

  useEffect(() => {
    if (updateSoundDTO.id !== "") {
      console.log("UPDATED SOUND EFFECT - Query name", queryParams.name);
      console.log("UPDATED SOUND EFFECT - Query page", queryParams.page);
      if (inputText !== "" && updateSoundDTO.newName.includes(inputText)) {
        console.log("PRIMEIRO IF - INPUT TEXT != VAZIO E NEW NAME TIVER AS LETRAS DO INPUT TEXT");
        if (isLastPage.current) {
          console.log("PRIMEIRO IF - IS LAST PAGE = TRUE");
          const soundUpdated: AudioDTO[] = sounds
            .filter((sound) => sound.id === updateSoundDTO.id)
            .map((sound) => ({ ...sound, name: updateSoundDTO.newName }));
          const newSounds = sounds
            .filter((sound) => sound.id !== updateSoundDTO.id)
            .concat(soundUpdated)
            .sort((a, b) => a.name.localeCompare(b.name));
          setSounds(newSounds);
          setLastResponsePageContent(newSounds.slice(lastResponsePageContent.length));
          return;
        }
        if (!isLastPage.current) {
          // -1 É ANTES
          // 0 É IGUAL
          // 1 É DEPOIS
          console.log("PRIMEIRO IF - IS LAST PAGE = FALSE");
          const soundsWithoutUpdatedSound = sounds.filter(
            (sounds) => sounds.id !== updateSoundDTO.id
          );
          const firstAudio = soundsWithoutUpdatedSound.at(0);
          const lastAudio = soundsWithoutUpdatedSound.at(soundsWithoutUpdatedSound.length - 1);
          if (firstAudio && lastAudio) {
            if (firstAudio.name.localeCompare(updateSoundDTO.newName) > 0 && lastAudio.name.localeCompare(updateSoundDTO.newName) < 0) {
              console.log("PRIMEIRO IF - ELE SE ENCAIXA NA ORDEM");
              const soundUpdated: AudioDTO[] = sounds.filter((sound) => sound.id === updateSoundDTO.id).map((sound) => ({ ...sound, name: updateSoundDTO.newName }));
              const newSounds = soundsWithoutUpdatedSound.concat(soundUpdated).sort((a, b) => a.name.localeCompare(b.name));
              const lastPageContentCount = lastResponsePageContent.length;
              setSounds(newSounds);
              setLastResponsePageContent(newSounds.slice(-{lastPageContentCount}));
              return;
            }
            console.log("PRIMEIRO IF - ELE NÃO SE ENCAIXA NA ORDEM");
            soundService
              .findAllSounds(queryParams.name, queryParams.page, queryParams.size)
              .then((response) => {
                const nextPage = response.data.content;
                isLastPage.current = response.data.last; // Use a função de retorno para obter o valor atualizado
                // Filtrar os sons duplicados antes de adicioná-los ao estado
                if (isLastPage.current === false) {
                  setIntersectionObserverCount((prevParam) => prevParam + 1);
                }
                const filteredSounds = sounds.filter((sound: AudioDTO) => {
                  return !lastResponsePageContent.some((filterSound) => filterSound.id === sound.id);
                });
                filteredSounds.concat(nextPage).sort((a, b) => a.name.localeCompare(b.name));
                setSounds(filteredSounds); // Atualize o estado usando uma função para concatenar corretamente os sons
                setLastResponsePageContent(nextPage);
              });
            return;
          }
        }
      }
      if(inputText !== "" && !updateSoundDTO.newName.includes(inputText)){
        console.log("SEGUNDO IF - INPUT TEXT != VAZIO E NEW NAME NÃO TIVER AS LETRAS DO INPUT TEXT");
        if(isLastPage.current){
          console.log("SEGUNDO IF - IS LAST PAGE = TRUE");
          const soundsWithoutUpdatedSound = sounds.filter((sound) => sound.id !== updateSoundDTO.id);
          setSounds(soundsWithoutUpdatedSound);
          setLastResponsePageContent(soundsWithoutUpdatedSound.slice(lastResponsePageContent.length - 1));
          return;
        }
        console.log("SEGUNDO IF - IS LAST PAGE = FALSE");
        soundService
              .findAllSounds(queryParams.name, queryParams.page,queryParams.size)
              .then((response) => {
                const nextPage = response.data.content;
                isLastPage.current = response.data.last; // Use a função de retorno para obter o valor atualizado
                // Filtrar os sons duplicados antes de adicioná-los ao estado
                if (isLastPage.current === false) {
                  setIntersectionObserverCount((prevParam) => prevParam + 1);
                }
                const filteredSounds = sounds.filter((sound: AudioDTO) => {
                  return !lastResponsePageContent.some((filterSound) => filterSound.id === sound.id);
                });
                filteredSounds.concat(nextPage).sort((a, b) => a.name.localeCompare(b.name));
                setSounds(filteredSounds); // Atualize o estado usando uma função para concatenar corretamente os sons
                setLastResponsePageContent(nextPage);
              });
        return;
      }
      
      if (inputText == "") {
        console.log("TERCEITO IF - INPUT TEXT = VAZIO");
        if(isLastPage.current){
          console.log("TERCEIRO IF - IS LAST PAGE = TRUE");
          const soundBeforeUpdated: AudioDTO[] = sounds.filter((sound) => sound.id === updateSoundDTO.id);
          console.log("soundBeforeUpdated", soundBeforeUpdated);
          const soundAfterUpdated: AudioDTO[] = soundBeforeUpdated.map(sound => ({...sound, name: updateSoundDTO.newName}));
          console.log("soundAfterUpdated", soundAfterUpdated);
          const soundsWithoutUpdatedSound = sounds.filter((sound) => sound.id !== updateSoundDTO.id);
          console.log("soundsWithoutUpdatedSound", soundsWithoutUpdatedSound);
          const newSounds = soundsWithoutUpdatedSound.concat(soundAfterUpdated).sort((a, b) => a.name.localeCompare(b.name));
          console.log("newSounds", newSounds)
          const lastPageContentCount = lastResponsePageContent.length;
          console.log("lastPageContentCount", lastPageContentCount);
          setSounds(newSounds);
          console.log("Sounds", sounds);
          setLastResponsePageContent(newSounds.slice(-{lastPageContentCount}));
          console.log("lastResponsePageContentCount", lastResponsePageContent);
          return;
        }
        if(!isLastPage.current){
          // -1 É ANTES
          // 0 É IGUAL
          // 1 É DEPOIS
          console.log("TERCEIRO IF - IS LAST PAGE = FALSE");
          const soundsWithoutUpdatedSound = sounds.filter(
            (sounds) => sounds.id !== updateSoundDTO.id
          );
          const firstAudio = soundsWithoutUpdatedSound.at(0);
          const lastAudio = soundsWithoutUpdatedSound.at(soundsWithoutUpdatedSound.length - 1);
          if (firstAudio && lastAudio) {
            if (firstAudio.name.localeCompare(updateSoundDTO.newName) > 0 && lastAudio.name.localeCompare(updateSoundDTO.newName) < 0) {
              console.log("TERCEIRO IF - ELE SE ENCAIXA NA ORDEM");
              const soundUpdated: AudioDTO[] = sounds.filter((sound) => sound.id === updateSoundDTO.id).map((sound) => ({ ...sound, name: updateSoundDTO.newName }));
              const newSounds = soundsWithoutUpdatedSound.concat(soundUpdated).sort((a, b) => a.name.localeCompare(b.name));
              const lastPageContentCount = lastResponsePageContent.length;
              setSounds(newSounds);
              setLastResponsePageContent(newSounds.slice(-{lastPageContentCount}));
              return;
            }
            console.log("TERCEIRO IF - ELE NÃO SE ENCAIXA NA ORDEM");
            soundService
              .findAllSounds(queryParams.name, queryParams.page, queryParams.size)
              .then((response) => {
                const nextPage = response.data.content;
                isLastPage.current = response.data.last; // Use a função de retorno para obter o valor atualizado
                // Filtrar os sons duplicados antes de adicioná-los ao estado
                if (isLastPage.current === false) {
                  setIntersectionObserverCount((prevParam) => prevParam + 1);
                }
                const filteredSounds = sounds.filter((sound: AudioDTO) => {
                  return !lastResponsePageContent.some((filterSound) => filterSound.id === sound.id);
                });
                filteredSounds.concat(nextPage).sort((a, b) => a.name.localeCompare(b.name));
                setSounds(filteredSounds); // Atualize o estado usando uma função para concatenar corretamente os sons
                setLastResponsePageContent(nextPage);
              });
            return;
          }
        }
      }
    }
  }, [updateSoundDTO]);

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
        const soundResponseSorted = soundsResponse.sort((a, b) => a.name.localeCompare(b.name));
        setSounds(soundResponseSorted); // Atualize o estado usando uma função para concatenar corretamente os sons
        setLastResponsePageContent(soundResponseSorted);
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

  function handleUpdateAudioFile(
    updatedSoundId: string,
    updateSoundNewName: string
  ) {
    setUpdateSoundDTO((prevParams) => ({
      ...prevParams,
      id: updatedSoundId,
      newName: updateSoundNewName,
    }));
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
          setNextPageCount((prevParam) => prevParam + 1);
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
