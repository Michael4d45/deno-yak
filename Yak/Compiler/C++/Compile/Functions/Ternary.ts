import { functionTemplate } from "./Functions.ts";

const rotResult = `
    _STACK.push_back(second);

    _STACK.push_back(third);

    _STACK.push_back(first);`;

const rot = {
  op: "<<<",
  name: "rot",
  template: () => functionTemplate("rot", rotResult, 3),
};

export const ternaryOperations = [
  rot,
] as const;

const TernaryFunctions = () => {
  const c: string[] = [];

  ternaryOperations.forEach(({ template }) => c.push(template()));

  return c;
};

export default TernaryFunctions;
