import axios from "axios";
import { Buffer } from "buffer";
import { useContext, useEffect, useState } from "react";
import { AudioDTO } from "../../models/audio";
import { TesteAudioDTO } from "../../models/testeAudio";
import * as soundService from "../../services/sound-service";
import { ContextPlayer } from "../../utils/context-player";
import SoundSampleRow from "../SoundSampleRow";
import SoundSampleRowTeste from "../SoundSampleRowTeste";
import "./styles.scss";
import { CategoryDTO } from "../../models/category";
import { TesteAudioResponseDTO } from "../../models/testeAudioResponseDTO";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../utils/firebase-config";
import { TesteAudioFirebaseDTO } from "../../models/testeAudioFirebaseDTO";
import { TesteAudioFirebaseRequestDTO } from "../../models/testeAudioFirebaseBackendDTO";

export default function Sounds() {
  const { src, setSrc, isPlaying, setIsPlaying, liked, setLiked } =
    useContext(ContextPlayer);
  const [isHovered, setIsHovered] = useState(false);
  const [primeiraRenderizacao, setPrimeiraRenderizacao] = useState(true);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [sounds, setSounds] = useState<TesteAudioFirebaseDTO[]>([]);

  useEffect(() => {
    soundService.findAllRequest(0).then((response) => {
      console.log(response);
      setSounds(response.data.content);
    });
  }, [audioFile]);

  //function handleFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
  //  const file = event.target.files && event.target.files[0];
  //  console.log("file", file);
  //  if (file) {
  //    const reader = new FileReader();
  //    const audioContext = new AudioContext();
  //    reader.readAsArrayBuffer(file);
  //    console.log("reader", reader);
  //    reader.onload = () => {
  //      if (reader) {
  //        const result = reader.result;
  //        console.log("result", result);
  //        const arrayBuffer = reader.result as ArrayBuffer;
  //        console.log("arrayBuffer", arrayBuffer);
  //        const byteArray = new Uint8Array(arrayBuffer);
  //        console.log("bytArray", byteArray);
  //        const base64String = Buffer.from(byteArray).toString("base64");
  //        console.log("base64String", base64String);
  //        const audioBlob = new Blob([file], { type: `multipart/form-data` });
  //        console.log("audioBlob", audioBlob);
  //        audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
  //          console.log("Formato do arquivo:", file.type);
  //          console.log("Duração da música:", audioBuffer.duration);
  //          const duration: number = audioBuffer.duration;
  //          console.log("Nome do arquivo:", file.name);
  //          const fileName = file.name;
  //          const categories: CategoryDTO[] = [
  //            { name: 'category1' },
  //            { name: 'category2' },
  //        ];
  //          const formData = new FormData();
  //          formData.append('name', fileName);
  //          formData.append('audio', audioBlob);
  //          formData.append("duration", duration.toString());
  //          formData.append("categories", JSON.stringify(categories));
  //          //const soundDTO: TesteAudioDTO= {
  //          //  name: fileName,
  //          //  duration: duration,
  //          //  audio: audioBlob
  //          //}
  //          axios
  //            .post("http://localhost:8081/soundpro-sound/sounds", formData, {
  //              headers: {
  //                "Content-Type": "multipart/form-data",
  //              },
  //            })
  //            .then((response) => {
  //              console.log(response.data);
  //            })
  //            .catch((error) => {
  //              console.log(error);
  //            });
  //        });
  //
  //      }
  //    };
  //  }
  //}
  //function handleFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
  //  const file = event.target.files && event.target.files[0];
  //  console.log("file", file);
  //  if (file) {
  //    const storageRef = ref(storage, file.name);
  //    uploadBytes(storageRef, file)
  //      .then((snapshot) => {
  //        console.log("Arquivo enviado com sucesso!", snapshot);
  //        getDownloadURL(storageRef)
  //          .then((response) => {
  //            const audioUrl = response;
  //            console.log("URL de referência do arquivo de áudio:", audioUrl);
  //
  //            const requestDTO: TesteAudioFirebaseDTO = {
  //              name: file.name,
  //              audioUrl: audioUrl,
  //            };
  //            console.log("enviando requisição", requestDTO);
  //            axios
  //              .post(
  //                "http://localhost:8081/soundpro-sound/sounds",
  //                requestDTO,
  //                {
  //                  headers: {
  //                    "Content-Type": "application/json",
  //                  },
  //                }
  //              )
  //              .then((response) => {
  //                console.log(response.data);
  //                setAudioFile(file);
  //              })
  //              .catch((error) => {
  //                console.log(error);
  //              });
  //          })
  //          .catch((error) => {
  //            console.log("Erro ao obter link url do arquivo", error);
  //          });
  //      })
  //      .catch((error) => {
  //        console.error("Erro ao enviar o arquivo:", error);
  //      });
  //    }
  //  }
  function handleFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];
    console.log("file", file);
    if (file) {
      console.log("storageRef", ref(storage, file.name));
      const formData = new FormData();
      formData.append("name", file.name);
      formData.append("audio", file);
      axios
        .post("http://localhost:8081/soundpro-sound/sounds", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          setAudioFile(file);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  //const reader = new FileReader();
  //const audioContext = new AudioContext();
  //reader.readAsArrayBuffer(file);
  //console.log("reader", reader);
  //reader.onload = () => {
  //  if (reader) {
  //    const result = reader.result;
  //    console.log("result", result);
  //    const arrayBuffer = reader.result as ArrayBuffer;
  //    console.log("arrayBuffer", arrayBuffer);
  //    const audioBlobBuffer = new Blob([arrayBuffer], { type: file.type });
  //    console.log("audioBlobBuffer",audioBlobBuffer);
  //    //const byteArray = new Uint8Array(arrayBuffer);
  //    //console.log("bytArray", byteArray);
  //    //const base64String = Buffer.from(byteArray).toString("base64");
  //    //console.log("base64String", base64String);
  //    const audioBlob = new Blob([file], { type: `multipart/form-data` });
  //    console.log("audioBlob", audioBlob);
  //    console.log("audio context", audioContext);
  //    audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
  //      console.log("Formato do arquivo:", file.type);
  //      console.log("Duração da música:", audioBuffer.duration);
  //      const duration: number = audioBuffer.duration;
  //      console.log("Nome do arquivo:", file.name);
  //      const fileName = file.name;
  //      const categories: CategoryDTO[] = [
  //        { name: 'category1' },
  //        { name: 'category2' },
  //    ];
  //      const formData = new FormData();
  //      formData.append('name', fileName);
  //      formData.append('audio', audioBlob);
  //      formData.append("duration", duration.toString());
  //      formData.append("categories", JSON.stringify(categories));
  //      console.log(formData);
  //      //const soundDTO: TesteAudioDTO= {
  //      //  name: fileName,
  //      //  duration: duration,
  //      //  audio: audioBlob
  //      //}
  //      axios
  //        .post("http://localhost:8081/soundpro-sound/sounds", formData, {
  //          headers: {
  //            "Content-Type": "multipart/form-data",
  //          },
  //        })
  //        .then((response) => {
  //          console.log(response.data);
  //          setAudioFile(file);
  //        })
  //        .catch((error) => {
  //          console.log(error);
  //        });
  //    });
  //
  //  }
  //};
  //  }
  //}

  const audios: AudioDTO[] = [
    {
      id: "a",
      image: "src/assets/capa-pack.png",
      src: "src/assets/martin-garrix-limitiless.mp3",
      name: "Martin Garrix - Limitiless",
      categories: [
        {
          name: "fx",
        },
        {
          name: "crash",
        },
        {
          name: "trance",
        },
        {
          name: "impacts",
        },
      ],
      liked: false,
    },
    {
      id: "b",
      image: "src/assets/capa-pack.png",
      src: "src/assets/dj-snake-loco-contigo.mp3",
      name: "DJ Snake, J.Balvin ft. Tyga - Loco Contigo",
      categories: [
        {
          name: "fx",
        },
        {
          name: "crash",
        },
        {
          name: "trance",
        },
        {
          name: "impacts",
        },
      ],
      liked: true,
    },
  ];

  function handleUpdateSrc(newSrc: string, liked: boolean) {
    if (src === "" || src === undefined) {
      setSrc(newSrc);
      setLiked(liked);
    }
    if (src === newSrc) {
      if (isPlaying) {
        setIsPlaying(!isPlaying);
      } else {
        setIsPlaying(!isPlaying);
      }
    } else {
      setSrc(newSrc);
      setLiked(liked);
      if (isPlaying) {
        setIsPlaying(!isPlaying);
      }
    }
  }

  return (
    <div className="sounds-container">
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
          {sounds &&
            sounds.map((sound) => (
              <SoundSampleRowTeste
                audio={sound}
                onUpdateSrc={handleUpdateSrc}
                key={sound.id}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
