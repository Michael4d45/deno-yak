import { StringNode } from "../../../../types.ts";
import { funcName } from "../Functions/Functions.ts";

const calculateString = (
  node: StringNode,
  spaces: string,
) => {
  const computes = Math.max(
    ...(node.fragments.filter((
      test,
    ) => (typeof test !== "string")) as number[]),
  );

  const fragments = node.fragments.filter(Boolean).map((val) => {
    if (typeof val === "string") {
      return `"${val}"`;
    }
    return val;
  });

  return `${spaces}${
    funcName("print")
  }(${computes}, std::vector<std::variant<std::string, int>>( \{${fragments}\} ) );`;
};

export default calculateString;
