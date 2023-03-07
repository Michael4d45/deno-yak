import UnaryFunctions, { unaryOperations } from "./Unary.ts";
import BinaryFunctions, { binaryOperations } from "./Binary.ts";
import TernaryFunctions, { ternaryOperations } from "./Ternary.ts";
import StringFunctions from "./String.ts";
import VariableFunctions from "./Variable.ts";

const functions: (() => string[])[] = [
  UnaryFunctions,
  BinaryFunctions,
  TernaryFunctions,
  StringFunctions,
  VariableFunctions,
];

export const getFunctions = (): string[] =>
  functions.reduce(
    (acc: string[], curr) => acc.concat(curr()),
    [],
  );

export const funcName = (name: string) => `_${name}`;

export const numNames = new Map<number, string>([
  [1, "first"],
  [2, "second"],
  [3, "third"],
]);

const pop = (num: number) => `
    double ${numNames.get(num)} = _STACK.back();
    _STACK.pop_back();`;

export const functionTemplate = (
  name: string,
  result: string,
  num: number,
  check = "",
) => {
  const plural = (num > 1) ? "s" : "";
  return `
void ${funcName(name)}() {
    if (_STACK.size() < ${num}) {
      throw std::runtime_error("Error: stack does not have at least ${num} element${plural}.");
    }
    ${num ? `// Pop the top value${plural} off the stack` : ""}
    ${(new Array(num)).fill(0).map((_i, index) => pop(index + 1)).join("")}

    ${check}${result}
}
`;
};

export const operationTemplate = (
  name: string,
  operation: string,
  num: number,
  check = "",
) =>
  functionTemplate(
    name,
    `
    // Apply the operator and push the result back onto the stack
    double result = ${operation};

    _STACK.push_back(result);
`,
    num,
    check,
  );

export const operationFunctions = new Map<string, string>([
  ...unaryOperations.map(({ op, name }): [string, string] => [op, name]),
  ...binaryOperations.map(({ op, name }): [string, string] => [op, name]),
  ...ternaryOperations.map(({ op, name }): [string, string] => [op, name]),
]);
