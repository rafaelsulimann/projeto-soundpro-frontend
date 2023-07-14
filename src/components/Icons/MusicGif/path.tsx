import { useContext, useEffect, useState } from "react";
import { MUSIC_GIF_SPEED } from "../../../utils/constants";
import { ContextPlayer } from "../../../utils/context-player";

type Props ={
    widthPosition: number;
    heightPosition: number;
    maxHeight: number;
}

export default function PathSvg({widthPosition, heightPosition, maxHeight}: Props){

    const {
        isPlaying,
      } = useContext(ContextPlayer);

    const [valorAtual, setValorAtual] = useState(heightPosition);
    const [direcao, setDirecao] = useState(1); // 1 para incremento, -1 para decremento

    useEffect(() => {
        if(isPlaying){
            const timer = setTimeout(() => {
              if (valorAtual === maxHeight -1) {
                setDirecao(-1); // mudar a direção para decremento
              } else if (valorAtual === 1) {
                setDirecao(1); // mudar a direção para incremento
              }
        
              setValorAtual(valorAtual + direcao); // atualizar o valor atual
            }, MUSIC_GIF_SPEED);
        
            return () => clearTimeout(timer); // limpar o timer quando o componente é desmontado
        }
      }, [valorAtual, direcao, isPlaying]);

    return(
        <path d={`M${widthPosition} ${valorAtual}V${maxHeight}`} strokeWidth="5" />
    );
}