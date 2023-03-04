import { useEffect, useState } from "preact/hooks";

const Console = () => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
  }, []);

  return (
    <div>
      {lines.map((line) => (
        <div>{line}</div>
      ))}
    </div>
  );
};

export default Console;
