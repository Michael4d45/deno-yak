import { useEffect, useRef } from "preact/hooks";

interface Props {
  text: string;
  setText: (text: string) => void;
}

const TextArea = ({ text, setText }: Props) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const handleChange = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    setText(target.value);
  };

  return (
    <textarea
      class="w-full h-full"
      ref={inputRef}
      value={text}
      onInput={handleChange}
    />
  );
};

export default TextArea;
