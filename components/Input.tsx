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
    onSubmit(text);
  };

  return (
    <div class="w-full h-full flex flex-col">
      <textarea class="w-full h-full">
        {`1#fib
  {
    . 1 ->MY_VAR
     . . 1 == <-> 0 == | ! ?
     {
        . 1 - fib
        <-> 2 - fib
        . 1 ->test
        +
     }
  }

[]MY_VAR
[]test

5 fib


2
<-MY_VAR`}
      </textarea>
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
