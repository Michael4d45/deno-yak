import { getBuffer } from "../../../../../OutputBuffer/useBuffer.ts";
import { Stack, StringNode } from "../../../../types.ts";
import { testArgLength } from "./Verification.ts";

const calculateString = (
  node: StringNode,
  stack: Stack,
) => {
  const computes = Math.max(
    ...(node.fragments.filter((
      test,
    ) => (typeof test !== "string")) as number[]),
  );

  testArgLength(computes, stack, node.value);
  const fragments = [...node.fragments];

  const args = stack.splice(stack.length - computes).reverse();

  const replaced = fragments.map((fragment) => {
    if (typeof fragment === "string") return fragment;
    return args[fragment - 1];
  }).join("").replaceAll("\\n", "\n");

  getBuffer().write(replaced);
};

export default calculateString;
