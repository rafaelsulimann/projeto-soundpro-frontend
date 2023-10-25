import FormInput from "../FormInput";
import * as forms from "../../utils/forms";
import { useEffect, useRef } from "react";
import { AudioDTO } from "../../models/audio";
import {
  Container,
  EditPopupDiv,
  EditPopupTitle,
  EditPopupTitleDiv,
  EditPopupForm,
  ErrorMessageTextDiv,
  EditPopupFormInputTextDiv,
  EditPopupFormSubmitButton,
} from "./styles";

type Props = {
  formData: any;
  onChange: Function;
  onTurnDirty: Function;
  onSubmit: Function;
  isEditPopupClicked: AudioDTO;
  onEditPopupClick: any;
};

export default function SoundEditForm({
  formData,
  onChange,
  onTurnDirty,
  onSubmit,
  isEditPopupClicked,
  onEditPopupClick,
}: Props) {
  const editBoxRef = useRef<HTMLDivElement>(null);

  function handleEditBoxClick(event: MouseEvent) {
    onEditPopupClick(event);
  }

  useEffect(() => {
    if (isEditPopupClicked && editBoxRef.current) {
      window.addEventListener("click", handleWindowClick);
    } else {
      // Remove event listener quando a box é fechada
      window.removeEventListener("click", handleWindowClick);
    }

    // Função que é chamada quando o evento "click" é acionado no objeto window
    function handleWindowClick(event: MouseEvent) {
      if (!editBoxRef.current?.contains(event.target as Node)) {
        // Fecha a box se o elemento clicado não estiver dentro da box ou do botão
        handleEditBoxClick(event);
      }
    }

    // Função que é chamada quando o componente é desmontado
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, [isEditPopupClicked]);

  function handleChange(event: any) {
    onChange(
      forms.updateAndValidate(formData, event.target.name, event.target.value)
    );
  }

  function handleTurnDirty(name: string) {
    onTurnDirty(forms.dirtyAndValidate(formData, name));
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    onSubmit(formData);
  }

  function handleCancelClick(event: any) {}

  return (
    <Container>
      <EditPopupDiv ref={editBoxRef}>
        <EditPopupTitleDiv>
          <EditPopupTitle>Editar detalhes</EditPopupTitle>
        </EditPopupTitleDiv>
        <EditPopupForm>
          <EditPopupFormInputTextDiv>
            <FormInput
              {...formData.name}
              className="form-input"
              onChange={handleChange}
              onTurnDirty={handleTurnDirty}
              labelId={formData.name.id}
            />
            <ErrorMessageTextDiv className="error-message">
              {formData.name.message}
            </ErrorMessageTextDiv>
          </EditPopupFormInputTextDiv>
          <EditPopupFormInputTextDiv>
            <FormInput
              {...formData.soundType}
              className="form-input"
              onChange={handleChange}
              onTurnDirty={handleTurnDirty}
              labelId={formData.soundType.id}
            />
            <ErrorMessageTextDiv className="error-message">
              {formData.soundType.message}
            </ErrorMessageTextDiv>
          </EditPopupFormInputTextDiv>
          <EditPopupFormInputTextDiv>
            <FormInput
              {...formData.creationDate}
              className="form-input"
              onChange={handleChange}
              onTurnDirty={handleTurnDirty}
              labelId={formData.creationDate.id}
            />
            <ErrorMessageTextDiv className="error-message">
              {formData.creationDate.message}
            </ErrorMessageTextDiv>
          </EditPopupFormInputTextDiv>
          <EditPopupFormInputTextDiv>
            <FormInput
              {...formData.lastUpdatedDate}
              className="form-input"
              onChange={handleChange}
              onTurnDirty={handleTurnDirty}
              labelId={formData.lastUpdatedDate.id}
            />
            <ErrorMessageTextDiv className="error-message">
              {formData.lastUpdatedDate.message}
            </ErrorMessageTextDiv>
          </EditPopupFormInputTextDiv>
          <EditPopupFormInputTextDiv>
            <EditPopupFormSubmitButton
              type="submit"
              value="Salvar"
              className="sound-edit-form-submit-button"
              onClick={handleSubmit}
            />
          </EditPopupFormInputTextDiv>
        </EditPopupForm>
      </EditPopupDiv>
    </Container>
  );
}
