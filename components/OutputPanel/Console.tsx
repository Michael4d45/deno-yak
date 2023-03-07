import { useEffect, useState, useRef } from "preact/hooks";
import { useBuffer } from "../../OutputBuffer/useBuffer.ts";

const Console = () => {
  const [lines, setLines] = useState<string[]>([]);
  const consoleRef = useRef<HTMLDivElement>(null);

  const onWrite = (line: string) => {
    setLines((lines) => [...lines, line]);
  };

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [lines]);

  useBuffer(onWrite);

  return (
    <div ref={consoleRef} class="overflow-y-auto h-full whitespace-pre">
      {lines.map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </div>
  );
};

export default Console;
