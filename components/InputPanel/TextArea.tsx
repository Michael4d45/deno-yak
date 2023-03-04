import { useEffect, useRef } from "preact/hooks";

const TextArea = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  return (
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
  );
};

export default TextArea;
