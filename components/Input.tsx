import { FunctionComponent } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

interface Props {
  onSubmit: (inputValue: string) => void;
}

const Input: FunctionComponent<Props> = ({ onSubmit }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const handleSubmit = (text: string) => {
    console.log(`Submitting: ${text}`);
    // Add your submission logic here
    onSubmit(text);
  };

  return (
    <div class="w-full h-full flex flex-col">
      <textarea class="w-full h-full"></textarea>
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
