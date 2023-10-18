import FormInput from "../FormInput";
import * as forms from "../../utils/forms";
import { useEffect, useRef, useState } from "react";
import { AudioDTO } from "../../models/audio";
import { Container } from "./styles";

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
      <div className="sound-edit-form-div" ref={editBoxRef}>
        <div className="sound-edit-form-title">
          <h2>Editar detalhes</h2>
        </div>
        <form className="sound-edit-form">
          <div className="sound-edit-form-input-text">
            <FormInput
              {...formData.name}
              className="form-input"
              onChange={handleChange}
              onTurnDirty={handleTurnDirty}
              labelId={formData.name.id}
            />
            <div className="error-message">{formData.name.message}</div>
          </div>
          <div className="sound-edit-form-input-text">
            <FormInput
              {...formData.soundType}
              className="form-input"
              onChange={handleChange}
              onTurnDirty={handleTurnDirty}
              labelId={formData.soundType.id}
            />
            <div className="error-message">{formData.soundType.message}</div>
          </div>
          <div className="sound-edit-form-input-text">
            <FormInput
              {...formData.creationDate}
              className="form-input"
              onChange={handleChange}
              onTurnDirty={handleTurnDirty}
              labelId={formData.creationDate.id}
            />
            <div className="error-message">{formData.creationDate.message}</div>
          </div>
          <div className="sound-edit-form-input-text">
            <FormInput
              {...formData.lastUpdatedDate}
              className="form-input"
              onChange={handleChange}
              onTurnDirty={handleTurnDirty}
              labelId={formData.lastUpdatedDate.id}
            />
            <div className="error-message">
              {formData.lastUpdatedDate.message}
            </div>
          </div>
          <div className="sound-edit-form-input-text">
            <input
              type="submit"
              value="Salvar"
              className="sound-edit-form-submit-button"
              onClick={handleSubmit}
            />
          </div>
          {/* <div className="sound-edit-form-input-text">
            <FormSelect
              {...formData.categories}
              className="form-input input-select"
              styles={selectStyles}
              isMulti
              options={categories}
              noOptionsMessage={() => "Não há mais opções disponíveis"}
              getOptionValue={(obj: any) => String(obj.id)}
              getOptionLabel={(obj: any) => obj.name}
              onTurnDirty={handleTurnDirty}
              onChange={(obj: any) => {
                handleSelectChange(obj);
              }}
            />
            <div className="error-message">{formData.categories.message}</div>
          </div> */}
          {/* <div className="sound-edit-form-input-text input-description">
            <label htmlFor={formData.description.id}>Descrição</label>
            <FormTextarea
              {...formData.description}
              className="form-input"
              onChange={handleChange}
              onTurnDirty={handleTurnDirty}
            />
            <div className="error-message">{formData.description.message}</div>
          </div> */}
          {/* <div className="sound-edit-form-buttons">
            <SecondButton
              value="Cancelar"
              buttonClassName="sound-edit-form-button"
              onClick={handleCancelClick}
            />
            <PrimaryButton
              value="Salvar"
              buttonClassName="sound-edit-form-button"
            />
          </div> */}
        </form>
      </div>
    </Container>
  );
}
