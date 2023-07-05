import { PageReloadDTO, UseType } from "../models/page";

export function reloadPage<T extends { name: string, id: string }>(
  pageReloadDTO: PageReloadDTO<T>
) {
  const inputTextLower = pageReloadDTO.inputText.toLowerCase();
  const newObjectNameLower = pageReloadDTO.newObject.name.toLowerCase();
  const newObjectNameIncludesInputText = newObjectNameLower.includes(inputTextLower);
  const scenaryType: string = validateReloadScenaryType(pageReloadDTO.useType, pageReloadDTO.inputText, pageReloadDTO.objects.length, pageReloadDTO.queryParams.size, pageReloadDTO.isLastPageRef.current, pageReloadDTO.lastResponsePageContent.length, newObjectNameIncludesInputText);

  switch (scenaryType) {
    case IATI0OLI0:
    case IATD0NIITOLI0:
      const newObjectsIATI0OLI0 = [...pageReloadDTO.objects]; // Cria uma cópia do array sounds
      newObjectsIATI0OLI0.push(pageReloadDTO.newObject);
      pageReloadDTO.setObjects((prevParam) => (prevParam = newObjectsIATI0OLI0));
      pageReloadDTO.setLastResponsePageContent((prevParam) => (prevParam = newObjectsIATI0OLI0));
      break;
    case IATI0OLMEQS:
    case IATD0NIITOLMEQS:
      const newObjectsIATI0OLMEQS = [...pageReloadDTO.objects]; // Cria uma cópia do array sounds
      newObjectsIATI0OLMEQS.push(pageReloadDTO.newObject);
      newObjectsIATI0OLMEQS.sort((a, b) => a.name.localeCompare(b.name));
      pageReloadDTO.setObjects((prevParam) => (prevParam = newObjectsIATI0OLMEQS));
      pageReloadDTO.setLastResponsePageContent((prevParam) => (prevParam = newObjectsIATI0OLMEQS));
      break;
    case UATI0OLMEQSOLI1:
    case UATD0NIITOLMEQSOLI1:
      const newObjectsUATI0OLMEQSOLI1 = [...pageReloadDTO.objects].filter((object) => object.id !== pageReloadDTO.newObject.id);
      newObjectsUATI0OLMEQSOLI1.push(pageReloadDTO.newObject);
      pageReloadDTO.setObjects((prevParam) => (prevParam = newObjectsUATI0OLMEQSOLI1));
      pageReloadDTO.setLastResponsePageContent((prevParam) => (prevParam = newObjectsUATI0OLMEQSOLI1));
      break;
    case UATI0OLMEQS:
    case UATD0NIITOLMEQS:
    case UATI0OLIQSILP:
    case UATD0NIITOLIQSILP:
      const newObjectsUATI0OLMEQS = [...pageReloadDTO.objects].filter((object) => object.id !== pageReloadDTO.newObject.id);
      newObjectsUATI0OLMEQS.push(pageReloadDTO.newObject);
      newObjectsUATI0OLMEQS.sort((a, b) => a.name.localeCompare(b.name));
      pageReloadDTO.setObjects((prevParam) => (prevParam = newObjectsUATI0OLMEQS));
      pageReloadDTO.setLastResponsePageContent((prevParam) => (prevParam = newObjectsUATI0OLMEQS));
      break;
    case IATI0OLIQS:
    case IATD0NIITOLIQS:
      const firstAudioIATI0OLIQS = [...pageReloadDTO.objects].at(0);
      const lastAudioIATI0OLIQS = [...pageReloadDTO.objects].at([...pageReloadDTO.objects].length - 1);
      if (firstAudioIATI0OLIQS && lastAudioIATI0OLIQS) {
        const eMaiorQueOMenorIATI0OLIQS = pageReloadDTO.newObject.name.localeCompare(firstAudioIATI0OLIQS.name) > 0;
        const eMenorQueOMaiorIATI0OLIQS = pageReloadDTO.newObject.name.localeCompare(lastAudioIATI0OLIQS.name) < 0;
        const eMenorQueOMenorIATI0OLIQS = pageReloadDTO.newObject.name.localeCompare(firstAudioIATI0OLIQS.name) < 0;
        if ((eMaiorQueOMenorIATI0OLIQS && eMenorQueOMaiorIATI0OLIQS) || eMenorQueOMenorIATI0OLIQS) {
          const newObjectsIATI0OLIQS = [...pageReloadDTO.objects].slice(0, [...pageReloadDTO.objects].length - 1);
          newObjectsIATI0OLIQS.push(pageReloadDTO.newObject);
          newObjectsIATI0OLIQS.sort((a, b) => a.name.localeCompare(b.name));
          pageReloadDTO.setObjects((prevParam) => (prevParam = newObjectsIATI0OLIQS));
          pageReloadDTO.setLastResponsePageContent((prevParam) => (prevParam = newObjectsIATI0OLIQS));
          pageReloadDTO.isLastPageRef.current = false;
          pageReloadDTO.setIntersectionObserverCount((prevParam) => prevParam + 1);
          break;
        }
        pageReloadDTO.isLastPageRef.current = false;
        pageReloadDTO.setIntersectionObserverCount((prevParam) => prevParam + 1);
        break;
      }
    case UATI0OLIQS:
    case UATD0NIITOLIQS:
      const firstAudioUATI0OLIQS = [...pageReloadDTO.objects].at(0);
      const lastAudioUATI0OLIQS = [...pageReloadDTO.objects].at([...pageReloadDTO.objects].length - 1);
      if (firstAudioUATI0OLIQS && lastAudioUATI0OLIQS) {
        const eMaiorQueOMenorUATI0OLIQS = pageReloadDTO.newObject.name.localeCompare(firstAudioUATI0OLIQS.name) > 0;
        const eMenorQueOMaiorUATI0OLIQS = pageReloadDTO.newObject.name.localeCompare(lastAudioUATI0OLIQS.name) < 0;
        const eMenorQueOMenorUATI0OLIQS = pageReloadDTO.newObject.name.localeCompare(firstAudioUATI0OLIQS.name) < 0;
        if ((eMaiorQueOMenorUATI0OLIQS && eMenorQueOMaiorUATI0OLIQS) || eMenorQueOMenorUATI0OLIQS) {
          const newObjectsUATI0OLIQS = [...pageReloadDTO.objects].filter((sounds) => sounds.id !== pageReloadDTO.newObject.id);
          newObjectsUATI0OLIQS.push(pageReloadDTO.newObject);
          newObjectsUATI0OLIQS.sort((a, b) => a.name.localeCompare(b.name));
          pageReloadDTO.setObjects((prevParam) => (prevParam = newObjectsUATI0OLIQS));
          pageReloadDTO.setLastResponsePageContent((prevParam) => (prevParam = newObjectsUATI0OLIQS));
          break;
        }
        pageReloadDTO.findAllWithPageable(pageReloadDTO.queryParams.name, pageReloadDTO.queryParams.page, pageReloadDTO.queryParams.size)
          .then((response: any) => {
            const newObjectsUATI0OLIQS: T[] = response.data.content;
            pageReloadDTO.setObjects((prevParam) => (prevParam = newObjectsUATI0OLIQS));
            pageReloadDTO.setLastResponsePageContent((prevParam) => (prevParam = newObjectsUATI0OLIQS));
          });
        break;
      }
    case IATI0OLMAQSILPLPLMEQS:
    case IATD0NIITOLMAQSILPLPLMEQS:
      const newObjectsIATI0OLMAQSILPLPLMEQS = [...pageReloadDTO.objects];
      newObjectsIATI0OLMAQSILPLPLMEQS.push(pageReloadDTO.newObject);
      newObjectsIATI0OLMAQSILPLPLMEQS.sort((a, b) => a.name.localeCompare(b.name));
      pageReloadDTO.setObjects((prevParam) => (prevParam = newObjectsIATI0OLMAQSILPLPLMEQS));
      const newLastaPageContentCountIATI0OLMAQSILPLPLMEQS = pageReloadDTO.lastResponsePageContent.length + 1;
      const soundsSlicedIATI0OLMAQSILPLPLMEQS = newObjectsIATI0OLMAQSILPLPLMEQS.slice(-newLastaPageContentCountIATI0OLMAQSILPLPLMEQS);
      pageReloadDTO.setLastResponsePageContent(soundsSlicedIATI0OLMAQSILPLPLMEQS);
      break;
    case UATI0OLMAQSILPLPLMEOIQS:
    case UATD0NIITOLMAQSILPLPLMEOIQS:
      const newSoundsUATI0OLMAQSILPLPLMEOIQS = [...pageReloadDTO.objects].filter((object) => object.id !== pageReloadDTO.newObject.id);
      newSoundsUATI0OLMAQSILPLPLMEOIQS.push(pageReloadDTO.newObject);
      newSoundsUATI0OLMAQSILPLPLMEOIQS.sort((a, b) => a.name.localeCompare(b.name));
      pageReloadDTO.setObjects((prevParam) => (prevParam = newSoundsUATI0OLMAQSILPLPLMEOIQS));
      pageReloadDTO.setLastResponsePageContent((prevParam) => (prevParam = newSoundsUATI0OLMAQSILPLPLMEOIQS).slice(-pageReloadDTO.lastResponsePageContent.length));
      break;
    case IATI0OLMAQSILPLPLIQS:
    case IATD0NIITOLMAQSILPLPLIQS:
      const firstAudioIATI0OLMAQSILPLPLIQS = [...pageReloadDTO.objects].at(0);
      const lastAudioIATI0OLMAQSILPLPLIQS = [...pageReloadDTO.objects].at(pageReloadDTO.objects.length - 1);
      if (firstAudioIATI0OLMAQSILPLPLIQS && lastAudioIATI0OLMAQSILPLPLIQS) {
        const eMaiorQueOMenorIATI0OLMAQSILPLPLIQS = pageReloadDTO.newObject.name.localeCompare(firstAudioIATI0OLMAQSILPLPLIQS.name) > 0;
        const eMenorQueOMaiorIATI0OLMAQSILPLPLIQS = pageReloadDTO.newObject.name.localeCompare(lastAudioIATI0OLMAQSILPLPLIQS.name) < 0;
        const eMenorQueOMenorIATI0OLMAQSILPLPLIQS = pageReloadDTO.newObject.name.localeCompare(firstAudioIATI0OLMAQSILPLPLIQS.name) < 0;
        if (eMaiorQueOMenorIATI0OLMAQSILPLPLIQS && eMenorQueOMaiorIATI0OLMAQSILPLPLIQS || eMenorQueOMenorIATI0OLMAQSILPLPLIQS) {
          const newObjectsIATI0OLMAQSILPLPLIQS = [...pageReloadDTO.objects].slice(0, pageReloadDTO.objects.length - 1);
          newObjectsIATI0OLMAQSILPLPLIQS.push(pageReloadDTO.newObject);
          newObjectsIATI0OLMAQSILPLPLIQS.sort((a, b) => a.name.localeCompare(b.name));
          pageReloadDTO.setObjects((prevParam) => (prevParam = newObjectsIATI0OLMAQSILPLPLIQS));
          pageReloadDTO.setLastResponsePageContent((prevParam) =>(prevParam = newObjectsIATI0OLMAQSILPLPLIQS).slice(-pageReloadDTO.queryParams.size));
          pageReloadDTO.isLastPageRef.current = false;
          pageReloadDTO.setIntersectionObserverCount((prevParam) => prevParam + 1);
          break;
        }
        pageReloadDTO.isLastPageRef.current = false;
        pageReloadDTO.setIntersectionObserverCount((prevParam) => prevParam + 1);
        break;
      }
    case IATI0OLMAQSNILP:
    case IATD0NIITOLMAQSNILP:
      const firstAudioIATI0OLMAQSNILP = [...pageReloadDTO.objects].at(0);
      const lastAudioIATI0OLMAQSNILP = [...pageReloadDTO.objects].at(pageReloadDTO.objects.length - 1);
      if (firstAudioIATI0OLMAQSNILP && lastAudioIATI0OLMAQSNILP) {
        const eMaiorQueOMenorIATI0OLMAQSNILP = pageReloadDTO.newObject.name.localeCompare(firstAudioIATI0OLMAQSNILP.name) > 0;
        const eMenorQueOMaiorIATI0OLMAQSNILP = pageReloadDTO.newObject.name.localeCompare(lastAudioIATI0OLMAQSNILP.name) < 0;
        const eMenorQueOMenorIATI0OLMAQSNILP = pageReloadDTO.newObject.name.localeCompare(firstAudioIATI0OLMAQSNILP.name) < 0;
        if (eMaiorQueOMenorIATI0OLMAQSNILP && eMenorQueOMaiorIATI0OLMAQSNILP || eMenorQueOMenorIATI0OLMAQSNILP) {
          const newObjectsIATI0OLMAQSNILP = [...pageReloadDTO.objects].slice(0, pageReloadDTO.objects.length - 1);
          newObjectsIATI0OLMAQSNILP.push(pageReloadDTO.newObject);
          newObjectsIATI0OLMAQSNILP.sort((a, b) => a.name.localeCompare(b.name));
          pageReloadDTO.setObjects((prevParam) => (prevParam = newObjectsIATI0OLMAQSNILP));
          pageReloadDTO.setLastResponsePageContent((prevParam) => (prevParam = newObjectsIATI0OLMAQSNILP).slice(-pageReloadDTO.queryParams.size));
          break;
        }
        break;
      }
    case UATI0OLMAQSNILP:
    case UATD0NIITOLMAQSNILP:
      const firstAudioUATI0OLMAQSNILP = [...pageReloadDTO.objects].at(0);
      const lastAudioUATI0OLMAQSNILP = [...pageReloadDTO.objects].at(pageReloadDTO.objects.length - 1);
      if (firstAudioUATI0OLMAQSNILP && lastAudioUATI0OLMAQSNILP) {
        const eMaiorQueOMenorUATI0OLMAQSNILP = pageReloadDTO.newObject.name.localeCompare(firstAudioUATI0OLMAQSNILP.name) > 0;
        const eMenorQueOMaiorUATI0OLMAQSNILP = pageReloadDTO.newObject.name.localeCompare(lastAudioUATI0OLMAQSNILP.name) < 0;
        const eMenorQueOMenorUATI0OLMAQSNILP = pageReloadDTO.newObject.name.localeCompare(firstAudioUATI0OLMAQSNILP.name) < 0;
        if (eMaiorQueOMenorUATI0OLMAQSNILP && eMenorQueOMaiorUATI0OLMAQSNILP || eMenorQueOMenorUATI0OLMAQSNILP) {
          const newObjectsUATI0OLMAQSNILP = [...pageReloadDTO.objects].filter((object) => object.id !== pageReloadDTO.newObject.id);
          newObjectsUATI0OLMAQSNILP.push(pageReloadDTO.newObject);
          newObjectsUATI0OLMAQSNILP.sort((a, b) => a.name.localeCompare(b.name));
          pageReloadDTO.setObjects((prevParam) => (prevParam = newObjectsUATI0OLMAQSNILP));
          pageReloadDTO.setLastResponsePageContent((prevParam) =>(prevParam = newObjectsUATI0OLMAQSNILP).slice(-pageReloadDTO.queryParams.size));
          break;
        }
        pageReloadDTO.findAllWithPageable(pageReloadDTO.queryParams.name, pageReloadDTO.queryParams.page, pageReloadDTO.queryParams.size)
          .then((response: any) => {
            const newLastPageResponseContentUATI0OLMAQSNILP: T[] = response.data.content;
            const updatedSoundFilteredUATI0OLMAQSNILP = newLastPageResponseContentUATI0OLMAQSNILP.filter((object: T) => {
              return !pageReloadDTO.lastResponsePageContent.some((filterSound) => filterSound.id === object.id);
              }).at(0);
              if (updatedSoundFilteredUATI0OLMAQSNILP) {
              const newObjectsUATI0OLMAQSNILP = [...pageReloadDTO.objects].filter((sounds) => sounds.id !== pageReloadDTO.newObject.id);
              newObjectsUATI0OLMAQSNILP.push(updatedSoundFilteredUATI0OLMAQSNILP);
              newObjectsUATI0OLMAQSNILP.sort((a, b) => a.name.localeCompare(b.name));
              pageReloadDTO.setObjects((prevParam) => (prevParam = newObjectsUATI0OLMAQSNILP));
              pageReloadDTO.setLastResponsePageContent((prevParam) => (prevParam = newLastPageResponseContentUATI0OLMAQSNILP));
            }
        });
        break;
      }
    case IATD0NNIIT:
      break;
    case UATD0NNIITOLMEQS:
    case UATD0NNIITOLIQSILP:
      const newObjectsUATD0NNIITOLMEQS = [...pageReloadDTO.objects].filter((object) => object.id !== pageReloadDTO.newObject.id);
      pageReloadDTO.setObjects((prevParam) => (prevParam = newObjectsUATD0NNIITOLMEQS));
      pageReloadDTO.setLastResponsePageContent((prevParam) => (prevParam = newObjectsUATD0NNIITOLMEQS));
      break;
    case UATD0NNIITOLIQSNILP:
      pageReloadDTO
      .findAllWithPageable(pageReloadDTO.queryParams.name, pageReloadDTO.queryParams.page, pageReloadDTO.queryParams.size)
      .then((response) => {
        const newLastPageResponseContentUATD0NNIITOLIQSNILP: T[] = response.data.content;
        const updatedSoundFilteredUATD0NNIITOLIQSNILP = newLastPageResponseContentUATD0NNIITOLIQSNILP.filter((object: T) => {
            return !pageReloadDTO.lastResponsePageContent.some((filterSound) => filterSound.id === object.id);
        }).at(0);
        if (updatedSoundFilteredUATD0NNIITOLIQSNILP) {
          const newObjectsUATD0NNIITOLIQSNILP = [...pageReloadDTO.objects].filter((object) => object.id !== pageReloadDTO.newObject.id);
          newObjectsUATD0NNIITOLIQSNILP.push(updatedSoundFilteredUATD0NNIITOLIQSNILP);
          newObjectsUATD0NNIITOLIQSNILP.sort((a, b) => a.name.localeCompare(b.name));
          pageReloadDTO.setObjects((prevParam) => (prevParam = newObjectsUATD0NNIITOLIQSNILP));
          pageReloadDTO.setLastResponsePageContent((prevParam) => (prevParam = newLastPageResponseContentUATD0NNIITOLIQSNILP));
        }
      });
      break;
    case UATD0NNIITOLMAQSILPLPLMEOIQS:
      const newObjectsUATD0NNIITOLMAQSILPLPLMEOIQS = [...pageReloadDTO.objects].filter((object) => object.id !== pageReloadDTO.newObject.id);
      pageReloadDTO.setObjects((prevParam) => (prevParam = newObjectsUATD0NNIITOLMAQSILPLPLMEOIQS));
      pageReloadDTO.setLastResponsePageContent((prevParam) =>(prevParam = newObjectsUATD0NNIITOLMAQSILPLPLMEOIQS).slice(-pageReloadDTO.lastResponsePageContent.length - 1));
      break;
    case UATD0NNIITOLMAQSNILP:
      pageReloadDTO
      .findAllWithPageable(pageReloadDTO.queryParams.name, pageReloadDTO.queryParams.page, pageReloadDTO.queryParams.size)
      .then((response) => {
        const newLastPageResponseContentUATD0NNIITOLMAQSNILP: T[] =response.data.content;
        const updatedSoundFilteredUATD0NNIITOLMAQSNILP = newLastPageResponseContentUATD0NNIITOLMAQSNILP.filter((object: T) => {
            return !pageReloadDTO.lastResponsePageContent.some((filterSound) => filterSound.id === object.id);
        }).at(0);
        if (updatedSoundFilteredUATD0NNIITOLMAQSNILP) {
          const newSoundsUATD0NNIITOLMAQSNILP = [...pageReloadDTO.objects].filter((sounds) => sounds.id !== pageReloadDTO.newObject.id);
          newSoundsUATD0NNIITOLMAQSNILP.push(updatedSoundFilteredUATD0NNIITOLMAQSNILP);
          newSoundsUATD0NNIITOLMAQSNILP.sort((a, b) => a.name.localeCompare(b.name));
          pageReloadDTO.setObjects((prevParam) => (prevParam = newSoundsUATD0NNIITOLMAQSNILP));
          pageReloadDTO.setLastResponsePageContent((prevParam) => (prevParam = newLastPageResponseContentUATD0NNIITOLMAQSNILP));
        }
      });
      break;
  }
}

