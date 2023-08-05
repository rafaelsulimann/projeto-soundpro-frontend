import { useEffect, useRef, useState } from "react";
import { createPopper } from "@popperjs/core";
import BoxOption from "../../../BoxOption";
import deleteIcon from "../../../../assets/delete-button.svg";
import editIcon from "../../../../assets/edit-button.svg";
import "./styles.scss";

type Props = {
  simbolColor: string;
  className: string;
  onDeleteClick: any;
  onEditClick: any;
  onDownloadClick: any
  onButtonClick: any;
  isButtonClick: boolean;
};

export default function Points3Button({
  simbolColor,
  className,
  onDeleteClick,
  onEditClick,
  onDownloadClick,
  onButtonClick,
  isButtonClick
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const botaoRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  function handleButtonClick(event: any) {
    event.stopPropagation();
    onButtonClick(!isButtonClick);
  }
  
  function handleDeleteClick() {
    onDeleteClick();
    onButtonClick();
    setIsHovered(false);
  }
  
  function handleDownloadClick() {
    onDownloadClick();
    onButtonClick();
    setIsHovered(false);
  }
  
  function handleEditClick() {
    onEditClick();
    onButtonClick();
    setIsHovered(false);
  }

  useEffect(() => {
    if (isButtonClick && botaoRef.current && boxRef.current) {
      createPopper(botaoRef.current, boxRef.current, {
        placement: "bottom-start",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [-90, -122], // Distância vertical entre o elemento de referência e a box
            },
          },
        ],
      });

      // Adiciona event listener para o evento "click" no objeto window
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
        onButtonClick();
      }
    }

    // Função que é chamada quando o componente é desmontado
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, [isButtonClick]);

  return (
    <>
      <div ref={botaoRef} className="options-button-container">
        <svg
          width="6"
          height="26"
          viewBox="0 0 6 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          onClick={(event:any) => handleButtonClick(event)}
        >
          <circle
            cx="3"
            cy="3"
            r="2.75"
            fill={simbolColor}
            stroke="#121215"
            strokeWidth="0.5"
          />
          <circle
            cx="3"
            cy="23"
            r="2.75"
            fill={simbolColor}
            stroke="#121215"
            strokeWidth="0.5"
          />
          <circle
            cx="3"
            cy="13"
            r="2.75"
            fill={simbolColor}
            stroke="#121215"
            strokeWidth="0.5"
          />
        </svg>
        <div>
          {isButtonClick && (
            <div ref={boxRef} className="options-box-div">
              <BoxOption
                optionTextName="Excluir"
                className={"delete-div"}
                imgClassName={"delete-option-box-icon"}
                iconSrc={deleteIcon}
                iconAltName="Delete"
                onFunctionClick={handleDeleteClick}
              />
              <BoxOption
                optionTextName="Editar"
                className={"edit-div"}
                imgClassName={"edit-option-box-icon"}
                iconSrc={editIcon}
                iconAltName="Edit"
                onFunctionClick={handleEditClick}
              />
              <BoxOption
                optionTextName="Download"
                className={"edit-div"}
                imgClassName={"edit-option-box-icon"}
                iconSrc={editIcon}
                iconAltName="Download"
                onFunctionClick={handleDownloadClick}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
