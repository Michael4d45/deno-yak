import { Nodes, ExpressionNode, Stack } from "../../../types.ts";
import Runner from "./index.ts";

export type RunnerType = ReturnType<typeof Runner>;

export type PushComputeType = (nodes: Nodes) => void;

export type StepType = { node: ExpressionNode; stack: Stack } | undefined;

export interface Variable {
  name: string;
  stack: Stack;
}

export type Variables = Variable[];
