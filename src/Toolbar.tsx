import { Editor } from "slate";
import { toggleCodeElement } from "./toggleCodeElement";
import { toggleMark } from "./toggleMark";

type Props = {
  editor: Editor
}
export const Toolbar: React.FC<Props> = ({ editor }) => {
  const handleClickCodeButton = () => {
    toggleCodeElement(editor);
  };
  const handleClickBoldButton = () => {
    toggleMark(editor);
  };


  return (
    <div>
      <button onClick={handleClickCodeButton}>{"<>"}</button>
      <button onClick={handleClickBoldButton}>b</button>
    </div>
  );
};