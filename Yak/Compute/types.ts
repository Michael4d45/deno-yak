import { Block, ExpressionNode } from "../types.ts";
import Runner from "./index.ts";

export type Stack = number[];

export type RunnerType = ReturnType<typeof Runner>;

export type PushComputeType = (block: Block) => void;

export type StepType = { node: ExpressionNode; stack: Stack } | undefined;