function validateReloadScenaryType(
  useType: UseType,
  inputText: string,
  objectsLength: number,
  queryParamSize: number,
  isLastPage: boolean,
  lastPageLength: number,
  nameIncludesInputText: boolean
): string {
  if (inputText === "" && objectsLength === 0) {
    if (useType === UseType.INSERT) {
      return IATI0OLI0;
    }
  }
  if (inputText === "" && objectsLength < queryParamSize) {
    if (useType === UseType.INSERT) {
      return IATI0OLMEQS;
    }
    if (useType === UseType.UPDATE) {
      if (objectsLength === 1) {
        return UATI0OLMEQSOLI1;
      }
      return UATI0OLMEQS;
    }
  }
  if (inputText === "" && objectsLength === queryParamSize) {
    if (useType === UseType.INSERT) {
      return IATI0OLIQS;
    }
    if (useType === UseType.UPDATE) {
      if (isLastPage) {
        return UATI0OLIQSILP;
      }
      return UATI0OLIQS;
    }
  }
  if (inputText === "" && objectsLength > queryParamSize && isLastPage && lastPageLength < queryParamSize) {
    if (useType === UseType.INSERT) {
      return IATI0OLMAQSILPLPLMEQS;
    }
    if (useType === UseType.UPDATE) {
      return UATI0OLMAQSILPLPLMEOIQS;
    }
  }
  if (inputText === "" && objectsLength > queryParamSize && isLastPage && lastPageLength === queryParamSize) {
    if (useType === UseType.INSERT) {
      return IATI0OLMAQSILPLPLIQS;
    }
    if (useType === UseType.UPDATE) {
      return UATI0OLMAQSILPLPLMEOIQS;
    }
  }
  if (inputText === "" && objectsLength > queryParamSize && !isLastPage) {
    if (useType === UseType.INSERT) {
      return IATI0OLMAQSNILP;
    }
    if (useType === UseType.UPDATE) {
      return UATI0OLMAQSNILP;
    }
  }
  if (inputText !== "" && nameIncludesInputText && objectsLength === 0) {
    if (useType === UseType.INSERT) {
      return IATD0NIITOLI0;
    }
  }
  if (inputText !== "" && nameIncludesInputText && objectsLength < queryParamSize) {
    if (useType === UseType.INSERT) {
      return IATD0NIITOLMEQS;
    }
    if (useType === UseType.UPDATE) {
      if (objectsLength === 1) {
        return UATD0NIITOLMEQSOLI1;
      }
      return UATD0NIITOLMEQS;
    }
  }
  if (inputText !== "" && nameIncludesInputText && objectsLength === queryParamSize) {
    if (useType === UseType.INSERT) {
      return IATD0NIITOLIQS;
    }
    if (useType === UseType.UPDATE) {
      if (isLastPage) {
        return UATD0NIITOLIQSILP;
      }
      return UATD0NIITOLIQS;
    }
  }
  if (inputText !== "" && nameIncludesInputText && objectsLength > queryParamSize && isLastPage && lastPageLength < queryParamSize) {
    if (useType === UseType.INSERT) {
      return IATD0NIITOLMAQSILPLPLMEQS;
    }
    if (useType === UseType.UPDATE) {
      return UATD0NIITOLMAQSILPLPLMEOIQS;
    }
  }
  if (inputText !== "" && nameIncludesInputText && objectsLength > queryParamSize && isLastPage && lastPageLength === queryParamSize) {
    if (useType === UseType.INSERT) {
      return IATD0NIITOLMAQSILPLPLIQS;
    }
    if (useType === UseType.UPDATE) {
      return UATD0NIITOLMAQSILPLPLMEOIQS;
    }
  }
  if (inputText !== "" && nameIncludesInputText && objectsLength > queryParamSize && !isLastPage) {
    if (useType === UseType.INSERT) {
      return IATD0NIITOLMAQSNILP;
    }
    if (useType === UseType.UPDATE) {
      return UATD0NIITOLMAQSNILP;
    }
  }
  if (inputText !== "" && !nameIncludesInputText) {
    if (useType === UseType.INSERT) {
      return IATD0NNIIT;
    }
    if (useType === UseType.UPDATE) {
      if (objectsLength < queryParamSize) {
        return UATD0NNIITOLMEQS;
      }
      if (objectsLength === queryParamSize) {
        if (isLastPage) {
          return UATD0NNIITOLIQSILP;
        }
        return UATD0NNIITOLIQSNILP;
      }
      if (objectsLength > queryParamSize) {
        if (isLastPage && lastPageLength <= queryParamSize) {
          return UATD0NNIITOLMAQSILPLPLMEOIQS;
        }
        if (!isLastPage) {
          return UATD0NNIITOLMAQSNILP;
        }
      }
    }
  }
  return "";
}

