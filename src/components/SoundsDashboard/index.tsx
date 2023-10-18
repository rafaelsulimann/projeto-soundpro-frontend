import { Table } from "./styles";
import { AudioDTO } from "../../models/audio";
import SoundSampleRow from "../SoundSampleRow";

type Props = {
  sounds: AudioDTO[];
  onDeleteAudioFile: any;
  onUpdateAudioFile: any;
  onSelectSound: any;
  selectSingleSoundId: string;
  scrollRowHoveredId: any;
  setIsBoxOptionOpen: any;
  sound3PointsClickedId: string;
  on3PointsButtonClick: any;
  soundRightButtonClickedId: string;
  onRightButtonClick: any;
  updateSoundDTO: AudioDTO;
};

export default function SoundsDashBoard({
  sounds,
  onDeleteAudioFile,
  onUpdateAudioFile,
  onSelectSound,
  selectSingleSoundId,
  scrollRowHoveredId,
  setIsBoxOptionOpen,
  sound3PointsClickedId,
  on3PointsButtonClick,
  soundRightButtonClickedId,
  onRightButtonClick,
  updateSoundDTO
}: Props) {
  
  function handleDeleteAudioFile(deletedSoundId: string) {
    onDeleteAudioFile(deletedSoundId);
  }
    
  function handleUpdateAudioFile(updateSound: AudioDTO) {
    onUpdateAudioFile(updateSound);
  }

  function handleSelectSound(audio: AudioDTO) {
    onSelectSound(audio);
  }

  function handle3PointsButtonClick(audio: AudioDTO) {
    on3PointsButtonClick(audio);
  }

  function handleRightButtonClick(audio: AudioDTO) {
    onRightButtonClick(audio);
  }

  return (
    <Table>
      <thead className="sample-dashboard-table-header">
        <tr className="sample-dashboard-table-header-row">
          <th className="id id-header">
            <h4>#</h4>
          </th>
          <th className="name name-header">
            <h4>Nome</h4>
          </th>
          <th className="like like-header"></th>
          <th className="add add-header"></th>
          <th className="options options-header"></th>
        </tr>
      </thead>
      <tbody className="sample-dashboard-table-body">
        {sounds.map((sound, index) => (
          <SoundSampleRow
            audio={sound}
            onDeleteAudioFile={handleDeleteAudioFile}
            onEditAudioFile={handleUpdateAudioFile}
            onClick={handleSelectSound}
            index={index + 1}
            key={sound.id}
            isSelected={selectSingleSoundId === sound.id}
            scrollRowHoveredId={scrollRowHoveredId}
            setIsBoxOptionOpen={setIsBoxOptionOpen}
            is3PointsClicked={sound3PointsClickedId === sound.id}
            on3PointsClick={handle3PointsButtonClick}
            isRightButtonClicked={soundRightButtonClickedId === sound.id}
            onRightButtonClick={handleRightButtonClick}
            updatedAudio={updateSoundDTO}
          />
        ))}
      </tbody>
    </Table>
  );
}
