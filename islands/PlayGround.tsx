import InputPanel from "../components/InputPanel/Panel.tsx";
import OutputPanel from "../components/OutputPanel/Panel.tsx";
import TokenPanel from "../components/TokenPanel/Panel.tsx";
import useYak from "../Yak/Compiler/Playground/useYak.ts";

const PlayGround = () => {
  const yak = useYak();

  return (
    <div class="flex flex-row w-screen h-screen font-mono">
      <InputPanel {...yak} />
      <TokenPanel {...yak} />
      <OutputPanel {...yak} />
    </div>
  );
};

export default PlayGround;