//RELOAD PAGE SCENARIES

//1 - INSERT AUDIO
const IATI0OLI0 = "INSERT AUDIO - Text igual a 0 e objects length igual a 0";
const IATI0OLMEQS = "INSERT AUDIO - Text igual a 0 e objects length menor que query size";
const IATI0OLIQS = "INSERT AUDIO - Text igual a 0 e objects length igual que query size";
const IATI0OLMAQSILPLPLMEQS = "INSERT AUDIO - Text igual a 0, objects length maior que query size, é a última página, last page length menor que query size";
const IATI0OLMAQSILPLPLIQS = "INSERT AUDIO - Text igual a 0, objects length maior que query size, é a última página, last page length igual que query size";
const IATI0OLMAQSNILP = "INSERT AUDIO - Text igual a 0, objects length maior que query size, mas não é a última página";
const IATD0NIITOLI0 = "INSERT AUDIO - Text diferente de 0, name inclui input text e objects length igual a 0";
const IATD0NIITOLMEQS = "INSERT AUDIO - Text diferente de 0, name inclui input text e objects length menor que query size";
const IATD0NIITOLIQS = "INSERT AUDIO - Text diferente de 0, name inclui input text e objects length igual a query size";
const IATD0NIITOLMAQSILPLPLMEQS = "INSERT AUDIO - Text diferente de 0, name inclui input text, objects length maior a query size, é a última página e last page length menor que query size";
const IATD0NIITOLMAQSILPLPLIQS = "INSERT AUDIO - Text diferente de 0, name inclui input text, objects length maior a query size, é a última página e last page length igual que query size";
const IATD0NIITOLMAQSNILP = "INSERT AUDIO - Text diferente de 0, name inclui input text, objects length maior a query size e não é a última página";
const IATD0NNIIT = "INSERT AUDIO - Text diferente de 0 e name não inclui input text";

