import { useEffect, useState } from "preact/hooks";
import {
  BinaryOperator,
  Block,
  ConditionalNode,
  ExpressionNode,
  FunctionDefNode,
  UnaryOperator,
} from "./types.ts";

type Stack = number[];

const testArgLength = (expect: number, stack: Stack) => {
  if (stack.length < expect) {
    throw new Error(
      `Expected ${expect} argument(s), got ${stack.length}`,
    );
  }
};

const calculateBinaryOp = (
  op: BinaryOperator,
  stack: Stack,
) => {
  testArgLength(2, stack);

  const first = stack.pop() as number;
  const second = stack.pop() as number;

  if (op === "+") {
    return stack.push(first + second);
  }

  if (op === "-") {
    return stack.push(second - first);
  }

  if (op === "*") {
    return stack.push(first * second);
  }

  if (op === "%") {
    return stack.push(first % second);
  }

  if (op === "==") {
    return stack.push(first === second ? 1 : 0);
  }

  if (op === "|") {
    return stack.push(first === 1 || second === 1 ? 1 : 0);
  }

  if (op === "&") {
    return stack.push(first === 1 && second === 1 ? 1 : 0);
  }

  if (op === "^") {
    return stack.push(
      (first === 1 || second === 1) && first !== second ? 1 : 0,
    );
  }

  if (op === "<->") {
    return stack.push(first, second);
  }

  if (op === "<^>") {
    return stack.push(first, second, first);
  }

  if (op === "<<<") {
    const third = stack.pop() as number;
    return stack.push(first, third, second);
  }
};

const calculateUnaryOp = (
  op: UnaryOperator,
  stack: Stack,
) => {
  testArgLength(1, stack);

  if (op === ".") {
    return stack.push(stack[stack.length - 1]);
  }

  if (op === "@") {
    return stack.pop();
  }
};

const calculateConditional = (
  node: ConditionalNode,
  stack: Stack,
) => {
  testArgLength(1, stack);
  const op = node.value;

  const arg = stack.pop() as number;

  // If op is '?' isFalsy is true if arg is 0
  // If op is '!' isFalsy is true if arg is not 0
  const isFalsy = op === "?" ? arg === 0 : arg !== 0;

  if (!isFalsy) {
    runner.pushCompute(compute(node.block));
  }
};

const getFunction = (name: string, block: Block): FunctionDefNode | null => {
  const func = block.scope.functions[name];

  if (func !== undefined) return func;

  if (block.parent === null) return null;

  return getFunction(name, block.parent);
};

const calculateFunctionCall = (
  block: Block,
  name: string,
  stack: Stack,
) => {
  const func = getFunction(name, block);

  if (func === null) {
    throw new Error(`Function '${name}' not defined`);
  }

  testArgLength(func.arity, stack);

  runner.pushCompute(compute(func.block));
};

const computeNode = (block: Block, node: ExpressionNode, stack: Stack) => {
  switch (node.type) {
    case "NUMBER":
      return stack.push(node.value);
    case "BINARY_OPERATOR":
      return calculateBinaryOp(node.value, stack);
    case "UNARY_OPERATOR":
      return calculateUnaryOp(node.value, stack);
    case "CONDITIONAL":
      return calculateConditional(node, stack);
    case "FUNCTION_CALL":
      return calculateFunctionCall(block, node.name, stack);
  }
};

const compute = (block: Block) => {
  let i = 0;

  const computeLine = (stack: Stack) => {
    const node = block.scope.nodes[i];
    computeNode(block, node, stack);
    i++;
    return node;
  };

  return {
    computeLine,
    finished: () => i >= block.scope.nodes.length,
  };
};

type ComputeType = ReturnType<typeof compute>;
type StepType = { node: ExpressionNode; stack: Stack } | undefined;

const Runner = () => {
  let computeStack: ComputeType[] = [];
  let stack: Stack = [];

  const reset = () => {
    computeStack = [];
    stack = [];
  };

  const step = (): StepType => {
    if (computeStack.length === 0) return;

    const { computeLine, finished } = computeStack[computeStack.length - 1];

    if (finished()) {
      computeStack.pop();
      return step();
    }

    const node = computeLine(stack);

    return {
      node,
      stack: [...stack],
    };
  };

  return {
    pushCompute: (comp: ComputeType) => computeStack.push(comp),
    reset,
    step,
  };
};

const runner = Runner();

interface Props {
  setPos: (pos: number) => void;
}

const useCompute = ({ setPos }: Props) => {
  const [block, setBlock] = useState<Block | null>(null);
  const [stack, setStack] = useState<Stack>([]);
  const [calcError, setCalcError] = useState("");
  const [running, setRunning] = useState<number | null>(null);

  const reset = () => {
    clearRunning();
    setPos(0);

    runner.reset();

    setStack([]);

    if (!block) return;
    runner.pushCompute(compute(block));
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

  useEffect(() => {
    if (!calcError) return;
    console.error(calcError);
  }, [calcError]);

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
