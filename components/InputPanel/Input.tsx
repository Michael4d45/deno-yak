import { useEffect, useState } from "preact/hooks";
import { Processor } from "../../Yak/Compiler/Yak/process.ts";
import TextArea from "./TextArea.tsx";
import { asset } from "$fresh/runtime.ts";

interface Props {
  onSubmit: (inputValue: string) => void;
}

const Input = ({ onSubmit }: Props) => {
  const [text, setText] = useState<string>("");

  const fileUrl = asset("/examples/fib-memo.yak");
  useEffect(() => {
    fetch(fileUrl)
      .then((response) => response.text())
      .then(setText);
  }, []);

  const handleSubmit = () => {
    onSubmit(text);
  };

  const format = (text: string) => {
    const { yak, tokenErrors } = Processor({ text });
    if (!tokenErrors.length) {
      setText(yak);
    }
  };

  return (
    <div class="w-full h-full flex flex-col">
      <TextArea text={text} setText={setText} />
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => format(text)}
      >
        {"format"}
      </button>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSubmit}
      >
        {">>>>>>>>>"}
      </button>
    </div>
  );
};

export default Input;