//2 - UPDATE AUDIO
const UATI0OLMEQS = "UPDATE AUDIO - Text igual a 0 e objects length igual a 0";
const UATI0OLMEQSOLI1 = "UPDATE AUDIO - Text igual a 0 e objects length igual a 0 e objects length igual a 1";
const UATI0OLIQS = "UPDATE AUDIO - Text igual a 0 e objects length menor que query size";
const UATI0OLIQSILP = "UPDATE AUDIO - Text igual a 0, objects length igual que query size e é a última página";
const UATI0OLMAQSILPLPLMEOIQS = "UPDATE AUDIO - Text igual a 0, objects length maior que query size, é a última página, last page length menor ou igual que query size";
const UATI0OLMAQSNILP = "UPDATE AUDIO - Text igual a 0, objects length maior que query size, mas não é a última página";
const UATD0NIITOLMEQS = "UPDATE AUDIO - Text diferente de 0, name inclui input text e objects length menor que query size";
const UATD0NIITOLMEQSOLI1 = "UPDATE AUDIO - Text diferente de 0, name inclui input text, objects length menor que query size e objects length igual a 1";
const UATD0NIITOLIQS = "UPDATE AUDIO - Text diferente de 0, name inclui input text e objects length igual a query size";
const UATD0NIITOLIQSILP = "UPDATE AUDIO - Text diferente de 0, name inclui input text, objects length igual a query size e é a última página";
const UATD0NIITOLMAQSILPLPLMEOIQS = "UPDATE AUDIO - Text diferente de 0, name inclui input text, objects length maior a query size, é a última página e last page length menor ou igual que query size";
const UATD0NIITOLMAQSNILP = "UPDATE AUDIO - Text diferente de 0, name inclui input text, objects length maior a query size e não é a última página";
const UATD0NNIITOLMEQS = "UPDATE AUDIO - Text diferente de 0, name não inclui input text e objects length menor que query size";
const UATD0NNIITOLIQSILP = "UPDATE AUDIO - Text diferente de 0, name não inclui input text,objects length igual que query size e é a última página";
const UATD0NNIITOLIQSNILP = "UPDATE AUDIO - Text diferente de 0, name não inclui input text,objects length igual que query size e não é a última página";
const UATD0NNIITOLMAQSILPLPLMEOIQS = "UPDATE AUDIO - Text diferente de 0, name não inclui input text,objects length maior que query size, é a última página e last page length é menor ou igual que query size";
const UATD0NNIITOLMAQSNILP = "UPDATE AUDIO - Text diferente de 0, name não inclui input text,objects length maior que query size e não é a última página";