import { FunctionComponent } from "preact";
import TextArea from "./TextArea.tsx";

interface Props {
  onSubmit: (inputValue: string) => void;
}

const Input: FunctionComponent<Props> = ({ onSubmit }) => {

  const handleSubmit = (text: string) => {
    onSubmit(text);
  };

  return (
    <div class="w-full h-full flex flex-col">
      <TextArea />
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() =>
          handleSubmit(
            (document.querySelector("textarea") as HTMLTextAreaElement).value
          )
        }
      >
        {">>>>>>>>>"}
      </button>
    </div>
  );
};

export default Input;
