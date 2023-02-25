import { Block, ExpressionNode } from "../types.d.ts";
import Runner from "./index.ts";

export type Stack = number[];

export type RunnerType = ReturnType<typeof Runner>;

export type PushComputeType = (block: Block) => void;

type StepType = { node: ExpressionNode; stack: Stack } | undefined;
