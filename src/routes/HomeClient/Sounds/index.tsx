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

export default function Sounds() {
  const isLastPage = useRef(false);
  const [searchCount, setSearchCount] = useState(0);
  const [nextPageCount, setNextPageCount] = useState(0);
  const [lastResponsePageContent, setLastResponsePageContent] = useState<
    AudioDTO[]
  >([]);
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
      console.log("INSERT AUDIO EFFECT - Query name", queryParams.name);
      console.log("INSERT AUDIO EFFECT - Query page", queryParams.page);
      // SEM FILTRO DE TEXTO - SE NÃO TIVER NENHUM SOUND NO BANCO, ELE NAO FAZ NENHUM VALIDAÇÃO OU ORDENAÇÃO, APENAS INCLUI
      if (inputText === "" && sounds.length === 0) {
        const newSounds = [...sounds]; // Cria uma cópia do array sounds
        newSounds.push(insertAudioDTO);
        setSounds((prevParam) => (prevParam = newSounds));
        setLastResponsePageContent((prevParam) => (prevParam = newSounds));
        console.log("New sounds", newSounds);
        return;
      }
      // SEM FILTRO DE TEXTO - SE TIVER SOUNDS, PORÉM FOR MENOR QUE O TAMANHO MÁXIMO POR PÁGINA, ELE APENAS INCLUIR MAS FAZ UMA ORDENAÇÃO ANTES
      if (inputText === "" && sounds.length < queryParams.size) {
        const newSounds = [...sounds];
        newSounds.push(insertAudioDTO);
        newSounds.sort((a, b) => a.name.localeCompare(b.name));
        setSounds((prevParam) => (prevParam = newSounds));
        setLastResponsePageContent((prevParam) => (prevParam = newSounds));
        return;
      }

      // SEM FILTRO DE TEXTO - SE TIVER O NÚMERO MÁXIMO DE PÁGINAÇÃO NA LISTA, ENTÃO NÓS VERIFICAMOS SE O NOVO SOUNDS ELE DEVE ESTAR NA PRÓXIMA PÁGINA OU NA ATUAL
      if (inputText === "" && sounds.length === queryParams.size) {
        console.log("Entro no igual ao size");
        const firstAudio = [...sounds].at(0);
        console.log("FirstAudio", firstAudio);
        const lastAudio = [...sounds].at(sounds.length - 1);
        console.log("LastAudio", lastAudio);
        if (firstAudio && lastAudio) {
          console.log("FirstAudio e LastAudio existem");
          const eMaiorQueOMenor = insertAudioDTO.name.localeCompare(firstAudio.name) > 0;
          const eMenorQueOMaior = insertAudioDTO.name.localeCompare(lastAudio.name) < 0;
          const eMenorQueOMenor = insertAudioDTO.name.localeCompare(firstAudio.name) < 0;
          console.log("eMaiorQueOMenor", eMaiorQueOMenor);
          console.log("eMenorQueOMaior", eMenorQueOMaior);
          // SE O AUDIO DEVE ESTAR NA PÁGINA ATUAL, NÓS REMOVEMOS O ÚLTIMO ELEMENTO, INSERIMOS ESTE NOVO, E DEPOIS REORDENAMOS EM ORDEM ALFABÉTICA
          if (eMaiorQueOMenor && eMenorQueOMaior || eMenorQueOMenor) {
            console.log("O nome do novo sound deve ficar neste tela");
            const newSounds = [...sounds].slice(0, sounds.length - 1);
            console.log("New sounds", newSounds);
            newSounds.push(insertAudioDTO);
            console.log("New sounds + push", newSounds);
            newSounds.sort((a, b) => a.name.localeCompare(b.name));
            console.log("New sounds + sort", newSounds);
            setSounds((prevParam) => (prevParam = newSounds));
            console.log("Sounds", sounds);
            setLastResponsePageContent((prevParam) => (prevParam = newSounds));
            console.log("LastReponsePageContent", lastResponsePageContent);
            isLastPage.current = false;
            setIntersectionObserverCount((prevParam) => prevParam + 1);
            return;
          }
          // SE NÃO, NÓS APENAS SETAMOS QUE NÃO É A ÚLTIMA PÁGINA E DEPOIS INCREMENTAMOS O ESTADO QUE ATIVA A CRIAÇÃO DO SCROLL INFINITO;
          isLastPage.current = false;
          setIntersectionObserverCount((prevParam) => prevParam + 1);
          return;
        }
      }

      // SEM FILTRO DE TEXTO - SE TIVERMOS UM NÚMERO DA LISTA MAIOR DO QUE UMA PÁGINAÇÃO INTEIRA, ENTÃO NÓS VAMOS VERIFICAR SE É A ÚLTIMA PÁGINA OU AINDA FALTAM MAIS PÁGINAS
      if (inputText === "" && sounds.length > queryParams.size) {
        // VERIFICANDO SE É A ÚLTIMA PÁGINA
        if (isLastPage.current) {
          // VERIFICANDO SE AINDA PODEM SER INSERIDOS ELEMENTOS, OU SEJA, SE AINDA POSSUI ELEMENTOS PARA SER INCLUIDOS NESTE MESMA PÁGINA
          if (lastResponsePageContent.length < queryParams.size) {
            console.log("Entro no if de maior doq 12 e menor doq 24");
            console.log("lasrResponsePageContent", lastResponsePageContent);
            const newSounds = [...sounds];
            newSounds.push(insertAudioDTO);
            newSounds.sort((a, b) => a.name.localeCompare(b.name));
            setSounds((prevParam) => (prevParam = newSounds));
            const newLastaPageContentCount = lastResponsePageContent.length + 1;
            console.log("newLastaPageContentCount", newLastaPageContentCount);
            const soundsSliced = newSounds.slice(-newLastaPageContentCount);
            console.log("soundsSliced", soundsSliced);
            setLastResponsePageContent(soundsSliced);
            return;
          }
          // VERIFICANDO SE DEVE-SE CRIAR UMA NOVA PÁGINA
          if (lastResponsePageContent.length === queryParams.size) {
            const firstAudio = [...sounds].at(0);
            const lastAudio = [...sounds].at(sounds.length - 1);
            if (firstAudio && lastAudio) {
              console.log("FirstAudio e LastAudio existem");
              const eMaiorQueOMenor = insertAudioDTO.name.localeCompare(firstAudio.name) > 0;
              const eMenorQueOMaior = insertAudioDTO.name.localeCompare(lastAudio.name) < 0;
              const eMenorQueOMenor = insertAudioDTO.name.localeCompare(firstAudio.name) < 0;
              console.log("eMaiorQueOMenor", eMaiorQueOMenor);
              console.log("eMenorQueOMaior", eMenorQueOMaior);
              // SE O AUDIO DEVE ESTAR NA PÁGINA ATUAL, NÓS REMOVEMOS O ÚLTIMO ELEMENTO, INSERIMOS ESTE NOVO, E DEPOIS REORDENAMOS EM ORDEM ALFABÉTICA
              if (eMaiorQueOMenor && eMenorQueOMaior || eMenorQueOMenor) {
                // VERIFICANDO SE O NOVO SOUND DEVE SER INSERIDO NESTA PÁGINA, OU ENVIADO PARA A P´ROXIMA PÁGINA
                const newSounds = [...sounds].slice(0, sounds.length - 1);
                newSounds.push(insertAudioDTO);
                newSounds.sort((a, b) => a.name.localeCompare(b.name));
                setSounds((prevParam) => (prevParam = newSounds));
                setLastResponsePageContent((prevParam) =>
                  (prevParam = newSounds).slice(-queryParams.size)
                );
                isLastPage.current = false;
                setIntersectionObserverCount((prevParam) => prevParam + 1);
                return;
              }
              // CASO ELE PRECISA SER ENVIADO PARA A PRÓXIMA PÁGINA, NÓS VAMOS APENAS SETAR O IS LAST PAGE PARA FALSE, OU SEJA, POSSUI MAIS PÁGINAS PARA A FRENTE, DEPOIS NÓS INCREMENTAMOS PARA HABILITAR O SCROLL INFINITO
              isLastPage.current = false;
              setIntersectionObserverCount((prevParam) => prevParam + 1);
              return;
            }
          }
        }
        if (!isLastPage.current) {
          const firstAudio = [...sounds].at(0);
          const lastAudio = [...sounds].at(sounds.length - 1);
          if (firstAudio && lastAudio) {
            console.log("FirstAudio e LastAudio existem");
            const eMaiorQueOMenor = insertAudioDTO.name.localeCompare(firstAudio.name) > 0;
            const eMenorQueOMaior = insertAudioDTO.name.localeCompare(lastAudio.name) < 0;
            const eMenorQueOMenor = insertAudioDTO.name.localeCompare(firstAudio.name) < 0;
            console.log("eMaiorQueOMenor", eMaiorQueOMenor);
            console.log("eMenorQueOMaior", eMenorQueOMaior);
            if (eMaiorQueOMenor && eMenorQueOMaior || eMenorQueOMenor) {
              const newSounds = [...sounds].slice(0, sounds.length - 1);
              newSounds.push(insertAudioDTO);
              newSounds.sort((a, b) => a.name.localeCompare(b.name));
              setSounds((prevParam) => (prevParam = newSounds));
              setLastResponsePageContent((prevParam) =>
                (prevParam = newSounds).slice(-queryParams.size)
              );
              return;
            }
            return;
          }
        }
      }

      const inputTextLower = inputText.toLowerCase();
      const insertAudioNameLower = insertAudioDTO.name.toLowerCase();
      const insertAudioNameIncludesInputText = insertAudioNameLower.includes(inputTextLower);

      if (inputText !== "" && insertAudioNameIncludesInputText) {
        if (sounds.length === 0) {
          const newSounds = [...sounds];
          newSounds.push(insertAudioDTO);
          setSounds((prevParam) => (prevParam = newSounds));
          setLastResponsePageContent((prevParam) => (prevParam = newSounds));
          return;
        }
        if (sounds.length < queryParams.size) {
          const newSounds = [...sounds];
          newSounds.push(insertAudioDTO);
          newSounds.sort((a, b) => a.name.localeCompare(b.name));
          setSounds((prevParam) => (prevParam = newSounds));
          setLastResponsePageContent((prevParam) => (prevParam = newSounds));
          return;
        }
        if (sounds.length === queryParams.size) {
          const firstAudio = [...sounds].at(0);
          const lastAudio = [...sounds].at(sounds.length - 1);
          if (firstAudio && lastAudio) {
            // SE O AUDIO DEVE ESTAR NA PÁGINA ATUAL, NÓS REMOVEMOS O ÚLTIMO ELEMENTO, INSERIMOS ESTE NOVO, E DEPOIS REORDENAMOS EM ORDEM ALFABÉTICA
            console.log("FirstAudio e LastAudio existem");
            const eMaiorQueOMenor = insertAudioDTO.name.localeCompare(firstAudio.name) > 0;
            const eMenorQueOMaior = insertAudioDTO.name.localeCompare(lastAudio.name) < 0;
            const eMenorQueOMenor = insertAudioDTO.name.localeCompare(firstAudio.name) < 0;
            console.log("eMaiorQueOMenor", eMaiorQueOMenor);
            console.log("eMenorQueOMaior", eMenorQueOMaior);
            if (eMaiorQueOMenor && eMenorQueOMaior || eMenorQueOMenor) {
              const newSounds = [...sounds].slice(0, sounds.length - 1);
              newSounds.push(insertAudioDTO);
              newSounds.sort((a, b) => a.name.localeCompare(b.name));
              setSounds((prevParam) => (prevParam = newSounds));
              setLastResponsePageContent(
                (prevParam) => (prevParam = newSounds)
              );
              isLastPage.current = false;
              setIntersectionObserverCount((prevParam) => prevParam + 1);
              return;
            }
            // SE NÃO, NÓS APENAS SETAMOS QUE NÃO É A ÚLTIMA PÁGINA E DEPOIS INCREMENTAMOS O ESTADO QUE ATIVA A CRIAÇÃO DO SCROLL INFINITO;
            isLastPage.current = false;
            setIntersectionObserverCount((prevParam) => prevParam + 1);
            return;
          }
        }
        if (sounds.length > queryParams.size) {
          // VERIFICANDO SE É A ÚLTIMA PÁGINA
          if (isLastPage.current) {
            // VERIFICANDO SE AINDA PODEM SER INSERIDOS ELEMENTOS, OU SEJA, SE AINDA POSSUI ELEMENTOS PARA SER INCLUIDOS NESTE MESMA PÁGINA
            if (lastResponsePageContent.length < queryParams.size) {
              console.log("Entro no if de maior doq 12 e menor doq 24");
              console.log("lasrResponsePageContent", lastResponsePageContent);
              const newSounds = [...sounds];
              newSounds.push(insertAudioDTO);
              newSounds.sort((a, b) => a.name.localeCompare(b.name));
              setSounds((prevParam) => (prevParam = newSounds));
              const newLastaPageContentCount =
                lastResponsePageContent.length + 1;
              console.log("newLastaPageContentCount", newLastaPageContentCount);
              const soundsSliced = newSounds.slice(-newLastaPageContentCount);
              console.log("soundsSliced", soundsSliced);
              setLastResponsePageContent(soundsSliced);
              return;
            }
            // VERIFICANDO SE DEVE-SE CRIAR UMA NOVA PÁGINA
            if (lastResponsePageContent.length === queryParams.size) {
              const firstAudio = [...sounds].at(0);
              const lastAudio = [...sounds].at(sounds.length - 1);
              if (firstAudio && lastAudio) {
                console.log("FirstAudio e LastAudio existem");
                const eMaiorQueOMenor = insertAudioDTO.name.localeCompare(firstAudio.name) > 0;
                const eMenorQueOMaior = insertAudioDTO.name.localeCompare(lastAudio.name) < 0;
                const eMenorQueOMenor = insertAudioDTO.name.localeCompare(firstAudio.name) < 0;
                console.log("eMaiorQueOMenor", eMaiorQueOMenor);
                console.log("eMenorQueOMaior", eMenorQueOMaior);
                // SE O AUDIO DEVE ESTAR NA PÁGINA ATUAL, NÓS REMOVEMOS O ÚLTIMO ELEMENTO, INSERIMOS ESTE NOVO, E DEPOIS REORDENAMOS EM ORDEM ALFABÉTICA
                if (eMaiorQueOMenor && eMenorQueOMaior || eMenorQueOMenor) {
                  // VERIFICANDO SE O NOVO SOUND DEVE SER INSERIDO NESTA PÁGINA, OU ENVIADO PARA A P´ROXIMA PÁGINA
                  const newSounds = [...sounds].slice(0, sounds.length - 1);
                  newSounds.push(insertAudioDTO);
                  newSounds.sort((a, b) => a.name.localeCompare(b.name));
                  setSounds((prevParam) => (prevParam = newSounds));
                  setLastResponsePageContent((prevParam) =>
                    (prevParam = newSounds).slice(-queryParams.size)
                  );
                  isLastPage.current = false;
                  setIntersectionObserverCount((prevParam) => prevParam + 1);
                  return;
                }
                // CASO ELE PRECISA SER ENVIADO PARA A PRÓXIMA PÁGINA, NÓS VAMOS APENAS SETAR O IS LAST PAGE PARA FALSE, OU SEJA, POSSUI MAIS PÁGINAS PARA A FRENTE, DEPOIS NÓS INCREMENTAMOS PARA HABILITAR O SCROLL INFINITO
                isLastPage.current = false;
                setIntersectionObserverCount((prevParam) => prevParam + 1);
                return;
              }
            }
          }
          if (!isLastPage.current) {
            const firstAudio = [...sounds].at(0);
            const lastAudio = [...sounds].at(sounds.length - 1);
            if (firstAudio && lastAudio) {
              console.log("FirstAudio e LastAudio existem");
              const eMaiorQueOMenor = insertAudioDTO.name.localeCompare(firstAudio.name) > 0;
              const eMenorQueOMaior = insertAudioDTO.name.localeCompare(lastAudio.name) < 0;
              const eMenorQueOMenor = insertAudioDTO.name.localeCompare(firstAudio.name) < 0;
              console.log("eMaiorQueOMenor", eMaiorQueOMenor);
              console.log("eMenorQueOMaior", eMenorQueOMaior);
              if (eMaiorQueOMenor && eMenorQueOMaior || eMenorQueOMenor) {
                const newSounds = [...sounds].slice(0, sounds.length - 1);
                newSounds.push(insertAudioDTO);
                newSounds.sort((a, b) => a.name.localeCompare(b.name));
                setSounds((prevParam) => (prevParam = newSounds));
                setLastResponsePageContent((prevParam) =>
                  (prevParam = newSounds).slice(-queryParams.size)
                );
                return;
              }
              return;
            }
          }
        }
      }
      if (inputText !== "" && !insertAudioNameIncludesInputText) {
        return;
      }
    }
  }, [insertAudioCount]);

  useEffect(() => {
    if (updateAudioCount > 0) {
      console.log("updateSoundDTO", updateSoundDTO);
      console.log("Entrou no Updated Effect")
      // SEM FILTRO DE TEXTO - SE TIVER SOUNDS, PORÉM FOR MENOR QUE O TAMANHO MÁXIMO POR PÁGINA, ELE APENAS INCLUIR MAS FAZ UMA ORDENAÇÃO ANTES
      if (inputText === "" && sounds.length < queryParams.size) {
        console.log("Entrou no primeiro if")
        const newSounds = [...sounds].filter((sounds) => sounds.id !== updateSoundDTO.id);
        console.log("New sounds", newSounds);
        newSounds.push(updateSoundDTO);
        console.log("New sounds + push", newSounds);
        if(sounds.length === 1){
          console.log("Entrou no sounds igual a 1");
          setSounds((prevParam) => (prevParam = newSounds));
          console.log("Sounds", sounds);
          setLastResponsePageContent((prevParam) => (prevParam = newSounds));
          console.log("LastResponsePageContent", lastResponsePageContent);
          return;
        }
        console.log("Não entrou no if do sounds igual a 1");
        newSounds.sort((a, b) => a.name.localeCompare(b.name));
        console.log("New Sounds + sorted", newSounds);
        setSounds((prevParam) => (prevParam = newSounds));
        console.log("Sounds", sounds);
        setLastResponsePageContent((prevParam) => (prevParam = newSounds));
        console.log("LastResponsePageContent", lastResponsePageContent);
        return;
      }
      if (inputText === "" && sounds.length === queryParams.size) {
        if (isLastPage.current) {
          const newSounds = [...sounds].filter((sounds) => sounds.id !== updateSoundDTO.id);
          newSounds.push(updateSoundDTO);
          newSounds.sort((a, b) => a.name.localeCompare(b.name));
          setSounds((prevParam) => (prevParam = newSounds));
          setLastResponsePageContent((prevParam) => (prevParam = newSounds));
          return;
        }
        const firstAudio = [...sounds].at(0);
        const lastAudio = [...sounds].at(sounds.length - 1);
        if (firstAudio && lastAudio) {
          console.log("FirstAudio e LastAudio existem");
          const eMaiorQueOMenor = updateSoundDTO.name.localeCompare(firstAudio.name) > 0;
          const eMenorQueOMaior = updateSoundDTO.name.localeCompare(lastAudio.name) < 0;
          const eMenorQueOMenor = updateSoundDTO.name.localeCompare(firstAudio.name) < 0;
          console.log("eMaiorQueOMenor", eMaiorQueOMenor);
          console.log("eMenorQueOMaior", eMenorQueOMaior);
          console.log("eMenorQueOMenor", eMenorQueOMenor);
          if (eMaiorQueOMenor && eMenorQueOMaior || eMenorQueOMenor) {
            console.log("Esta entrando no if do menor com maior")
            const newSounds = [...sounds].filter(
              (sounds) => sounds.id !== updateSoundDTO.id
            );
            newSounds.push(updateSoundDTO);
            newSounds.sort((a, b) => a.name.localeCompare(b.name));
            setSounds((prevParam) => (prevParam = newSounds));
            setLastResponsePageContent((prevParam) => (prevParam = newSounds));
            return;
          } else{
            console.log("Entrou no else")
            console.log("Enviando requisição", queryParams);
            soundService
              .findAllSounds(queryParams.name, queryParams.page, queryParams.size)
              .then((response) => {
                console.log("Response UPDATE", response.data.content)
                const newSounds = response.data.content;
                setSounds((prevParam) => (prevParam = newSounds));
                console.log("Sounds", sounds);
                setLastResponsePageContent((prevParam) => (prevParam = newSounds));
                console.log("LastResponsePageContent", lastResponsePageContent);
              });
              return;
          }
        }
      }
      if (inputText === "" && sounds.length > queryParams.size) {
        // VERIFICANDO SE É A ÚLTIMA PÁGINA
        if (isLastPage.current) {
          // VERIFICANDO SE AINDA PODEM SER INSERIDOS ELEMENTOS, OU SEJA, SE AINDA POSSUI ELEMENTOS PARA SER INCLUIDOS NESTE MESMA PÁGINA
          if (lastResponsePageContent.length <= queryParams.size) {
            console.log("Entro no if de maior doq 12 e menor doq 24");
            console.log("lasrResponsePageContent", lastResponsePageContent);
            const newSounds = [...sounds].filter(
              (sounds) => sounds.id !== updateSoundDTO.id
            );
            newSounds.push(updateSoundDTO);
            newSounds.sort((a, b) => a.name.localeCompare(b.name));
            setSounds((prevParam) => (prevParam = newSounds));
            setLastResponsePageContent((prevParam) =>
              (prevParam = newSounds).slice(-lastResponsePageContent.length)
            );
            return;
          }
        }
        if (!isLastPage.current) {
          const firstAudio = [...sounds].at(0);
          const lastAudio = [...sounds].at(sounds.length - 1);
          if (firstAudio && lastAudio) {
            console.log("FirstAudio e LastAudio existem");
            const eMaiorQueOMenor = updateSoundDTO.name.localeCompare(firstAudio.name) > 0;
            const eMenorQueOMaior = updateSoundDTO.name.localeCompare(lastAudio.name) < 0;
            const eMenorQueOMenor = updateSoundDTO.name.localeCompare(firstAudio.name) < 0;
            console.log("eMaiorQueOMenor", eMaiorQueOMenor);
            console.log("eMenorQueOMaior", eMenorQueOMaior);
            if (eMaiorQueOMenor && eMenorQueOMaior || eMenorQueOMenor) {
              const newSounds = [...sounds].filter(
                (sounds) => sounds.id !== updateSoundDTO.id
              );
              newSounds.push(updateSoundDTO);
              newSounds.sort((a, b) => a.name.localeCompare(b.name));
              setSounds((prevParam) => (prevParam = newSounds));
              setLastResponsePageContent((prevParam) =>(prevParam = newSounds).slice(-queryParams.size));
              return;
            }
            console.log("Request", queryParams)
            soundService
              .findAllSounds(
                queryParams.name,
                queryParams.page,
                queryParams.size
              )
              .then((response) => {
                console.log("Response", response.data.content);
                const newLastPageResponseContent: AudioDTO[] = response.data.content;
                console.log("newLastPageResponseContent", newLastPageResponseContent);
                const updatedSoundFiltered = newLastPageResponseContent.filter((sound: AudioDTO) => {
                  return !lastResponsePageContent.some(
                    (filterSound) => filterSound.id === sound.id
                    );
                  }).at(0);
                  console.log("updatedSoundFiltered", updatedSoundFiltered)
                  if (updatedSoundFiltered) {
                    console.log("Entrou no if do soundFiltered")
                    const newSounds = [...sounds].filter(
                      (sounds) => sounds.id !== updateSoundDTO.id
                    );
                  console.log("New Sounds", newSounds);
                  newSounds.push(updatedSoundFiltered);
                  console.log("New sounds + push", newSounds);
                  newSounds.sort((a, b) => a.name.localeCompare(b.name));
                  console.log("New sounds + sort", newSounds);
                  setSounds((prevParam) => (prevParam = newSounds));
                  console.log("Sounds", [...sounds]);
                  setLastResponsePageContent((prevParam) => (prevParam = newLastPageResponseContent));
                  console.log("LastResponsePageContent", [...lastResponsePageContent]);
                }
                return;
              });
          }
        }
      }

      const inputTextLower = inputText.toLowerCase();
      const updateSoundNameLower = updateSoundDTO.name.toLowerCase();
      const updateSoundNameIncludesInputText = updateSoundNameLower.includes(inputTextLower);

      if (inputText !== "" && updateSoundNameIncludesInputText) {
        console.log("Entro no if input text diferente de vazio e o nome do update sound inclui este inputText")
        if (sounds.length < queryParams.size) {
          console.log("Entrou no primeior if")
          const newSounds = [...sounds].filter((sounds) => sounds.id !== updateSoundDTO.id);
          console.log("New sounds", newSounds);
          newSounds.push(updateSoundDTO);
          console.log("New sounds + push", newSounds);
          if(sounds.length === 1){
            console.log("entro no if igual a 1")
            setSounds((prevParam) => (prevParam = newSounds));
            setLastResponsePageContent((prevParam) => (prevParam = newSounds));
            return;
          }
          newSounds.sort((a, b) => a.name.localeCompare(b.name));
          setSounds((prevParam) => (prevParam = newSounds));
          setLastResponsePageContent((prevParam) => (prevParam = newSounds));
          return;
        }
        if (sounds.length === queryParams.size) {
          if (isLastPage.current) {
            const newSounds = [...sounds].filter(
              (sounds) => sounds.id !== updateSoundDTO.id
            );
            newSounds.push(updateSoundDTO);
            newSounds.sort((a, b) => a.name.localeCompare(b.name));
            setSounds((prevParam) => (prevParam = newSounds));
            setLastResponsePageContent((prevParam) => (prevParam = newSounds));
            return;
          }
          const firstAudio = [...sounds].at(0);
          const lastAudio = [...sounds].at(sounds.length - 1);
          if (firstAudio && lastAudio) {
            console.log("FirstAudio e LastAudio existem");
            const eMaiorQueOMenor = updateSoundDTO.name.localeCompare(firstAudio.name) > 0;
            const eMenorQueOMaior = updateSoundDTO.name.localeCompare(lastAudio.name) < 0;
            const eMenorQueOMenor = updateSoundDTO.name.localeCompare(firstAudio.name) < 0;
            console.log("eMaiorQueOMenor", eMaiorQueOMenor);
            console.log("eMenorQueOMaior", eMenorQueOMaior);
            if (eMaiorQueOMenor && eMenorQueOMaior || eMenorQueOMenor) {
              const newSounds = [...sounds].filter(
                (sounds) => sounds.id !== updateSoundDTO.id
              );
              newSounds.push(updateSoundDTO);
              newSounds.sort((a, b) => a.name.localeCompare(b.name));
              setSounds((prevParam) => (prevParam = newSounds));
              setLastResponsePageContent(
                (prevParam) => (prevParam = newSounds)
              );
              return;
            }
            soundService
              .findAllSounds(
                queryParams.name,
                queryParams.page,
                queryParams.size
              )
              .then((response) => {
                const newSounds = response.data.content;
                setSounds((prevParam) => (prevParam = newSounds));
                setLastResponsePageContent(
                  (prevParam) => (prevParam = newSounds)
                );
              });
            return;
          }
        }
        if (sounds.length > queryParams.size) {
          // VERIFICANDO SE É A ÚLTIMA PÁGINA
          if (isLastPage.current) {
            // VERIFICANDO SE AINDA PODEM SER INSERIDOS ELEMENTOS, OU SEJA, SE AINDA POSSUI ELEMENTOS PARA SER INCLUIDOS NESTE MESMA PÁGINA
            if (lastResponsePageContent.length <= queryParams.size) {
              console.log("Entro no if de maior doq 12 e menor doq 24");
              console.log("lasrResponsePageContent", lastResponsePageContent);
              const newSounds = [...sounds].filter(
                (sounds) => sounds.id !== updateSoundDTO.id
              );
              newSounds.push(updateSoundDTO);
              newSounds.sort((a, b) => a.name.localeCompare(b.name));
              setSounds((prevParam) => (prevParam = newSounds));
              setLastResponsePageContent((prevParam) =>
                (prevParam = newSounds).slice(-lastResponsePageContent.length)
              );
              return;
            }
          }
          if (!isLastPage.current) {
            const firstAudio = [...sounds].at(0);
            const lastAudio = [...sounds].at(sounds.length - 1);
            if (firstAudio && lastAudio) {
              console.log("FirstAudio e LastAudio existem");
              const eMaiorQueOMenor = updateSoundDTO.name.localeCompare(firstAudio.name) > 0;
              const eMenorQueOMaior = updateSoundDTO.name.localeCompare(lastAudio.name) < 0;
              const eMenorQueOMenor = updateSoundDTO.name.localeCompare(firstAudio.name) < 0;
              console.log("eMaiorQueOMenor", eMaiorQueOMenor);
              console.log("eMenorQueOMaior", eMenorQueOMaior);
              if (eMaiorQueOMenor && eMenorQueOMaior || eMenorQueOMenor) {
                const newSounds = [...sounds].filter(
                  (sounds) => sounds.id !== updateSoundDTO.id
                );
                newSounds.push(updateSoundDTO);
                newSounds.sort((a, b) => a.name.localeCompare(b.name));
                setSounds((prevParam) => (prevParam = newSounds));
                setLastResponsePageContent((prevParam) =>
                  (prevParam = newSounds).slice(-queryParams.size)
                );
                return;
              }
              soundService
                .findAllSounds(
                  queryParams.name,
                  queryParams.page,
                  queryParams.size
                )
                .then((response) => {
                  const newLastPageResponseContent: AudioDTO[] =
                    response.data.content;
                  const updatedSoundFiltered = newLastPageResponseContent
                    .filter((sound: AudioDTO) => {
                      return !lastResponsePageContent.some(
                        (filterSound) => filterSound.id === sound.id
                      );
                    })
                    .at(0);
                  if (updatedSoundFiltered) {
                    const newSounds = [...sounds].filter(
                      (sounds) => sounds.id !== updateSoundDTO.id
                    );
                    newSounds.push(updatedSoundFiltered);
                    newSounds.sort((a, b) => a.name.localeCompare(b.name));
                    setSounds((prevParam) => (prevParam = newSounds));
                    setLastResponsePageContent(
                      (prevParam) => (prevParam = newLastPageResponseContent)
                    );
                  }
                  return;
                });
            }
          }
        }
      }
      if (inputText !== "" && !updateSoundNameIncludesInputText) {
        if (sounds.length < queryParams.size) {
          const newSounds = [...sounds].filter(
            (sounds) => sounds.id !== updateSoundDTO.id
          );
          setSounds((prevParam) => (prevParam = newSounds));
          setLastResponsePageContent((prevParam) => (prevParam = newSounds));
          return;
        }
        if (sounds.length === queryParams.size) {
          if (isLastPage.current) {
            const newSounds = [...sounds].filter(
              (sounds) => sounds.id !== updateSoundDTO.id
            );
            setSounds((prevParam) => (prevParam = newSounds));
            setLastResponsePageContent((prevParam) => (prevParam = newSounds));
            return;
          }
          soundService
            .findAllSounds(queryParams.name, queryParams.page, queryParams.size)
            .then((response) => {
              const newLastPageResponseContent: AudioDTO[] =
                response.data.content;
              const updatedSoundFiltered = newLastPageResponseContent
                .filter((sound: AudioDTO) => {
                  return !lastResponsePageContent.some(
                    (filterSound) => filterSound.id === sound.id
                  );
                })
                .at(0);
              if (updatedSoundFiltered) {
                const newSounds = [...sounds].filter(
                  (sounds) => sounds.id !== updateSoundDTO.id
                );
                newSounds.push(updatedSoundFiltered);
                newSounds.sort((a, b) => a.name.localeCompare(b.name));
                setSounds((prevParam) => (prevParam = newSounds));
                setLastResponsePageContent(
                  (prevParam) => (prevParam = newLastPageResponseContent)
                );
              }
              return;
            });
        }
        if (sounds.length > queryParams.size) {
          // VERIFICANDO SE É A ÚLTIMA PÁGINA
          if (isLastPage.current) {
            // VERIFICANDO SE AINDA PODEM SER INSERIDOS ELEMENTOS, OU SEJA, SE AINDA POSSUI ELEMENTOS PARA SER INCLUIDOS NESTE MESMA PÁGINA
            if (lastResponsePageContent.length <= queryParams.size) {
              console.log("Entro no if de maior doq 12 e menor doq 24");
              console.log("lasrResponsePageContent", lastResponsePageContent);
              const newSounds = [...sounds].filter(
                (sounds) => sounds.id !== updateSoundDTO.id
              );
              setSounds((prevParam) => (prevParam = newSounds));
              setLastResponsePageContent((prevParam) =>
                (prevParam = newSounds).slice(-lastResponsePageContent.length - 1)
              );
              return;
            }
          }
          if (!isLastPage.current) {
            soundService
              .findAllSounds(
                queryParams.name,
                queryParams.page,
                queryParams.size
              )
              .then((response) => {
                const newLastPageResponseContent: AudioDTO[] =
                  response.data.content;
                const updatedSoundFiltered = newLastPageResponseContent
                  .filter((sound: AudioDTO) => {
                    return !lastResponsePageContent.some(
                      (filterSound) => filterSound.id === sound.id
                    );
                  })
                  .at(0);
                if (updatedSoundFiltered) {
                  const newSounds = [...sounds].filter(
                    (sounds) => sounds.id !== updateSoundDTO.id
                  );
                  newSounds.push(updatedSoundFiltered);
                  newSounds.sort((a, b) => a.name.localeCompare(b.name));
                  setSounds((prevParam) => (prevParam = newSounds));
                  setLastResponsePageContent(
                    (prevParam) => (prevParam = newLastPageResponseContent)
                  );
                }
                return;
              });
          }
        }
      }
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
