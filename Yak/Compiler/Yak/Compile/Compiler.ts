import { Nodes } from "../../../types.ts";
import { getProcedure } from "./Nodes/index.ts";

const compile = (nodes: Nodes) => {
  const yak: string[] = getProcedure(nodes).map((line) => `${line}\n`);

  const yakStr = yak.join("").replaceAll("\n/n", " ");

  return yakStr;
};

export default compile;
