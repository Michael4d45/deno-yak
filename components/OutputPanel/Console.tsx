import { useEffect, useState } from "preact/hooks";
import { useBuffer } from "../../OutputBuffer/useBuffer.ts";

const Console = () => {
  const [lines, setLines] = useState<string[]>([]);

  const onWrite = (line: string) => {
    setLines([...lines, line])
  }

  useBuffer(onWrite);

  return (
    <div>
      {lines.map((line) => (
        <div>{line}</div>
      ))}
    </div>
  );
};

export default Console;
