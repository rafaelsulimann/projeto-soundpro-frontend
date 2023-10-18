import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from 'sockjs-client';
import { LoadingAudioDTO } from "../../models/loadingAudioDTO";
import { Container } from "./styles";

type Props = {
    loadingRequestId: string;
    isTwoElementsInLoading: boolean;
}

export default function LoadingFile({loadingRequestId, isTwoElementsInLoading}: Props){

    const [progress, setProgress] = useState<LoadingAudioDTO>({
        soundName: "",
        timeLeft: 0,
        progressPercentage: 0});

    const bgGradientProgress = `linear-gradient(to right, var(--orange-color) 0%, var(--orange-color) ${progress.progressPercentage}%, #fff 0%, #fff 100%)`;

    useEffect(() => {
        console.log("Entrou no useEffect do webSocket")
        const socket = new SockJS('http://localhost:8089/soundpro-sound/websocket-endpoint'); // Endereço do WebSocket no backend
        console.log("socket", socket);
        const stompClient = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                stompClient.subscribe(`/topic/progress/${loadingRequestId}`, (message) => {
                  console.log("message", message.body);
                  const progressObject: LoadingAudioDTO = JSON.parse(message.body);
                  setProgress(progressObject);
                });
            },
            // Adicione quaisquer outros handlers que você deseja, como onError, onStompError, etc.
        });
    
        stompClient.activate();
    
        return () => {
            stompClient.deactivate();
        };
    }, []);

    const formatarString = (texto: string): string => {
        if (texto.length > 26) {
          return texto.substr(0, 23) + '...';
        }
        return texto;
      }
    
      const [isRowHovered, setIsRowHovered] = useState(false);

      function handleRowMouseEnterHover(){
        setIsRowHovered(true);
      }

      function handleRowMouseLeaveHover(){
        setIsRowHovered(false);
      }

    return(
        <Container className="loading-file-row" onMouseEnter={handleRowMouseEnterHover} onMouseLeave={handleRowMouseLeaveHover} style={{background: isRowHovered ? "var(--line-gray-color)" : "transparent", padding: isTwoElementsInLoading ? "15px 6.75px 15px 15px" : "15px"}}>
            <h2>{progress.soundName === null || progress.soundName === "" ? "Carregando" : formatarString(progress.soundName)}</h2>
            {/* <p>{progress.timeLeft}</p> */}
            <div className="box">
            <div className="box-circle">
                <svg>
                <circle
                    cx="12"
                    cy="12"
                    r="8"
                    className="box-circle-svg"
                ></circle>
                <circle
                    cx="12"
                    cy="12"
                    r="8"
                    className="box-circle-svg"
                    style={{ strokeDashoffset: 51 - 51 * (progress.progressPercentage / 100) }}
                ></circle>
                </svg>
            </div>
            </div>
        </Container>
    );
}