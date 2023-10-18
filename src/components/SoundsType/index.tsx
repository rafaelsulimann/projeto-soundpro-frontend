import BoxOption from "../BoxOption";
import InputFileBoxOption from "../InputFileBoxOption";
import { Container } from "./styles";

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
}

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
  onYoutubeUrlSubmitClick
}: Props) {

  function handleImportButtonClick(event: any){
    onImportButtonClick(event);
  }

  function handleFileInputChange(event: any){
    onFileInputChange(event);
  }

  function handleFromYoutubeButtonClick(event: any){
    onFromYoutubeButtonClick(event);
  }

  function handleYoutubeUrlChange(event: any){
    onYoutubeUrlChange(event);
  }

  function handleYoutubeUrlSubmitClick(){
    onYoutubeUrlSubmitClick();
  }
  return (
    <Container>
      <div className="sounds-samples-title">
        <h2>Samples </h2>
        <div
          className="new-button"
          onClick={(event) => handleImportButtonClick(event)}
          ref={botaoRef}
        >
          Importar
          <div>
            {isImportButtonClicked && (
              <div
                className="options-box-div sounds-box-options-div"
                ref={boxRef}
              >
                <InputFileBoxOption
                  className="from-computer-button-div"
                  optionTextName="Do computador"
                  onFunctionChange={handleFileInputChange}
                  dataName="computer-button"
                  labelDivClassName="from-computer-button"
                  labelClassName="from-computer-button-input"
                  optionTextClassName="fa fa-cloud-upload"
                />
                {!isFromYoutubeButtonClicked ? (
                  <BoxOption
                    optionTextName="Do youtube"
                    className={"edit-div youtube-div"}
                    onFunctionClick={handleFromYoutubeButtonClick}
                  />
                ) : (
                  <div data-name="youtube-button" className="youtube-input">
                    <input
                      type="text"
                      className="youtube-text"
                      value={youtubeUrlText}
                      placeholder="Youtube video url"
                      onChange={(event) => handleYoutubeUrlChange(event)}
                    />
                    <input
                      type="button"
                      className="youtube-submit-button"
                      value="Enviar"
                      onClick={handleYoutubeUrlSubmitClick}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
