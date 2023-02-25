import { useEffect, useState } from "preact/hooks";
import { Block } from "../types.d.ts";
import Runner from "./index.ts";
import { RunnerType, Stack, StepType } from "./types.d.ts";

interface Props {
  setPos: (pos: number) => void;
}

const useCompute = ({ setPos }: Props) => {
  const [block, setBlock] = useState<Block | null>(null);
  const [stack, setStack] = useState<Stack>([]);
  const [runner] = useState<RunnerType>(Runner());
  const [calcError, setCalcError] = useState("");
  const [running, setRunning] = useState<number | null>(null);

  const reset = () => {
    clearRunning();
    setPos(0);

    setStack([]);
    setCalcError("");

    runner.reset();

    if (!block) return;
    runner.pushCompute(block);
  };

  const clearRunning = () => {
    if (running !== null) {
      clearInterval(running);
    }
    setRunning(null);
  };

  const step = () => {
    try {
      const stepped = runner.step();
      if (!stepped) {
        clearRunning();
        return false;
      }

      setStack(stepped.stack);
      setPos(stepped.node.lineNumber);
    } catch ({ message }) {
      setCalcError(message);
      return false;
    }
    return true;
  };

  const run = () => {
    if (running !== null) clearRunning();
    else {
      step();
      const i = setInterval(() => {
        if (!step()) clearInterval(i);
      }, 100);
      setRunning(i);
    }
  };

  const fast = () => {
    if (running !== null) clearRunning();
    else {
      setRunning(-1);
    }
  };

  useEffect(() => {
    if (running === -1) {
      let stepped: StepType = undefined;
      while (true) {
        const tempStepped = runner.step();

        if (!tempStepped) break;

        stepped = tempStepped;
      }
      if (stepped) {
        setStack(stepped.stack);
        setPos(stepped.node.lineNumber);
      }
      clearRunning();
    }
  }, [running]);

  useEffect(() => {
    reset();
  }, [block]);

  return {
    setBlock,
    stack,
    step,
    run,
    running,
    calcError,
    reset,
    fast,
  };
};

export default useCompute;
