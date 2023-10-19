import BoxOption from "../BoxOption";
import InputFileBoxOption from "../InputFileBoxOption";
import {
  ButtonText,
  Container,
  ImportBoxOptionDiv,
  ImportButtonDiv,
  SoundTypeAndImportButtonDiv,
  SoundTypeTitle,
  YoutubeButtonDiv,
  YoutubeInputText,
  YoutubeSubmitButton,
} from "./styles";

type Props = {
  onImportButtonClick: any;
  botaoRef: React.RefObject<HTMLDivElement>;
  boxRef: React.RefObject<HTMLDivElement>;
  isImportButtonClicked: boolean;
  onFileInputChange: any;
  isFromYoutubeButtonClicked: boolean;
  onFromYoutubeButtonClick: any;
  youtubeUrlText: string;
  onYoutubeUrlChange: any;
  onYoutubeUrlSubmitClick: any;
};

export default function SoundsType({
  onImportButtonClick,
  botaoRef,
  boxRef,
  isImportButtonClicked,
  onFileInputChange,
  isFromYoutubeButtonClicked,
  onFromYoutubeButtonClick,
  youtubeUrlText,
  onYoutubeUrlChange,
  onYoutubeUrlSubmitClick,
}: Props) {
  function handleImportButtonClick(event: any) {
    onImportButtonClick(event);
  }

  function handleFileInputChange(event: any) {
    onFileInputChange(event);
  }

  function handleFromYoutubeButtonClick(event: any) {
    onFromYoutubeButtonClick(event);
  }

  function handleYoutubeUrlChange(event: any) {
    onYoutubeUrlChange(event);
  }

  function handleYoutubeUrlSubmitClick() {
    onYoutubeUrlSubmitClick();
  }

  function isImportBoxOptionOpen(){
    return isImportButtonClicked;
  }

  function isYoutubeButtonOpen(){
    return isFromYoutubeButtonClicked;
  }

  return (
    <Container>
      <SoundTypeAndImportButtonDiv>
        <SoundTypeTitle>Samples </SoundTypeTitle>
        <ImportButtonDiv onClick={(event) => handleImportButtonClick(event)} ref={botaoRef}>
          <ButtonText>Importar</ButtonText>
          {isImportBoxOptionOpen() && (
            <ImportBoxOptionDiv className="options-box-div" ref={boxRef}>
              <InputFileBoxOption
                className="from-computer-button-div"
                optionTextName="Do computador"
                onFunctionChange={handleFileInputChange}
                dataName="computer-button"
                labelDivClassName="from-computer-button"
                labelClassName="from-computer-button-input"
                optionTextClassName="fa fa-cloud-upload"
              />
              {!isYoutubeButtonOpen() ? (
                <BoxOption
                  optionTextName="Do youtube"
                  className={"edit-div youtube-div"}
                  onFunctionClick={handleFromYoutubeButtonClick}
                />
              ) : (
                <YoutubeButtonDiv data-name="youtube-button">
                  <YoutubeInputText
                    type="text"
                    value={youtubeUrlText}
                    placeholder="Youtube video url"
                    onChange={(event) => handleYoutubeUrlChange(event)}
                  />
                  <YoutubeSubmitButton
                    type="button"
                    value="Enviar"
                    onClick={handleYoutubeUrlSubmitClick}
                  />
                </YoutubeButtonDiv>
              )}
            </ImportBoxOptionDiv>
          )}
        </ImportButtonDiv>
      </SoundTypeAndImportButtonDiv>
    </Container>
  );
}
